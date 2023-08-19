module.exports = { sendAs }

function sendAs(interaction, mentionned, text) {
    console.log(mentionned)
    interaction.channel.createWebhook({
        name: mentionned.username,
        avatar: mentionned.avatarURL(),
    })
        .then(webhook => {
            webhook.send({
                content: text,
                username: mentionned.username,
                avatarURL: mentionned.avatarURL(),
            });
            webhook.delete();
        })
        .catch(console.error);

}