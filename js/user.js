function getTabContentCount(){
    return $('#v-pills-tabContent').children().length
}
export function createUserTab(id, nickName, saveName){
    const tab = $(`
        <button class="nav-link" id="v-pills-${id}-tab" data-bs-toggle="pill"
                data-bs-target="#v-pills-${id}" type="button" role="tab" aria-controls="v-pills-${id}"
                aria-selected="false">
                ${nickName}
        </button>`)
    const tabContent = $(`
        <div class="tab-pane fade" id="v-pills-${id}" role="tabpanel" aria-labelledby="v-pills-${id}-tab">
            <form>
                <!-- Send message -->
                <input type="text" id="message" placeholder="Type your message">
                <button type="button" id="send">Send</button>
            </form>
        </div>
        `)

    tabContent.find('#send').on('click', function(){
        $('#send').on('click', function () {
            const message = $('#message').val()
            conn.send(message)
        })
    })
    tab.insertAfter('#v-pills-home-tab')
    tabContent.appendTo('#v-pills-tabContent')
}