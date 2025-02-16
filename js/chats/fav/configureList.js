import { toggleChatView } from "../../pages/modules.js";
import { openChat, setImg, setName } from "../chat.js";

export function initializeChatFavList(peer) {
    document.querySelectorAll("#favourite-users li").forEach(function (l) {
        console.log(l)
        l.addEventListener("click", function (e) {
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