export function searchContacts() {
    for (input = document.getElementById("searchContact"),
    filter = input.value.toUpperCase(),
    list = document.querySelector(".sort-contact"),
    li = list.querySelectorAll(".mt-3 li"),
    div = list.querySelectorAll(".mt-3 .contact-list-title"),
    j = 0; j < div.length; j++) {
        var e = div[j];
        txtValue = e.innerText,
        -1 < txtValue.toUpperCase().indexOf(filter) ? div[j].style.display = "" : div[j].style.display = "none"
    }
    for (i = 0; i < li.length; i++)
        contactName = li[i],
        txtValue = contactName.querySelector("h5").innerText,
        -1 < txtValue.toUpperCase().indexOf(filter) ? li[i].style.display = "" : li[i].style.display = "none"
}
export function searchContactOnModal() {
    for (input = document.getElementById("searchContactModal"),
    filter = input.value.toUpperCase(),
    list = document.querySelector(".contact-modal-list"),
    li = list.querySelectorAll(".mt-3 li"),
    div = list.querySelectorAll(".mt-3 .contact-list-title"),
    j = 0; j < div.length; j++) {
        var e = div[j];
        txtValue = e.innerText,
        -1 < txtValue.toUpperCase().indexOf(filter) ? div[j].style.display = "" : div[j].style.display = "none"
    }
    for (i = 0; i < li.length; i++)
        contactName = li[i],
        txtValue = contactName.querySelector("h5").innerText,
        -1 < txtValue.toUpperCase().indexOf(filter) ? li[i].style.display = "" : li[i].style.display = "none"
}