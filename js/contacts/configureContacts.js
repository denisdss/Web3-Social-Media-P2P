import { setName, setImg, openChat } from "../chats/chat.js";
import { toggleChatView } from "../pages/modules.js";
export function initializeContactList(peer) {
    document.querySelectorAll(".sort-contact ul li").forEach(function (s) {
        s.addEventListener("click", function (e) {
            setName(e)
            setImg(e)
            toggleChatView(
                "users",
                e.currentTarget.getAttribute("data-id"),
                e.currentTarget.getAttribute("data-key"),
                peer
            );
            openChat()
            window.stop()
        })
    })
}