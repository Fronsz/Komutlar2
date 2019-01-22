const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('**Aleyküm Selam,Hoş Geldin**');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bb') {
    msg.reply('**Görüşürüz Dostum,Kendine İyi Bak :wave:** ');
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'iyi geceler') {
    msg.reply('Sanada İyi Geceler. Tatlı Rüyalar :)');
  }
});
client.on("message", msg => {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
             if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.channel.send(`${message.author.username} Küfür etti, küfürü engellendi.`).then(msg => msg.delete(3000));
             }              
          } catch(err) {
            console.log(err);
          }
        }
    });
    client.on("message", message => {
      const dmchannel = client.channels.find("name", "dm-log");
      if (message.channel.type === "dm") {
          if (message.author.bot) return;
          dmchannel.sendMessage("", {embed: {
              color: 3447003,
              title: `Gönderen: ${message.author.tag}`,
              description: `Bota Özelden Gönderilen DM: ${message.content}`
          }})
      }
  });
  client.on('message', msg => {
    if (msg.content.toLowerCase() === 'nasılsınız') {
      msg.reply('**İyiyim, Allaha Çok Şükür Sen Nasılsın?**');
    }
  });
  client.on('message', msg => {
    if (msg.content.toLowerCase() === 'napıyosunuz') {
      msg.reply('**Sizi İzliyorum, Sen Napıyosun?**');
    }
  });
  client.on('message', msg => {
    if (msg.content.toLowerCase() === 'günaydın') {
      msg.reply('**Sanada Günaydın.Hoşgeldin**');
    }
  });
  var oyun = [
    "*yardım 🔥 + *davet 🔥 ",
    "🔥 Yakında Çok Güzel Komutlar Geliyor !",
    "*davet Yazarak Botumuzu Ekleyebilirsiniz"
];
setInterval(function() {

    var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

    client.user.setGame(oyun[random], "https://www.twitch.tv/jahrein");
    }, 2 * 2500);
    
    client.on('message', async msg => {
      if (msg.content.toLowerCase() === 'sa') {
        await msg.react('🇦');
        msg.react('🇸');
      }
      });
     
      client.on("message", async message => {
        var user = message.mentions.users.first() || message.author;
          if (message.content.toLowerCase() === prefix + "wasted") {
              var user = message.mentions.users.first() || message.author;
              if (!message.guild) user = message.author;
      
              message.channel.send("? | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));
      
              Jimp.read(user.avatarURL, (err, image) => {
                  image.resize(400, 400)
                  image.greyscale()
                  image.gaussian(3)
                  Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2F1.png?1529363616039", (err, avatar) => {
                      avatar.resize(400, 400)
                      image.composite(avatar, 2, 0).write(`./img/snip/${client.user.id}-${user.id}.png`);
                      setTimeout(function() {
                          message.channel.send(new Discord.Attachment(`./img/snip/${client.user.id}-${user.id}.png`));
                      }, 1000);
                  });
      
              });
          }
      });
      client.on('message', message => {
        if (message.content === '<@513126642202312719>') {
         message.reply('Prefixim: ** * **')
        }
        });