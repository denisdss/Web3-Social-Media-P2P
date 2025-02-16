import {
	getLocation,
	showPosition,
	cameraPermission,
	audioPermission,
	removeImage,
	removeAttachedFile,
	removeAudioFile,
	themeColor,
	toggleChatView
} from "./modules.js"
import { searchContacts, searchContactOnModal } from "./modules/search.js";
import { searchUser } from "../chats/dm/search.js";
import {createChatList} from "../chats/dm/createList.js";
import { addData, getAllData, initDB, createTable, getData } from "../db/modules.js";
import {createFavoriteList} from "../chats/fav/createList.js";
import { createContactList } from "../contacts/createList.js";
import { Peer } from "../main.js";
import { cleanChatList, getChatStatus, updateChatStatus } from "../chats/chat.js";

document.getElementById('serachChatUser').addEventListener('keyup', searchUser);
document.getElementById('searchContact').addEventListener('keyup', searchContacts);
document.getElementById('searchContactModal').addEventListener('keyup', searchContactOnModal);


!function () {
	var d = !1,
		u = "users-chat",
		m = "users",
		s = window.location.origin + "/js/dir/",
		f = "",
		v = 1;

	
	document.getElementById("copyClipBoard").style.display = "none",
		document.getElementById("copyClipBoardChannel").style.display = "none";

	function e(e, t) {
		var a = new XMLHttpRequest;
		a.open("GET", s + e, !0), a.responseType = "json", a.onload = function () {
			var e = a.status;
			t(200 === e ? null : e, a.response)
		}, a.send()
	}

	
	(async()=>{
		await initDB('home',
			[
				{
					name: 'chats',
					attr: { keyPath: "id", autoIncrement: true }
				},
				{
					name: 'favorites',
					attr: { keyPath: "id", autoIncrement: true }
				},
				{
					name: 'channels',
					attr: { keyPath: "id", autoIncrement: true }
				},
				{
					name: 'contacts',
					attr: { keyPath: "id", autoIncrement: true }
				},
				{
					name: 'callList',
					attr: { keyPath: "id", autoIncrement: true }
				}
			]
		)
		await initDB('chat',
			[]
		)
		const peer = await Peer()
		await renderChatList(peer)
		// interval destroy chat and render when chatStatus is true
		
		async function renderChatList(peer){
			await updateChatStatus(false)
			const dataChats = await getAllData('home', 'chats');
			console.log('call createChatList')
			createChatList(peer, dataChats)
			const dataFav = await getAllData('home', 'favorites');
			createFavoriteList(peer, dataFav)
			const dataContacts = await getAllData('home', 'contacts');
			createContactList(peer, dataContacts)

			let renderInterval = setInterval(async () => {
				console.log('renderInterval')
				let status = await getChatStatus()
				if(status.value){
					clearInterval(renderInterval)
					await updateChatStatus(false)
					await cleanChatList()
					return renderChatList()
				}
			}, 1000);
			return true
		}
		

	})();
	//e("contacts.json", )//, toggleChatView(m);

	var a = document.getElementsByClassName("user-chat");
	document.querySelectorAll(".sort-contact ul li").forEach(function (e) {
        e.addEventListener("click", function (e) {
            Array.from(a).forEach(function (e) {
                e.classList.add("user-chat-show")
            })
        })
    })
	document.querySelectorAll(".user-chat-remove").forEach(function (e) {
        e.addEventListener("click", function (e) {
			$('#chatinput-form').find('button[type="submit"]').attr('disabled',true)
            Array.from(a).forEach(function (e) {
                e.classList.remove("user-chat-show")
            })
        })
    })

	$('#form-addContact').on('submit', async function(e){
		e.preventDefault();
		// convert form data to json
		let objForm = Object.fromEntries(
			new URLSearchParams(
				$(e.currentTarget).serialize()
			)
		)
		objForm.profile = ""
		objForm.status = ""
		await addData('home', 'contacts', objForm)
		await createTable('chat', objForm.id, { keyPath: "id", autoIncrement: true })
		$('#addContact-exampleModal').modal('hide')
	})

	var t = document.querySelector(".user-profile-sidebar");
	document.querySelectorAll(".user-profile-show").forEach(function (e) {
		e.addEventListener("click", function (e) {
			t.classList.toggle("d-block")
		})
	}), window.addEventListener("DOMContentLoaded", function () {
		var e = document.querySelector("#chat-conversation .simplebar-content-wrapper");
		e && (e.scrollTop = e.scrollHeight)
	});
	var i = document.getElementById("chatinputmorecollapse");

	
	document.body.addEventListener("click", function () {
		new bootstrap.Collapse(i, {
			toggle: !1
		}).hide()
	}), i && i.addEventListener("shown.bs.collapse", function () {
		new Swiper(".chatinput-links", {
			slidesPerView: 3,
			spaceBetween: 30,
			breakpoints: {
				768: {
					slidesPerView: 4
				},
				1024: {
					slidesPerView: 6
				}
			}
		})
	}), document.querySelectorAll(".contact-modal-list .contact-list li").forEach(function (e) {
		e.addEventListener("click", function () {
			e.classList.toggle("selected")
		})
	}), document.getElementById("favourite-users").onclick = function () {
		document.getElementById("chat-input").focus()
	}, document.getElementById("usersList").onclick = function () {
		document.getElementById("chat-input").focus()
	}, document.getElementById("channelList").onclick = function () {
		document.getElementById("chat-input").focus()
	};


	var l = document.querySelector("#chatinput-form"),
		g = document.querySelector("#chat-input"),
		y = document.querySelector(".chat-conversation-list");
	document.querySelector(".chat-input-feedback");

	
	//setInterval(h, 1e3);
	var b, x, o,
		S = [],
		E = 1;
	document.querySelector("#audiofile-input").addEventListener("change", function () {
		var a = document.querySelector(".file_Upload");
		o = document.querySelector("#audiofile-input").files[0];
		var e = new FileReader;
		e.readAsDataURL(o), a && a.classList.add("show"), e.addEventListener("load", function () {
			var e = o.name,
				t = Math.round(o.size / 1e6).toFixed(2);
			a.innerHTML = '<div class="card p-2 border mb-2 audiofile_pre d-inline-block position-relative">            <div class="d-flex align-items-center">                <div class="flex-shrink-0 avatar-xs ms-1 me-3">                    <div class="avatar-title bg-primary-subtle text-primary rounded-circle">                        <i class="bx bx-headphone"></i>                    </div>                </div>                <div class="flex-grow-1 overflow-hidden">                <h5 class="font-size-14 text-truncate mb-1">' + e + '</h5>                  <input type="hidden" name="downloadaudiodata" value="' + o + '"/>                        <p class="text-muted text-truncate font-size-13 mb-0">' + t + 'mb</p>                </div>                <div class="flex-shrink-0 ms-3">                    <div class="d-flex gap-2">                        <div>                        <i class="ri-close-line text-danger audioFile-remove"  id="remove-audioFile"></i>                        </div>                    </div>                </div>            </div>          </div>', b = e, x = t, removeAudioFile(), S[E] = o
		}, !1), E++
	});
	var q, k, c, L = [],
		A = 1;
	document.querySelector("#attachedfile-input").addEventListener("change", function () {
		var a = document.querySelector(".file_Upload");
		c = document.querySelector("#attachedfile-input").files[0], fr = new FileReader, fr.readAsDataURL(c), a && a.classList.add("show"), fr.addEventListener("load", function () {
			var e = c.name,
				t = Math.round(c.size / 1e6).toFixed(2);
			a.innerHTML = '<div class="card p-2 border attchedfile_pre d-inline-block position-relative">            <div class="d-flex align-items-center">                <div class="flex-shrink-0 avatar-xs ms-1 me-3">                    <div class="avatar-title bg-primary-subtle text-primary rounded-circle">                        <i class="ri-attachment-2"></i>                    </div>                </div>                <div class="flex-grow-1 overflow-hidden">                <a href="" id="a"></a>                    <h5 class="font-size-14 text-truncate mb-1">' + e + '</h5>                    <input type="hidden" name="downloaddata" value="' + c + '"/>                    <p class="text-muted text-truncate font-size-13 mb-0">' + t + 'mb</p>                </div>                <div class="flex-shrink-0 align-self-start ms-3">                    <div class="d-flex gap-2">                        <div>                        <i class="ri-close-line text-muted attechedFile-remove"  id="remove-attechedFile"></i>                        </div>                    </div>                </div>            </div>          </div>', q = e, k = t, L[A] = c, removeAttachedFile()
		}, !1), A++
	});
	var C = [],
		removeimg = 1;
	document.querySelector("#galleryfile-input").addEventListener("change", function () {
		var s = document.querySelector(".file_Upload");
		s.insertAdjacentHTML("beforeend", '<div class="profile-media-img image_pre"></div>');
		var i = document.querySelector(".file_Upload .profile-media-img");
		this.files && [].forEach.call(this.files, function (e) {
			if (!/\.(jpe?g|png|gif)$/i.test(e.name)) return alert(e.name + " is not an image");
			var t = new FileReader,
				a = "";
			t.addEventListener("load", function () {
				removeimg++, s && s.classList.add("show"), C.push(t.result), a += '<div class="media-img-list" id="remove-image-' + removeimg + '">          <a href="#">              <img src="' + this.result + '" alt="' + e.name + '" class="img-fluid">          </a>            <i class="ri-close-line image-remove" onclick="removeImage(`remove-image-' + removeimg + '`)"></i>          </div>', i.insertAdjacentHTML("afterbegin", a), 0
			}), t.readAsDataURL(e)
		})
	});

	function M(e, t) {
		var a = C,
			s = document.getElementById(e).querySelector(".chat-conversation-list"),
			i = "";
		a.forEach(function (e) {
			i += '<div class="message-img-list">          <div>            <a class="popup-img d-inline-block" href="' + e + '" target="_blank">                <img src="' + e + '" alt="" class="rounded border" width="200" />            </a>          </div>          <div class="message-img-link">            <ul class="list-inline mb-0">              <li class="list-inline-item dropdown">                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                    <i class="bx bx-dots-horizontal-rounded"></i>                </a>          <div class="dropdown-menu">            <a class="dropdown-item d-flex align-items-center justify-content-between" href="' + e + '" download>Download <i class="bx bx-download ms-2 text-muted"></i></a>            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="collapse" data-bs-target=".replyCollapse">Reply <i class="bx bx-share ms-2 text-muted"></i></a>            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#" data-bs-toggle="modal" data-bs-target=".forwardModal">Forward <i class="bx bx-share-alt ms-2 text-muted"></i></a>            <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Bookmark <i class="bx bx-bookmarks text-muted ms-2"></i></a>            <a class="dropdown-item d-flex align-items-center justify-content-between delete-image" id="delete-item-' + ++w + '" href="#">Delete <i class="bx bx-trash text-muted ms-2"></i></a>          </div>        </li>      </ul>    </div>    </div>'
		}), null != a && (s.insertAdjacentHTML("beforeend", '<li class="chat-list right" id="chat-list-' + w + '" >        <div class="conversation-list">            <div class="user-chat-content">                <div class="ctext-wrap">                    <div class="ctext-wrap-content">                        <div class="message-img mb-0">' + i + '                    </div>                    </div>                    </div>                  <div class="conversation-name">                    <small class="text-muted time">' + h() + '</small>                    <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>                </div>          </div>        </li>'), updateChatList(), y.querySelectorAll(".chat-list").forEach(function (e) {
			e.querySelectorAll(".delete-image").forEach(function (e) {
				e.addEventListener("click", function () {
					1 == e.closest(".message-img").childElementCount ? e.closest(".chat-list").remove() : e.closest(".message-img-list").remove()
				})
			})
		}), B.querySelectorAll(".chat-list").forEach(function (e) {
			e.querySelectorAll(".delete-image").forEach(function (e) {
				e.addEventListener("click", function () {
					1 == e.closest(".message-img").childElementCount ? e.closest(".chat-list").remove() : e.closest(".message-img-list").remove()
				})
			})
		})), document.querySelector(".file_Upload").classList.remove("show"), C = []
	}
	var B = document.querySelector("#channel-conversation");
	document.querySelector("#profile-foreground-img-file-input").addEventListener("change", function () {
		id;
		var e = document.querySelector(".profile-foreground-img"),
			t = document.querySelector(".profile-foreground-img-file-input").files[0],
			a = new FileReader;
		a.addEventListener("load", function () {
			e.src = a.result
		}, !1), t && a.readAsDataURL(t)
	}), document.querySelector("#profile-img-file-input").addEventListener("change", function () {
		var e = document.querySelector(".user-profile-image"),
			t = document.querySelector(".profile-img-file-input").files[0],
			a = new FileReader;
		a.addEventListener("load", function () {
			e.src = a.result
		}, !1), t && a.readAsDataURL(t)
	});
	

	

	

	
	document.getElementById("emoji-btn").addEventListener("click", function () {
		setTimeout(function () {
			var e, t = document.getElementsByClassName("fg-emoji-picker")[0];
			!t || (e = window.getComputedStyle(t) ? window.getComputedStyle(t).getPropertyValue("left") : "") && (e = (e = e.replace("px", "")) - 40 + "px", t.style.left = e)
		}, 0)
	})
}();
var primaryColor = window.getComputedStyle(document.body, null).getPropertyValue("--bs-primary-rgb");

themeColor(primaryColor);