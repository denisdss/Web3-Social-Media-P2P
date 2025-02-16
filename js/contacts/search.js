export function searchUser() {
    for (input = document.getElementById("serachChatUser"),
    filter = input.value.toUpperCase(),
    ul = document.querySelector(".chat-room-list"),
    li = ul.getElementsByTagName("li"),
    i = 0; i < li.length; i++) {
        -1 < li[i].querySelector("p").innerText.toUpperCase().indexOf(filter) ? li[i].style.display = "" : li[i].style.display = "none"
    }
}