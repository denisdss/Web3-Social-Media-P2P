import { getCurrentTime, scrollToBottom } from "../pages/modules.js"
import { addData, getData, deleteData, getAllData } from "../db/modules.js"
import { startClient, getID, connectToPeer, sendMessage } from '../turn.js'
import { connectToServer, IMG_DUMMY } from '../main.js'
export function openChat(){
    var a = document.getElementsByClassName("user-chat");
    console.log(a, "userChatElement")
    Array.from(a).forEach(function (e) {
        e.classList.add("user-chat-show")
    });
}
export function setName(e) {
    console.log(e.currentTarget)
    let text = e.currentTarget.getAttribute("data-id"),
        name = e.currentTarget.getAttribute("data-contact_name")
    document.getElementById("users-chat").setAttribute("data-id", text)
    document.querySelector(".user-profile-sidebar .user-name").innerHTML = name
    document.getElementById("users-chat").querySelector(".text-truncate .user-profile-show").innerHTML = name
    document.querySelector(".user-profile-desc .text-truncate").innerHTML = name
    document.querySelector(".audiocallModal .text-truncate").innerHTML = name
    document.querySelector(".videocallModal .text-truncate").innerHTML = name;
}
export function setImg(e) {
    let img = e.currentTarget.querySelector(".avatar-xs").getAttribute("src");
    if (!img) {
        img = IMG_DUMMY
    }
    document.querySelector(".user-own-img .avatar-sm").setAttribute("src", img)
    document.querySelector(".user-profile-sidebar .profile-img").setAttribute("src", img)
    document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", img)
    document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", img)
    document.getElementById("users-conversation").querySelectorAll(".left .chat-avatar").forEach(function (e) {
        e.querySelector("img").setAttribute("src", img)
    })
    document.querySelectorAll(".user-own-img .avatar-sm").forEach(function (i) {
        i.addEventListener("error", function (e) {
            e.target.src = e.target.src
        })
    })
}

