import { initializeChatUserList } from "./configureList.js";

export function createChatList(peer, data) {
    if (data) {
        data.forEach(function (e, t) {
            let a = e.profile ?
                '<img src="' + e.profile + '" onerror="this.src = this.src" class="rounded-circle avatar-xs" alt=""><span class="user-status"></span>'
                : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-primary text-white"><span class="username">JL</span><span class="user-status"></span></span></div>',
                s = e.messagecount ? '<div class="ms-auto"><span class="badge bg-dark-subtle text-reset rounded p-1">' + e.messagecount + "</span></div>"
                    : "",
                i = e.messagecount ? '<a href="javascript: void(0);" class="unread-msg-user">' : '<a href="javascript: void(0);">';
            document.getElementById("usersList").innerHTML += '<li id="contact-id-' + e.id + '"  data-contact_name="'+e.name+'" data-name="direct-message" data-id="' + e.id + '">' + i + '<div class="d-flex align-items-center"><div class="chat-user-img online align-self-center me-2 ms-0">                          ' + a + '                      </div>                      <div class="overflow-hidden">                          <p class="text-truncate mb-0">' + e.name + "</p>                      </div>                      " + s + "                  </div>              </a>          </li>"
        })
        return initializeChatUserList(peer)
    } else {
    }
}
