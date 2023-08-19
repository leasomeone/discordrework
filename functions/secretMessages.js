const mysql =require('../functions/mysqlLib.js');
const lang =require('../lang/en_US.json');


module.exports = { secrets }

async function secrets(message) {
    switch(message.content) {
        case 'mysqltest':
            mysql.connect();
            break;

        case 'langtest':
            message.reply(lang.test);
            break;

        default:
            break;
    }
    


}