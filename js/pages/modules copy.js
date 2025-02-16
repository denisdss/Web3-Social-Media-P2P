import { checkTable, getAllData, createTable } from "../db/modules.js";
import {sendChatMessage} from "../chats/chat.js"
const INFO = true;
const ERROR = true;
const DEBUG = true;



export function info(msg) {
    if (INFO === true) console.log(msg);
}

export function error(msg) {
    if (ERROR === true) console.error(msg);
}

export function debug(msg) {
    if (DEBUG === true) console.debug(msg);
}


export function getLocation() {
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(showPosition) : x.innerHTML = "Geolocation is not supported by this browser."
}

export function showPosition(e) {
    x.innerHTML = "Latitude: " + e.coords.latitude + "<br>Longitude: " + e.coords.longitude
}

export function cameraPermission() {
    navigator.mediaDevices.getUserMedia ? navigator.mediaDevices.getUserMedia({
        video: !0
    }).then(function (e) {
        video.srcObject = e
    }).catch(function (e) {
        console.log(e)
    }) : console.log("No")
}

export function audioPermission() {
    navigator.mediaDevices.getUserMedia({
        audio: !0
    }).then(function (e) {
        window.localStream = e, window.localAudio.srcObject = e, window.localAudio.autoplay = !0
    })
}

export function removeImage(e) {
    document.querySelector("#" + e).remove(), 0 == document.querySelectorAll(".image-remove").length && document.querySelector(".file_Upload").classList.remove("show")
}

export function removeAttachedFile() {
    document.getElementById("remove-attechedFile") && (document.getElementsByClassName("attechedFile-remove")[0], document.getElementById("remove-attechedFile").addEventListener("click", function (e) {
        e.target.closest(".attchedfile_pre").remove()
    })), document.querySelector("#remove-attechedFile").addEventListener("click", function () {
        document.querySelector(".file_Upload ").classList.remove("show")
    })
}

export function removeAudioFile() {
    document.getElementById("remove-audioFile") && (document.getElementsByClassName("audioFile-remove")[0], document.getElementById("remove-audioFile").addEventListener("click", function (e) {
        e.target.closest(".audiofile_pre").remove()
    })), document.querySelector("#remove-audioFile").addEventListener("click", function () {
        document.querySelector(".file_Upload ").classList.remove("show")
    })
}

export function themeColor(e) {
    let rgbColor;
    var c = window.localStorage.getItem("color"),
        d = window.localStorage.getItem("image");
    document.querySelectorAll(".theme-img , .theme-color").forEach(function (o) {
        o.id == c && (o.checked = !0), o.id == d && (o.checked = !0);
        var e, t, a, s = document.querySelector("input[name=bgcolor-radio]:checked");
        s && (s = s.id, e = document.getElementsByClassName(s), t = window.getComputedStyle(e[0], null).getPropertyValue("background-color"), a = document.querySelector(".user-chat-overlay"), "bgcolor-radio8" == s ? (t = "#4eac6d", a.style.background = null) : a.style.background = t, rgbColor = t.substring(t.indexOf("(") + 1, t.indexOf(")")), document.documentElement.style.setProperty("--bs-primary-rgb", rgbColor));
        var i, l, n = document.querySelector("input[name=bgimg-radio]:checked");
        n && (n = n.id, window.localStorage.setItem("image", n), i = document.getElementsByClassName(n), e && (l = window.getComputedStyle(i[0], null).getPropertyValue("background-image"), document.querySelector(".user-chat").style.backgroundImage = l)), o.addEventListener("click", function (e) {
            o.id == c && (o.checked = !0), o.id == d && (o.checked = !0);
            var t, a, s, i = document.querySelector("input[name=bgcolor-radio]:checked");
            i && (i = i.id, (t = document.getElementsByClassName(i)) && (a = window.getComputedStyle(t[0], null).getPropertyValue("background-color"), s = document.querySelector(".user-chat-overlay"), "bgcolor-radio8" == i ? (a = "#4eac6d", s.style.background = null) : s.style.background = a, rgbColor = a.substring(a.indexOf("(") + 1, a.indexOf(")")), document.documentElement.style.setProperty("--bs-primary-rgb", rgbColor), window.localStorage.setItem("color", i)));
            var l, n, r = document.querySelector("input[name=bgimg-radio]:checked");
            r && (r = r.id, window.localStorage.setItem("image", r), l = document.getElementsByClassName(r), t && (n = window.getComputedStyle(l[0], null).getPropertyValue("background-image"), document.querySelector(".user-chat").style.backgroundImage = n))
        })
    })
}

