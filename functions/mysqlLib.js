const mysql = require('mysql');
const config = require('../config.js');
const log = require('../functions/logLib.js');
const embed = require('../functions/embedLib.js');
const time = require('./timeLib.js')

module.exports = { connect, addWarn, viewWarn }

function connect() {
    con = mysql.createConnection({
        host: config.mysqlHost,
        user: config.mysqlUser,
        password: config.mysqlPass,
        database: 's1_bot',
        port: 3306,
      });
      
      con.connect(function(err) {
        if (err) throw err;
        log.info("Connected to mysql!");
        //apply("DELETE FROM users WHERE id = '970394382912094218'")
        //addWarn('970394382912094218', 'testv2')
      });
}

function addWarn(idd, warning) {
    warn = warning + " - " + time.dateCalendar()
    con.query("SELECT id, warns FROM users", function (err, result) {
        if (err) log.error(err)
        for(let i = 0; result.length; i++) {
            if (result[i].id == idd) {
                apply(`UPDATE users SET warns = '${result[i].warns + "\n" + warn}' WHERE id = '${idd}'`)
                return;
            }
        }
        apply(`INSERT INTO users (id, warns) VALUES ('${idd}', '${warn}')`);
      });
}

function viewWarn(interaction) {
    mentionned = interaction.options.getUser('user');
    con.query("SELECT id, warns FROM users", function (err, result) {
        if (err) log.error(err)
        for(let i = 0; result.length; i++) {
            if (result[i].id == mentionned.id) {
                interaction.reply({ embeds: [embed.description(`Warns for ${mentionned.username} : ` , result[i].warns)] });
                return;
            }
        }
        interaction.reply({ embeds: [embed.error(`This user as no warns!`)] });
      });
}


function apply(sql) {
    con.query(sql, function (err, result) {
        if (err) log.error(err)
      });
}

