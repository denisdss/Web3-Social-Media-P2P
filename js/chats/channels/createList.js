import { initializeChatUserList } from "./configureList.js";

function createChannelList(data) {
    if(data){
        data.forEach(function (e, t) {
            var a = e.messagecount ? '<div class="flex-shrink-0 ms-2"><span class="badge bg-dark-subtle text-reset rounded p-1">' + e.messagecount + "</span></div>" : "",
                s = e.messagecount ? '<a href="javascript: void(0);" class="unread-msg-user">' : '<a href="javascript: void(0);">';
            document.getElementById("channelList").innerHTML += '<li id="contact-id-' + e.id + '" data-name="channel" data-members="' + e.members + '">                ' + s + '                     <div class="d-flex align-items-center">                        <div class="flex-shrink-0 avatar-xs me-2">                            <span class="avatar-title rounded-circle bg-light-subtle text-reset">#</span>                        </div>                        <div class="flex-grow-1 overflow-hidden">                            <p class="text-truncate mb-0">' + e.name + "</p>                        </div>                        <div>" + a + "</div>                        </div>                </a>            </li>"
        })
        return initializeChatUserList()
    } else {
        console.error("Something went wrong: ")
    }
}


function another(){

    //a()

    
    document.querySelectorAll(".user-own-img .avatar-sm").forEach(function (i) {
        i.addEventListener("error", function (e) {
            e.target.src = e.target.src
        })
    })
}