export function toggleChatView(m, id, key) { // old r()
    let s = window.location.origin + "/js/dir/"
    $('.chat-content').show()
    if ("users" == m) {
        document.getElementById("channel-chat").style.display = "none"
        document.getElementById("users-chat").style.display = "block"
    } else {
        document.getElementById("channel-chat").style.display = "block"
        document.getElementById("users-chat").style.display = "none"
    }
    fetchDataAndRender(s + "chats.json", m, id, key)
}

function fetchDataAndRender(e, m, id, key) { //old _(e, m)
    var a, s;
    (async () => {
        let table, l
        if ("users" == m) {
            table = `chat`
        } else {
            table = `channel`
        }
        console.log(table, id)
        try {
            l = await getAllData(table, id)
        } catch (e) {
            if (!await checkTable(table, id)) {
                console.log("creating table")
                console.log(table,id)
                let retorno = await createTable(table, id, { keyPath: "id", autoIncrement: true })
                console.log(retorno)
            }
        } finally {
            l = await getAllData(table, id)
            return render(200, l)
        }
    })();
    async function render(e, t) { //old a = function
        let f = await getAllData('home', "contacts"),
            v = 1
        var l, n, a, i, r, s, o, c,
            y = document.querySelector(".chat-conversation-list"),
            B = document.querySelector("#channel-conversation");
        if (false) {
            console.log("Something went wrong: " + e)
        } else {
            l = t
            document.getElementById(m + "-conversation").innerHTML = ""
            n = 0
            console.log(l)
            l.forEach(function (t, e) {
                console.log(t)
                var a, s, i;
                if (0 < n) {
                    --n
                } else {
                    a = t.from_id == v ? " right" : " left"
                    s = f.find(function (e) {
                        return e.id == t.from_id
                    })
                    console.log(s)
                    i = '<li class="chat-list' + a + '" id=' + t.id + '><div class="conversation-list">',
                        v != t.from_id && (i += '<div class="chat-avatar"><img src="' + s.profile + '" onerror="this.src = this.src" alt=""></div>'),
                        i += '<div class="user-chat-content">',
                        i += handleMessage(t.id, t.msg, t.has_images, t.has_files, t.has_dropDown)
                    l[e + 1] && t.from_id == l[e + 1].from_id && (
                        n = function (e, t, a) {
                            for (var s = 0; e[t] && e[t + 1] && e[t + 1].from_id == a;) s++, t++;
                            return s
                        }(l, e, t.from_id),
                        i += function (e, t, a) {
                            for (var s = 0; e[t] && e[t + 1] && e[t + 1].from_id == a;)
                                s = handleMessage(e[t + 1].id,
                                    e[t + 1].msg,
                                    e[t + 1].has_images,
                                    e[t + 1].has_files,
                                    e[t + 1].has_dropDown),
                                    t++;
                            return s
                        }(l, e, t.from_id))
                    i += '<div class="conversation-name">\
                    <small class="text-muted time">' + t.datetime + '</small>\
                    <span class="text-success check-message-icon">\
                    <i class="bx bx-check-double"></i></span></div>',
                        i += "</div></div></li>",
                        document.getElementById(m + "-conversation").innerHTML += i
                }
            })
        }
        y.querySelectorAll(".delete-item").forEach(function (e) {
            e.addEventListener("click", function () {
                2 == e.closest(".user-chat-content").childElementCount ? e.closest(".chat-list").remove() : e.closest(".ctext-wrap").remove()
            })
        })
        B.querySelectorAll(".delete-item").forEach(function (e) {
            e.addEventListener("click", function () {
                2 == e.closest(".user-chat-content").childElementCount ? e.closest(".chat-list").remove() : e.closest(".ctext-wrap").remove()
            })
        })
        y.querySelectorAll(".chat-list").forEach(function (e) {
            e.querySelectorAll(".delete-image").forEach(function (e) {
                e.addEventListener("click", function () {
                    1 == e.closest(".message-img").childElementCount ? e.closest(".chat-list").remove() : e.closest(".message-img-list").remove()
                })
            })
        })
        y.querySelectorAll(".copy-message").forEach(function (t) {
            t.addEventListener("click", function () {
                var e = t.closest(".ctext-wrap").children[0] ? t.closest(".ctext-wrap").children[0].children[0].innerText : "";
                navigator.clipboard.writeText(e)
            })
        })
        B.querySelectorAll(".copy-message").forEach(function (t) {
            t.addEventListener("click", function () {
                var e = t.closest(".ctext-wrap").children[0] ? t.closest(".ctext-wrap").children[0].children[0].innerText : "";
                navigator.clipboard.writeText(e)
            })
        })
        scrollToBottom("users-chat"), updateChatList(), document.querySelectorAll(".copy-message").forEach(function (e) {
            e.addEventListener("click", function () {
                document.getElementById("copyClipBoard").style.display = "block", document.getElementById("copyClipBoardChannel").style.display = "block", setTimeout(function () {
                    document.getElementById("copyClipBoard").style.display = "none", document.getElementById("copyClipBoardChannel").style.display = "none"
                }, 1e3)
            })
        })
        a = y.querySelectorAll(".reply-message"), i = document.querySelector(".replyCard"), r = document.querySelector("#close_toggle"), a.forEach(function (s) {
            s.addEventListener("click", function () {
                d = !0, i.classList.add("show"), r.addEventListener("click", function () {
                    i.classList.remove("show")
                });
                var e = s.closest(".ctext-wrap").children[0].children[0].innerText;
                document.querySelector(".replyCard .replymessage-block .flex-grow-1 .mb-0").innerText = e;
                var t = document.querySelector(".user-profile-show").innerHTML,
                    a = !subitem.closest(".chat-list") || subitem.closest(".chat-list").classList.contains("left") ? t : "You";
                document.querySelector(".replyCard .replymessage-block .flex-grow-1 .conversation-name").innerText = a
            })
        })
        s = B.querySelectorAll(".reply-message"), o = document.querySelector(".replyCard"), c = document.querySelector("#close_toggle"), s.forEach(function (a) {
            a.addEventListener("click", function () {
                d = !0, o.classList.add("show"), c.addEventListener("click", function () {
                    o.classList.remove("show")
                });
                var e = a.closest(".ctext-wrap").children[0].children[0].innerText;
                document.querySelector(".replyCard .replymessage-block .flex-grow-1 .mb-0").innerText = e;
                var t = document.querySelector(".user-profile-show").innerHTML;
                document.querySelector(".replyCard .replymessage-block .flex-grow-1 .conversation-name").innerText = t
            })
        })
        console.log("Chat Rendered")
        $('#chatinput-form').unbind('submit').on('submit', function (e) {
            e.preventDefault()
            return sendChatMessage(e, m, id, key)
        }).find('button[type="submit"]').attr('disabled',false)
    }
}

