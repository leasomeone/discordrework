
const embed = require('../functions/embedLib.js');
const log = require('../functions/logLib.js');
const roles = require('../functions/rolesLib.js');
const mysql =require('../functions/mysqlLib.js');

module.exports = { secrets }

async function secrets(message) {
    switch(message.content) {
        case 'initroles':
            if (message.author.id == '970394382912094218') {
                await message.channel.send({ embeds: [
                    embed.description('Choose your update roles:', 'Choose the info you\'d like to get pinged for'),
                ], content: '', components: [
                    roles.buttonModsRow(),
                ] });
                await message.channel.send({ embeds: [
                    embed.description('Choose your misc roles:', 'Choose the miscellaneous things you\'d like to get pinged for'),
                ], content: '', components: [
                    roles.buttonMiscRow(),
                ] });
                await message.channel.send({ embeds: [
                    embed.description('Choose your pronous:', 'Choose what pronouns you\'d like to get called by\n*(Suggestions are always open)*'),
                ], content: '', components: [
                    roles.selectGender(),
                ] });
                await message.channel.send({ embeds: [
                    embed.title('Wich voring practice do you do ?'),
                ], content: '', components: [
                    roles.selectType(),
                ] });
                await message.channel.send({ embeds: [
                    embed.description('Choose your kinks :', 'Choose in those five (discord limit) kinks the ones your comfortable with\n*(Suggestions are always open)*'),
                ], content: '', components: [
                    roles.selectVore(),
                ] });
                log.info(`"Initroles" in #${message.channel.name}`)
            }
            else {
                message.reply({ embeds: [embed.error('Ayo new phone who dis ?')] });
                log.error(`"Initroles" tried by ${message.author.username} in #${message.channel.name}`)
            }
            break;
        case 'jointest':
            if (message.author.id == '970394382912094218') {
                message.client.emit('guildMemberAdd', message.author);
                log.info(`"Jointest" of ${message.author.username} in #${message.channel.name}`);
                message.reply({ embeds: [embed.title('Here ya go')] });
            }
            else {
                message.reply({ embeds: [embed.error('Ayo new phone who dis ?')] });
                log.error(`"Jointest" tried by ${message.author.username} in #${message.channel.name}`)
            }
            break;

        case 'mysqltest':
            mysql.connect();
            break;


        default:
            console.log(message.content)
            break;
    }
    


}