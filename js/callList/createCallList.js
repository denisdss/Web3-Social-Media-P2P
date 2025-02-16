export function createCallList(e, t) {
    let callList;
    if (null !== e){
        console.log("Something went wrong: " + e)
    } else {
        callList = t
        callList.forEach(function (e, t) {
            let a = !0 === e.callVideo ? '<button type="button" class="btn btn-link p-0 font-size-20 stretched-link" data-bs-toggle="modal" data-bs-target=".videocallModal"><i class="' + e.callTypeIcon + '"></i></button>' : '<button type="button" class="btn btn-link p-0 font-size-20 stretched-link" data-bs-toggle="modal" data-bs-target=".audiocallModal"><i class="' + e.callTypeIcon + '"></i></button>',
                s = e.profile ? '<img src="' + e.profile + '" onerror="this.src = this.src" class="rounded-circle avatar-xs" alt="">' : '<div class="avatar-xs"><span class="avatar-title rounded-circle bg-danger text-white">RL</span></div>';
            document.getElementById("callList").innerHTML += '<li id="calls-id-' + e.id + '" >        <div class="d-flex align-items-center">        <div class="chat-user-img flex-shrink-0 me-2">            ' + s + '        </div>            <div class="flex-grow-1 overflow-hidden">                <p class="text-truncate mb-0">' + e.name + '</p>                <div class="text-muted font-size-12 text-truncate"><i class="' + e.callArrowType + '"></i> ' + e.dateTime + '</div>            </div>            <div class="flex-shrink-0 ms-3">                <div class="d-flex align-items-center gap-3">                    <div>                        <h5 class="mb-0 font-size-12 text-muted">' + e.callTime + "</h5>                    </div>                    <div>                       " + a + "                    </div>                </div>            </div>        </div>      </li>"
        })
        document.querySelectorAll("#callList li").forEach(function (i) {
            i.addEventListener("click", function (e) {
                let t = i.getAttribute("id"),
                    a = i.querySelector(".text-truncate").innerHTML;
                document.querySelector(".videocallModal .text-truncate").innerHTML = a, document.querySelector(".audiocallModal .text-truncate").innerHTML = a;
                let s = document.getElementById(t).querySelector(".avatar-xs").getAttribute("src");
                s ? (document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", s), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", s)) : (document.querySelector(".audiocallModal .img-thumbnail").setAttribute("src", n), document.querySelector(".videocallModal .videocallModal-bg").setAttribute("src", n))
            })
        })
    }
}