export function scrollToBottom(e) { //old p(e)
    try {
        var t = document.getElementById(e).querySelector("#chat-conversation .simplebar-content-wrapper"),
            a = document.getElementsByClassName("chat-conversation-list")[0] ? document.getElementById(e).getElementsByClassName("chat-conversation-list")[0].scrollHeight - window.innerHeight + 250 : 0;
        a && t.scrollTo({
            top: a,
            behavior: "smooth"
        })
    } catch (e) { }
}

function updateChatList() { // old F()
    GLightbox({
        selector: ".popup-img",
        title: !1
    })
}

function handleMessage(e, t, a, s, i) { // old H(e, t, a, s, i)
    console.log(e, t, a, s, i)
    var l = '<div class="ctext-wrap">',
        w = 0;
    if (t) l += '\
    <!-- Message Text -->\
    <div class="ctext-wrap-content" id=' + e + '>\
        <p class="mb-0 ctext-content">\
        ' + t + "\
        </p>\
    </div>";
    else if (a && 0 < a.length) {
        for (l += '<div class="message-img mb-0">', T = 0; T < a.length; T++) l += '\
        <!-- Message Img -->\
        <div class="message-img-list">\
            <div>\
                <a class="popup-img d-inline-block" href="' + a[T] + '">\
                    <img src="' + a[T] + '" alt="" class="rounded border">\
                </a>\
            </div>\
            <div class="message-img-link">\
                <ul class="list-inline mb-0">\
                    <li class="list-inline-item dropdown">\
                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                            <i class="bx bx-dots-horizontal-rounded"></i>\
                        </a>\
                        <div class="dropdown-menu">\
                            <a class="dropdown-item d-flex align-items-center justify-content-between" href="' + a[T] + '" download>\
                                Download\
                                <i class="bx bx-download ms-2 text-muted"></i>\
                            </a>\
                            <a class="dropdown-item d-flex align-items-center justify-content-between"  href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">\
                                Reply\
                                <i class="bx bx-share ms-2 text-muted"></i>\
                            </a>\
                            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">\
                                Forward\
                                <i class="bx bx-share-alt ms-2 text-muted"></i>\
                            </a>\
                            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">\
                                Bookmark\
                                <i class="bx bx-bookmarks text-muted ms-2"></i>\
                            </a>\
                            <a class="dropdown-item d-flex align-items-center justify-content-between delete-image" href="#">\
                                Delete\
                                <i class="bx bx-trash ms-2 text-muted"></i>\
                            </a>\
                        </div>\
                    </li>\
                </ul>\
            </div>\
        </div>';
        l += "</div>"
    } else 0 < s.length && (l += '\
        <!-- Attached File -->\
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
                            <h5 class="font-size-14 mb-1">\
                                design-phase-1-approved.pdf\
                            </h5>\
                            <p class="text-muted text-truncate font-size-13 mb-0">\
                                12.5 MB\
                            </p>\
                        </div>\
                    </div>\
                    <div class="flex-shrink-0 ms-4">\
                        <div class="d-flex gap-2 font-size-20 d-flex align-items-start">\
                            <div>\
                                <a href="#" class="text-muted">\
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
                <a class="dropdown-item d-flex align-items-center justify-content-between"  href="' + s + '" download>\
                    Download\
                    <i class="bx bx-download ms-2 text-muted"></i>\
                </a>\
                <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">\
                    Reply\
                    <i class="bx bx-share ms-2 text-muted"></i>\
                </a>\
                <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">\
                    Forward\
                    <i class="bx bx-share-alt ms-2 text-muted"></i>\
                </a>\
                <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">\
                    Bookmark\
                    <i class="bx bx-bookmarks text-muted ms-2"></i>\
                </a>\
                <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" href="#">\
                    Delete\
                    <i class="bx bx-trash text-muted ms-2"></i>\
                </a>\
            </div>\
        </div>');
    return !0 === i && (l += '\
        <!-- Dropdown -->\
        <div class="dropdown align-self-start message-box-drop">\
            <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                <i class="ri-more-2-fill"></i>\
            </a>\
            <div class="dropdown-menu">\
                <a class="dropdown-item d-flex align-items-center justify-content-between reply-message" href="#" id="reply-message-' + w + '" data-bs-toggle="collapse" data-bs-target=".replyCollapse">\
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
                <a class="dropdown-item d-flex align-items-center justify-content-between delete-item" href="#">\
                    Delete\
                    <i class="bx bx-trash text-muted ms-2"></i>\
                </a>\
            </div>\
        </div>'), 
        l += "</div>"
}

for (var j = document.getElementsByClassName("favourite-btn"), T = 0; T < j.length; T++) {
    var I = j[T];
    I.onclick = function () {
        I.classList.toggle("active")
    }
}

new FgEmojiPicker({
    trigger: [".emoji-btn"],
    removeOnSelection: !1,
    closeButton: !0,
    position: ["top", "right"],
    preFetch: !0,
    dir: "js/dir/json",
    insertInto: document.querySelector(".chat-input")
});

export function getCurrentTime() { //old h()
    var e = 12 <= (new Date).getHours() ? "pm" : "am",
        t = 12 < (new Date).getHours() ? (new Date).getHours() % 12 : (new Date).getHours(),
        a = (new Date).getMinutes() < 10 ? "0" + (new Date).getMinutes() : (new Date).getMinutes();
    return t < 10 ? "0" + t + ":" + a + " " + e : t + ":" + a + " " + e
}