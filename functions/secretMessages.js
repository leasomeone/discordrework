const mysql =require('../functions/mysqlLib.js');

module.exports = { secrets }

async function secrets(message) {
    switch(message.content) {
        case 'mysqltest':
            mysql.connect();
            break;

        default:
            console.log(message.content + " in " + message.channel.name)
            break;
    }
    


}