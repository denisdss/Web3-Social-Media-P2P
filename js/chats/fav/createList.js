import {initializeChatFavList} from "./configureList.js";
export function createFavoriteList(peer, data) {
if (data){
    data.forEach(function (e, t) {
        var a = e.profile ? '<img src="' + e.profile + '" onerror="this.src = this.src" class="rounded-circle avatar-xs" alt=""><span class="user-status"></span>' : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-primary text-white"><span class="username">JP</span><span class="user-status"></span></span></div>',
            s = e.messagecount ? '<div class="ms-auto"><span class="badge bg-dark-subtle text-reset rounded p-1">' + e.messagecount + "</span></div>" : "",
            i = e.messagecount ? '<a href="javascript: void(0);" class="unread-msg-user">' : '<a href="javascript: void(0);">',
            l = 1 === e.id ? "active" : "";
        document.getElementById("favourite-users").innerHTML += '<li id="contact-id-' + e.id + '" data-contact_name="'+e.name+'" data-name="favorite" class="' + l + '">                  ' + i + '                       <div class="d-flex align-items-center">                          <div class="chat-user-img online align-self-center me-2 ms-0">                              ' + a + '                          </div>                          <div class="overflow-hidden">                              <p class="text-truncate mb-0">' + e.name + "</p>                          </div>                          " + s + "                      </div>                  </a>              </li>"
    })
    return initializeChatFavList(peer)
} else {
    console.error("Something went wrong: ")
}
}