export function sendChatMessage(e,m,id,peer) {
    e.preventDefault();
    let u = "users-chat",
        d = !1,
        w = 0,
        g = document.querySelector("#chat-input");
    let t = u,
        a = u,
        s = u,
        i = u,
        l = u,
        n = g.value,
        r = document.querySelector(".image_pre"),
        o = document.querySelector(".attchedfile_pre"),
        c = document.querySelector(".audiofile_pre");
    null != r || null != r ? M(a) : null != o ? function (e, t, a) {
        debugger
        t = q, a = k;
        w++;
        var s = document.getElementById(e).querySelector(".chat-conversation-list");
        null != t && s.insertAdjacentHTML("beforeend", '\
            <li class="chat-list right" id="chat-list-' + w + '" >\
                <div class="conversation-list">\
                    <div class="user-chat-content">\
                        <div class="ctext-wrap">\
                            <div class="ctext-wrap-content">\
                                <div class="p-3 border-primary border rounded-3">\
                                    <div class="d-flex align-items-center attached-file">\
                                        <div class="flex-shrink-0 avatar-sm me-3 ms-0 attached-file-avatar">\
                                            <div class="avatar-title bg-primary-subtle text-primary rounded-circle font-size-20">\
                                                <i class="ri-attachment-2"></i>\
                                            </div>\
                                        </div>\
                                        <div class="flex-grow-1 overflow-hidden">\
                                            <div class="text-start">\
                                                <h5 class="font-size-14 mb-1">' + t + '</h5>\
                                                <p class="text-muted text-truncate font-size-13 mb-0">' + a + 'mb</p>\
                                                <p class="text-muted text-truncate font-size-13 mb-0"></p>\
                                            </div>\
                                        </div>\
                                        <div class="flex-shrink-0 ms-4">\
                                            <div class="d-flex gap-2 font-size-20 d-flex align-items-start">\
                                                <div>\
                                                    <a href="#" class="text-muted download-file" data-id="' + A + '">\
                                                        <i class="bx bxs-download"></i>\
                                                    </a>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="dropdown align-self-start message-box-drop">\
                                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    <i class="ri-more-2-fill"></i>\
                                </a>\
                                <div class="dropdown-menu">\
                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">\
                                        Reply\
                                    <i class="bx bx-share ms-2 text-muted"></i>\
                                    </a>\
                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">\
                                        Forward\
                                    <i class="bx bx-share-alt ms-2 text-muted"></i>\
                                    </a>\
                                    <a class="dropdown-item d-flex align-items-center justify-content-between copy-message" href="#" id="copy-message-' + w + '">\
                                        Copy\
                                    <i class="bx bx-copy text-muted ms-2"></i>\
                                    </a>\
                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">\
                                        Bookmark\
                                    <i class="bx bx-bookmarks text-muted ms-2"></i>\
                                    </a>\
                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">\
                                        Mark as Unread\
                                    <i class="bx bx-message-error text-muted ms-2"></i>\
                                    </a>\
                                    <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" id="delete-item-' + w + '" href="#">\
                                        Delete\
                                    <i class="bx bx-trash text-muted ms-2"></i>\
                                    </a>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="conversation-name">\
                            <small class="text-muted time">' + getCurrentTime() + '</small>\
                            <span class="text-success check-message-icon">\
                            <i class="bx bx-check"></i>\
                            </span>\
                        </div>\
                    </div>\
                </div>\
            </li>');
        var i = document.getElementById("chat-list-" + w);
        i.querySelectorAll(".delete-item").forEach(function (e) {
            e.addEventListener("click", function () {
                y.removeChild(i)
            })
        }), i.querySelectorAll(".download-file").forEach(function (i) {
            i.addEventListener("click", function (e) {
                e.preventDefault();
                var t, a, s = i.getAttribute("data-id");
                window.File && window.FileReader && window.FileList && window.Blob ? (t = new Blob([L[s]], {
                    type: "application/pdf"
                }), (a = document.createElement("a")).href = window.URL.createObjectURL(t), a.download = L[s].name, a.click()) : alert("The File APIs are not fully supported in this browser.")
            })
        }), document.querySelector(".file_Upload ").classList.remove("show")
    }(s, n) : null != c ? function (e, t, a) {
        t = b, a = x;
        w++;
        var s = document.getElementById(e).querySelector(".chat-conversation-list");
        null != t && s.insertAdjacentHTML("beforeend", '<li class="chat-list right" id="chat-list-' + w + '" >          <div class="conversation-list">              <div class="user-chat-content">                  <div class="ctext-wrap">                      <div class="ctext-wrap-content">                          <div class="p-3 border-primary border rounded-3">                              <div class="d-flex align-items-center attached-file">                                  <div class="flex-shrink-0 avatar-sm me-3 ms-0 attached-file-avatar">                                      <div class="avatar-title bg-primary-subtle text-primary rounded-circle font-size-20"><i class="bx bx-headphone"></i></div>                                  </div>                                  <div class="flex-grow-1 overflow-hidden">                                      <div class="text-start">                                          <h5 class="font-size-14 mb-1">' + t + '</h5>                                          <p class="text-muted text-truncate font-size-13 mb-0">' + a + 'mb</p>                                  </div>                                  </div>                                  <div class="flex-shrink-0 ms-4">                                      <div class="d-flex gap-2 font-size-20 d-flex align-items-start">                                          <div>                                          <a href="#" class="text-muted download-file" data-id="' + E + '" > <i class="bx bxs-download"></i> </a>                                          </div>                                      </div>                                  </div>                              </div>                          </div>                      </div>                      <div class="dropdown align-self-start message-box-drop">                          <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="ri-more-2-fill"></i> </a>                          <div class="dropdown-menu">                          <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>                          <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>                          <a class="dropdown-item d-flex align-items-center justify-content-between copy-message" href="#" id="copy-message-' + w + '">Copy <i class="bx bx-copy text-muted ms-2"></i></a>                          <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>                          <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Mark as Unread <i class="bx bx-message-error text-muted ms-2"></i></a>                           <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" id="delete-item-' + w + '" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>                      </div>                      </div>                      </div>                      <div class="conversation-name">                          <small class="text-muted time">' + getCurrentTime() + '</small>                            <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>                          </div>                        </div>                      </div>                    </li>');
        var i = document.getElementById("chat-list-" + w);
        i.querySelectorAll(".delete-item").forEach(function (e) {
            e.addEventListener("click", function () {
                y.removeChild(i)
            })
        }), document.querySelectorAll(".download-file").forEach(function (i) {
            i.addEventListener("click", function (e) {
                e.preventDefault();
                var t, a, s = i.getAttribute("data-id");
                window.File && window.FileReader && window.FileList && window.Blob ? (t = new Blob([L[s]], {
                    type: "application/mp3"
                }), (a = document.createElement("a")).href = window.URL.createObjectURL(t), a.download = S[s].name, a.click()) : alert("The File APIs are not fully supported in this browser.")
            })
        }), document.querySelector(".file_Upload ").classList.remove("show")
    }(i, n) : 1 == d ? (function (e, t) {
        debugger
        var a = document.querySelector(".user-profile-show").innerHTML,
            s = document.querySelector(".replyCard .replymessage-block .flex-grow-1 .mb-0").innerText;
        w++;
        var i = document.getElementById(e).querySelector(".chat-conversation-list");
        null != t && (i.insertAdjacentHTML("beforeend", '\
            <li class="chat-list right" id="chat-list-' + w + '" >\
                <div class="conversation-list">\
                    <div class="user-chat-content">\
                        <div class="ctext-wrap">\
                            <div class="ctext-wrap-content">\
                                <div class="replymessage-block mb-0 d-flex align-items-start">\
                                    <div class="flex-grow-1">\
                                        <h5 class="conversation-name">' + a + '</h5>\
                                        <p class="mb-0">' + s + '</p>\
                                    </div>\
                                    <div class="flex-shrink-0">\
                                        <button type="button" class="btn btn-sm btn-link mt-n2 me-n3 font-size-18"></button>\
                                    </div>\
                                </div>\
                            <p class="mb-0 ctext-content mt-1">' + t + '</p>\
                        </div>\
                        <div class="dropdown align-self-start message-box-drop">\
                            <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                <i class="ri-more-2-fill"></i>\
                            </a>\
                            <div class="dropdown-menu">\
                                <a class="dropdown-item d-flex align-items-center justify-content-between reply-message" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">\
                                    Reply\
                                    <i class="bx bx-share ms-2 text-muted"></i>\
                                </a>\
                                <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">\
                                    Forward\
                                    <i class="bx bx-share-alt ms-2 text-muted"></i>\
                                </a>\
                                <a class="dropdown-item d-flex align-items-center justify-content-between copy-message" href="#" id="copy-message-' + w + '">\
                                    Copy\
                                    <i class="bx bx-copy text-muted ms-2"></i>\
                                </a>\
                                <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">\
                                    Bookmark\
                                    <i class="bx bx-bookmarks text-muted ms-2"></i>\
                                </a>\
                                <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">\
                                    Mark as Unread\
                                    <i class="bx bx-message-error text-muted ms-2"></i>\
                                </a>\
                                <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" id="delete-item-' + w + '" href="#">\
                                    Delete\
                                    <i class="bx bx-trash text-muted ms-2"></i>\
                                </a>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="conversation-name">\
                        <small class="text-muted time">' + getCurrentTime() + '</small>\
                        <span class="text-success check-message-icon">\
                            <i class="bx bx-check"></i>\
                        </span>\
                    </div>\
                </div>\
            </div>\
        </li>'), 0);
        var l = document.getElementById("chat-list-" + w);
        l.querySelectorAll(".delete-item").forEach(function (e) {
            e.addEventListener("click", function () {
                y.removeChild(l)
            })
        }), l.querySelectorAll(".copy-message").forEach(function (e) {
            e.addEventListener("click", function () {
                document.getElementById("copyClipBoard").style.display = "block", document.getElementById("copyClipBoardChannel").style.display = "block", setTimeout(function () {
                    document.getElementById("copyClipBoard").style.display = "none", document.getElementById("copyClipBoardChannel").style.display = "none"
                }, 1e3)
            })
        }), l.querySelectorAll(".reply-message").forEach(function (s) {
            s.addEventListener("click", function () {
                var e = s.closest(".ctext-wrap").children[0].children[0].innerText,
                    t = document.querySelector(".user-profile-show").innerHTML;
                document.querySelector(".replyCard .replymessage-block .flex-grow-1 .mb-0").innerText = e;
                var a = !s.closest(".chat-list") || s.closest(".chat-list").classList.contains("left") ? t : "You";
                document.querySelector(".replyCard .replymessage-block .flex-grow-1 .conversation-name").innerText = a
            })
        }), l.querySelectorAll(".copy-message").forEach(function (e) {
            e.addEventListener("click", function () {
                l.childNodes[1].children[1].firstElementChild.firstElementChild.getAttribute("id"), isText = l.childNodes[1].children[1].firstElementChild.firstElementChild.innerText, navigator.clipboard.writeText(isText)
            })
        })
    }(l, n), 
    d = !1) : function (e, t) {
        w++;
        if ("users" == m) {
            m='chat'
        } else {
            m='channel'
        }
        (async()=>{
            
            //check if peer is online
            let attempt = 0
            
            

            await addData(m, id, {
                from_id: 1,
                //to_id: 2,
                msg: t, 
                has_dropDown: false,      
                has_images: [],
                has_files: [],
                datetime:  getCurrentTime(),
                isReplied: 0
            });
            const contact  = await getData('home', 'contacts', id)
            await deleteData('home', 'chats', id)
            await addData('home', 'chats', 
                {
                    id: id,
                    name: contact?.name || document.querySelector(".user-profile-show").innerHTML,
                    status: null,
                    profile: IMG_DUMMY
                }
            );

            let connectPeerInterval
            // check if connection is open
            console.log('Checking peer open:', peer.open)
            if (!peer.open) {
                peer = await connectToServer({address:peer._lastServerId})
            }
            let isOnline = await checkPeerOnline(peer, id)
            if(!isOnline){
                console.log('Peer is offline:', id)
                console.log('Retrying or send to server?')
            } else {
                console.log('Sending message to peer:', id)
                await sendMessage(peer, isOnline, t, m)
            }
            async function checkPeerOnline(peer, id) {
                console.log('Checking peer online:', id)
                return new Promise(async function (myResolve, myReject) {
                    try {
                        let conn = await connectToPeer(peer, id)
                        myResolve(conn)
                    }catch(e){
                        console.error(e)
                        myResolve(false)
                    }
                })
            }
        })();
        var a = document.getElementById(e).querySelector(".chat-conversation-list");
        null != t && a.insertAdjacentHTML("beforeend", '<li class="chat-list right" id="chat-list-' + w + '" >                <div class="conversation-list">                    <div class="user-chat-content">                        <div class="ctext-wrap">                            <div class="ctext-wrap-content">                                <p class="mb-0 ctext-content">' + t + '</p>                            </div>                            <div class="dropdown align-self-start message-box-drop">                                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                                    <i class="ri-more-2-fill"></i>                                </a>                                <div class="dropdown-menu">                                    <a class="dropdown-item d-flex align-items-center justify-content-between reply-message" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>                                    <a class="dropdown-item d-flex align-items-center justify-content-between copy-message" href="#" id="copy-message-' + w + '">Copy <i class="bx bx-copy text-muted ms-2"></i></a>                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Mark as Unread <i class="bx bx-message-error text-muted ms-2"></i></a>                                    <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" id="delete-item-' + w + '" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>                            </div>                        </div>                    </div>                    <div class="conversation-name">                        <small class="text-muted time">' + getCurrentTime() + '</small>                        <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>                    </div>                </div>            </div>        </li>');
        var s = document.getElementById("chat-list-" + w);
        s.querySelectorAll(".delete-item").forEach(function (e) {
            e.addEventListener("click", function () {
                a.removeChild(s)
            })
        }), s.querySelectorAll(".copy-message").forEach(function (e) {
            e.addEventListener("click", function () {
                document.getElementById("copyClipBoard").style.display = "block", document.getElementById("copyClipBoardChannel").style.display = "block", setTimeout(function () {
                    document.getElementById("copyClipBoard").style.display = "none", document.getElementById("copyClipBoardChannel").style.display = "none"
                }, 1e3)
            })
        }), s.querySelectorAll(".reply-message").forEach(function (i) {
            i.addEventListener("click", function () {
                var e = document.querySelector(".replyCard"),
                    t = document.querySelector("#close_toggle"),
                    a = i.closest(".ctext-wrap").children[0].children[0].innerText,
                    s = document.querySelector(".user-profile-show").innerHTML;
                    d = !0,
                    e.classList.add("show"), t.addEventListener("click", function () {
                        e.classList.remove("show")
                    }), document.querySelector(".replyCard .replymessage-block .flex-grow-1 .mb-0").innerText = a, document.querySelector(".replyCard .replymessage-block .flex-grow-1 .conversation-name").innerText = s
            })
        }), s.querySelectorAll(".copy-message").forEach(function (e) {
            e.addEventListener("click", function () {
                var e = s.childNodes[1].firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerText;
                navigator.clipboard.writeText(e)
            })
        })
    }(t, n),
        scrollToBottom(t || a || s || i || l),
        g.value = "",
        document.querySelector(".image_pre") && document.querySelector(".image_pre").remove(),
        document.getElementById("galleryfile-input").value = "",
        document.querySelector(".attchedfile_pre") && document.querySelector(".attchedfile_pre").remove(),
        document.getElementById("attachedfile-input").value = "",
        document.querySelector(".audiofile_pre") &&
        document.querySelector(".audiofile_pre").remove(),
        document.getElementById("audiofile-input").value = "",
        document.getElementById("close_toggle").click()
}

//check if public key of peer is available
export async function checkPeerPublicKey(peer, id) {
    return await getAllData('')
}


//update _db with chat status, is updated
export async function updateChatStatus(status){
    await deleteData('_db', 'config', 'chatstatus')
    await addData('_db', 'config', { code: 'chatstatus', value: status })
    return true
}

// get chat status
export async function getChatStatus(){
    return await getData('_db', 'config', 'chatstatus')
}

// clean chat list
export function cleanChatList(){
    document.getElementById("channelList").innerHTML = ''
    document.getElementById("usersList").innerHTML = ''
    document.getElementById("favourite-users").innerHTML = ''
    return true
}
