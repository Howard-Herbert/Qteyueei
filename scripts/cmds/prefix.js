module.exports = {

  config: {

    name: "prefix",

    aliases: ["Prefiz2", "px2"],

    version: "1.2",

    author: "SK-SIDDIK-KHAN", 

    countDown: 5,

    role: 0,

    shortDescription: {

      en: ""

    },

    longDescription: {

      en: "get information."

    },

    category: "auto",

    guide: {

      en: "{pn}"

    }

  },


  onStart: async function() {},

  onChat: async function({ event, message, getLang, usersData, threadsData }) {

    if (event.body && event.body.toLowerCase() === "prefix") {


      const data = await usersData.get(event.senderID);


      const name = data.name;


      const thread = (await threadsData.get(event.threadID))


      const threadName = thread.threadName;


      return message.reply({

        body: `├───⊙ 𝐏𝐑𝐄𝐅𝐈𝐗-𝐂𝐌𝐃 ⊙───┤\n\n├─❯ ${name}\n\n├─❯ 𝐁𝐎𝐓-𝐏𝐑𝐄𝐅𝐈𝐗:【 ${global.GoatBot.config.prefix} 】\n\n├─❯ 𝐁𝐎𝐓-𝐍𝐀𝐌𝐄: 𝐒𝐈𝐃𝐃𝐈𝐊-𝐁𝐎𝐓 \n\n├─❯𝐁𝐎𝐗-𝐍𝐀𝐌𝐄 : ${threadName}`,

        attachment: await global.utils.getStreamFromURL("https://i.imgur.com/jh4xtD2.jpeg")

      });

    }

  }

};
