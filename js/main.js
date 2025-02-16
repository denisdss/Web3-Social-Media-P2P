import { startClient, getID, connectToPeer } from './turn.js'
import { createUserTab } from './user.js'
import { changeIdText } from './id.js'
import { debug, insertMessage, isChatOpen, getChatId} from './pages/modules.js'
import { initDB, checkTable, getData, createTable, addData, deleteData } from './db/modules.js'
import {
    generateKey,
    retrievePrivateKeyEncrypted,
    decode,
    hash
} from './crypt/modules.js'
import { updateChatStatus } from './chats/chat.js'

export const IMG_DUMMY = "images/users/user-dummy-img.jpg";
export const Peer = async () => {
    await initDB('_db',
        [
            {
                name: 'keys',
                attr: { keyPath: 'type' }
            },
            {
                name: 'config',
                attr: { keyPath: 'code' }
            }
        ]
    )// Generate key if key does not exist
    // Get User Name and save in _db / config
    let name = await getData('_db', 'config', 'name')
    if(!name){
        name = window.prompt("Enter your name");
        await addData('_db', 'config', { code: 'name', value: name })
    }
    debug("Checking if keys table exists");
    if (!await checkTable('_db', "keys", {noEmpty: true})) {

        const password = decode(await hash(window.prompt("Enter password")));
        debug('Password hashed is:');
        debug((password));
        debug("Generating keys");
        await generateKey("RSASSA-PKCS1-v1_5", ["sign", "verify"], password);
        await generateKey("RSA-OAEP", ["encrypt", "decrypt"], password);
        // call funtion insert content
        //downloadKeys()

    } else {
        const password = decode(await hash(window.prompt("Unlock with your password")));
        debug('Password hashed is:');
        debug((password));
        debug("Retrieving keys");
        console.log(await retrievePrivateKeyEncrypted('RSA-OAEP', password));
        return await connectToServer(await getData('_db', 'keys', 'address'))
    }
}




export async function connectToServer(ID) {
    
    console.log('Connecting to server:', ID)
    const peer = startClient(ID.address)
    console.log(peer)
    const id = await getID(peer)
    console.log('My ID is:', id)
    changeIdText(id)

    peer.on('connection', function (conn) {
        conn.on('data', async function (data) {
            // Will print 'hi!'
            console.log(data);
            functions[data.type](data)
        });
    });

    return peer
}

const functions = {
    chat : async function(data){
            await createTable(data.type, data.from_id, { keyPath: "id", autoIncrement: true })

            //save in db
            await addData(data.type, data.from_id, data)

            const contact  = await getData('home', 'contacts', data.from_id)
            //console.log(contact)
            await deleteData('home', 'chats', data.from_id)

            await addData('home', 'chats', 
                {
                    id: data.from_id,
                    name: contact?.name || data.from_name.value,
                    status: null,
                    profile: IMG_DUMMY
                }
            );

            if(isChatOpen()){
                let chatId = getChatId()
                if(chatId == data.from_id){
                    insertMessage(0,data,[],1, (data.type=='chat')?'users':'channels')
                } else {
                    updateChatStatus(true)
                }
            } else {
                updateChatStatus(true)
            }
    }
}