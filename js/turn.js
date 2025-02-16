import { getData } from './db/modules.js'
import { connectToServer } from './main.js';
import { getCurrentTime } from './pages/modules.js'

const TURN_USER = '72165ebd7aa2912dba04d9fa'
const TURN_PASS = '37ig+vXXZ7YR85qJ'


export function startClient(ID) {
    const peer = new Peer(ID, {
        config: {
            iceServers: [
                {
                    urls: "stun:stun.relay.metered.ca:80",
                },
                {
                    urls: "turn:global.relay.metered.ca:80",
                    username: TURN_USER,
                    credential: TURN_PASS,
                },
                {
                    urls: "turn:global.relay.metered.ca:80?transport=tcp",
                    username: TURN_USER,
                    credential: TURN_PASS,
                },
                {
                    urls: "turn:global.relay.metered.ca:443",
                    username: TURN_USER,
                    credential: TURN_PASS,
                },
                {
                    urls: "turns:global.relay.metered.ca:443?transport=tcp",
                    username: TURN_USER,
                    credential: TURN_PASS,
                },
            ]
        }
    });
    return peer
}


export function getID(peer) {
    return new Promise(function (myResolve, myReject) {
        const id = peer.on('open', function (id) {
            myResolve(id);
        });
    })
}

export async function connectToPeer(peer, id) {
    console.log('Connecting to peer:', id)
    const conn = peer.connect(id);
    return new Promise(async function (myResolve, myReject) {
        conn.on('open', function () {
            console.log('Connected to peer:', id)
            myResolve(conn);
        });
        conn.on('error', (err) => myReject(err))
        // timeout
        setTimeout(() => myReject(false), 5000)
    })
}

//send message to peer
export async function sendMessage(peer, conn, message, type) {
    console.log('Sending message:', message)
    let obj = {
        type: type,
        msg: message,
        from_id: peer._id,
        from_name: await getData('_db', 'config', 'name'),
        has_dropDown: false,
        has_images: [],
        has_files: [],
        datetime: getCurrentTime(),
        isReplied: 0
    }
    console.log('Sending:', obj)
    conn.send(obj)
}