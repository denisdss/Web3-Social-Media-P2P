import { addData, getData } from '../db/modules.js';
// using window.crypto

// function to encode data
function encode(data) {
    return new TextEncoder().encode(data);
}

// function to decode data
export function decode(data) {
    return new TextDecoder().decode(data);
}

// function to hash data
/*
async function hash(data) {
    return window.crypto.subtle.digest(
        {
            name: "SHA-512",
        },
        data
    );
}
*/
// function to encrypt data only RSA-OAEP
async function encrypt(data, key) { 
    return window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP"
        },
        key,
        data
    );
}

// function to decrypt data only RSA-OAEP
async function decrypt(data, key) {
    return window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP"
        },
        key,
        data
    );
}


// function to import key
async function importKey(name, key) {
    return window.crypto.subtle.importKey(
        "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
        key,
        {   //these are the algorithm options
            name: name,
            hash: { name: "SHA-512" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
        },
        false, //whether the key is extractable (i.e. can be used in exportKey)
        key.type.includes("OAEP") ? key.type.includes("private") ? ["decrypt"] : ["encrypt"] : key.type.includes("private") ? ["sign"] : ["verify"]//can be "encrypt", "decrypt", "verify", or "sign"
    );
}

// function to export key
async function exportKey(key) {
    return window.crypto.subtle.exportKey(
        "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
        key
    );
}

// function to generate key
export async function generateKey(name, arrayTypes, password) {
    window.crypto.subtle.generateKey(
        {
            name: name,
            modulusLength: 2048, //can be 1024, 2048, or 4096
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: { name: "SHA-512" }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
        },
        true, //whether the key is extractable (i.e. can be used in exportKey)
        arrayTypes //can be any combination of "sign" and "verify"
    )
        .then(async function (key) {
            //returns a keypair object
            
            // export public key and add to database
            let keydata = await exportKey(key.publicKey);
            keydata.type = "public-"+name;
            await addData('_db', "keys", keydata);
            //create address for public key
            if(name === 'RSA-OAEP'){
                let address = await hashKey(keydata.n);
                await addData('_db', "keys", {type: 'address', address: address});
            }
            // export private key and add to database
            keydata = await exportKey(key.privateKey);
            keydata.type = "private-"+name;
            //
            //  encrypt private key
            await storePrivateKeyEncrypted(password, keydata);
        
            //const privateKey = await retrievePrivateKeyEncrypted(password);
            //console.log(privateKey);
            return true
        })
}

// function to sign data only RSASSA-PKCS1-v1_5
async function signData(data, key) {
    return window.crypto.subtle.sign(
        {
            name: "RSASSA-PKCS1-v1_5",
        },
        key,
        data
    );
}   

// function to verify signature only RSASSA-PKCS1-v1_5
async function verify(signature, data, key) {
    return window.crypto.subtle.verify(
        {
            name: "RSASSA-PKCS1-v1_5",
        },
        key,
        signature,
        data
    );
}

async function deriveKey(password, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    const key = await window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: enc.encode(salt),
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
    return key;
}

async function encryptPrivateKey(privateKey, password) {
    privateKey = encode(JSON.stringify(privateKey));
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const key = await deriveKey(password, salt);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        privateKey
    );

    return {
        salt: btoa(String.fromCharCode(...new Uint8Array(salt))),
        iv: btoa(String.fromCharCode(...new Uint8Array(iv))),
        ciphertext: btoa(String.fromCharCode(...new Uint8Array(encrypted)))
    };
}

async function decryptPrivateKey(encryptedPrivateKey, password) {
    const salt = new Uint8Array(atob(encryptedPrivateKey.salt).split("").map(c => c.charCodeAt(0)));
    const iv = new Uint8Array(atob(encryptedPrivateKey.iv).split("").map(c => c.charCodeAt(0)));
    const ciphertext = new Uint8Array(atob(encryptedPrivateKey.ciphertext).split("").map(c => c.charCodeAt(0)));

    const key = await deriveKey(password, salt);
    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        ciphertext
    );

    return decrypted;
}

async function storePrivateKeyEncrypted(password, exportedPrivateKey) {
    let encryptedPrivateKey = await encryptPrivateKey(exportedPrivateKey, password);
    encryptedPrivateKey.type = exportedPrivateKey.type;
    await addData('_db', "keys", encryptedPrivateKey);
    return true
    //localStorage.setItem("encryptedPrivateKey", JSON.stringify(encryptedPrivateKey));
}

export async function retrievePrivateKeyEncrypted(name, password) {
    const encryptedPrivateKey = await getData('_db', 'keys','private-'+name);
    const privateKey = await importKey(name, JSON.parse(decode(await decryptPrivateKey(encryptedPrivateKey, password))));
    return privateKey;
}

//function to hash data
export async function hash(data) {
    return window.crypto.subtle.digest(
        {
            name: "SHA-512",
        },
        encode(data)
    );
}

// Hash Keccak-256 da Chave Pública
async function hashKey(data) {
    let hashBuffer = await window.crypto.subtle.digest(
        {
            name: "SHA-256"
        },
        encode(data)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""); // convert bytes to hex string
    return hashHex;
}
