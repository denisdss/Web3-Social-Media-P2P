import { initializeContactList } from "./configureContacts.js";

export function createContactList(peer, data) {
    if (data) {
        let f, i, l;
        (f = data).sort(function (e, t) {
            return e.name.localeCompare(t.name)
        }),
            l = i = "",
            f.forEach(function (e, t) {
                var a = e.profile ? '<img src="' + e.profile + '" onerror="this.src = this.src" class="img-fluid rounded-circle" alt="">' : '<span class="avatar-title rounded-circle bg-primary font-size-10">FP</span>';
                i = '<li data-name="direct-message" data-id="'+e.id+'" data-contact_name="'+e.name+'">              <div class="d-flex align-items-center">                  <div class="flex-shrink-0 me-2">                      <div class="avatar-xs">                          ' + a + '                      </div>                  </div>                  <div class="flex-grow-1">                      <h5 class="font-size-14 m-0" >' + e.name + '</h5>                  </div>                  <div class="flex-shrink-0">                      <div class="dropdown">                          <a href="#" class="text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                              <i class="bx bx-dots-vertical-rounded align-middle"></i>                          </a>                          <div class="dropdown-menu dropdown-menu-end">                              <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Edit <i class="bx bx-pencil ms-2 text-muted"></i></a>                              <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Block <i class="bx bx-block ms-2 text-muted"></i></a>                              <a class="dropdown-item d-flex align-items-center justify-content-between" href="#">Remove <i class="bx bx-trash ms-2 text-muted"></i></a>                          </div>                      </div>                  </div>              </div>          </li>';
                var s = '<div class="mt-3" >              <div class="contact-list-title">' + e.name.charAt(0).toUpperCase() + '                </div>          <ul id="contact-sort-' + e.name.charAt(0) + '" class="list-unstyled contact-list" >';
                l != e.name.charAt(0) && (document.getElementsByClassName("sort-contact")[0].innerHTML += s), document.getElementById("contact-sort-" + e.name.charAt(0)).innerHTML = document.getElementById("contact-sort-" + e.name.charAt(0)).innerHTML + i, l = e.name.charAt(0)
            })
            return initializeContactList(peer)
    } else {
        console.error("Something went wrong: ")
    }
}

// function another() {
//     function (e, t) {
//         var i, l;
//         null !== e ? console.log("Something went wrong: " + e) :
//             (),
//             //, initializeChatUserList()
//     }
// }
