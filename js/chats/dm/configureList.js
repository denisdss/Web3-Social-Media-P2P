import { setName, setImg, openChat } from "../chat.js";
import { toggleChatView } from "../../pages/modules.js";
export function initializeChatUserList(peer) {
    document.querySelectorAll("#usersList li").forEach(function (e) {
        e.addEventListener("click", function (e) {
            setName(e)
            setImg(e)
            toggleChatView(
                "users",
                e.currentTarget.getAttribute("data-id"),
                e.currentTarget.getAttribute("data-key"),
                peer
            );
            openChat()
            var t = document.querySelector("#usersList li.active");
            t && t.classList.remove("active"), this.parentNode.classList.add("active")
        })
    })
}