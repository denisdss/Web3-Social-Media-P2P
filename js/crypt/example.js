
const PASSWORD = '0'
const stringToEncrypt = 'oi'

//  get key from db, decrypt and import key
const public_oaep = await importKey('RSA-OAEP', await getData('keys','public-RSA-OAEP'));
//var private_oaep = await getData('keys','private-RSA-OAEP')
const private_oaep = await retrievePrivateKeyEncrypted('RSA-OAEP',decode(await hash(PASSWORD)));

//  encode data
var encoded = encode(stringToEncrypt)

//  encrypt data to send in http request
var encrypted = await encrypt(encoded, public_oaep)

// output encrypted data in base64 (needed to view in console)
console.log(decode(encrypted))

// import key
const public_pkcs = await importKey("RSASSA-PKCS1-v1_5",await getData('keys','public-RSASSA-PKCS1-v1_5'))
const private_pkcs = await retrievePrivateKeyEncrypted('RSASSA-PKCS1-v1_5',decode(await hash(PASSWORD)));

// signature example:
var sign = await signData(encrypted, private_pkcs)

//output signature
console.log(sign)

// verify example:
var verified = await verify(sign, encrypted, public_pkcs)

//output verification
console.log(verified)

var decrypted = await decrypt(encrypted, private_oaep)

console.log(decode(decrypted))
