document.querySelectorAll("#channelList li").forEach(function (i) {
    i.addEventListener("click", function (e) {
        u = "channel-chat",
            m = "channel",
            r();
        var t = i.getAttribute("id"),
            a = i.querySelector(".text-truncate").innerHTML,
            c = i.getAttribute("data-members");
        document.getElementById("channel-chat").querySelector(".text-truncate .user-profile-show").innerHTML = a,
            document.querySelector(".group-members-count").innerHTML = c + ' Members',
            document.querySelector(".user-profile-desc .text-truncate").innerHTML = a,
            document.querySelector(".audiocallModal .text-truncate").innerHTML = a,
            document.querySelector(".videocallModal .text-truncate").innerHTML = a,
            document.querySelector(".user-profile-sidebar .user-name").innerHTML = a;
        var s = document.getElementById(t).querySelector(".avatar-xs").getAttribute("src");
        s ? (document.querySelector(".user-own-img .avatar-sm").setAttribute("src", s), document.querySelector(".user-profile-sidebar .profile-img").setAttribute("src", s), document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", s), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", s)) : (document.querySelector(".user-own-img .avatar-sm").setAttribute("src", n), document.querySelector(".user-profile-sidebar .profile-img").setAttribute("src", n), document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", n), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", n))
    })
})