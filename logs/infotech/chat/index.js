function submit() {
    let div = document.getElementById('chat');

    let text = $("#input").val();

    let chat = document.createElement("p");
    chat.innerHTML = text;
    div.appendChild(chat);
    $.post("https://blark.it/tcsrw/messages_app/insert_message.php", {
        message: text,
        sender: "placeholder",
        recipient: "infotech",
    },
    )
}

$.get("https://blark.it/tcsrw/messages_app/fetch_messages.php",
    (data) => {
        for(let i = 0; i < data.length; i++) {

            let message = document.createElement("p");

            message.innerHTML = data[i].message;
            document.getElementById('chat').appendChild(message);
        }
    }
);