const axios = require("axios");

module.exports = {
  config: {
    name: "album2",
    aliases: ["audio", "অডিও"],
    version: "1.3",
    author: "SK-SIDDIK-KHAN",
    countDown: 5,
    role: 0,
    description: {
      en: "all audio"
    },
    category: "user",
    guide: {
      en: "{pn} [page]"
    }
  },
  onStart: async ({ message, event, commandName, args, api }) => {
    try {
      const { data: { siddik: audios } } = await axios.get("https://raw.githubusercontent.com/ABU-BAKKAR-SIDDIK-DJ/TAL-GASH/refs/heads/main/TAL-GACH.json");

      const itemsPerPage = 5;
      const page = parseInt(args[0]) || 1;
      const totalPages = Math.ceil(audios.length / itemsPerPage);

      if (page < 1 || page > totalPages) {
        return message.reply({ body: `Invalid page number. Please enter a number between 1 and ${totalPages}.` });
      }

      const startIndex = (page - 1) * itemsPerPage;
      const audiosOnPage = audios.slice(startIndex, startIndex + itemsPerPage);

      let messageContent = `╭╼|━♡𝐒𝐈𝐃𝐃𝐈𝐊-𝐁𝐎𝐓-𝟎𝟕♡━|╾╮\n\nআপনার পছন্দের অডিও শুনতে একটি নাম্বারে রিপ্লাই করুন:\n\n╰╼|━♡𝐒𝐈𝐃𝐃𝐈𝐊-𝐁𝐎𝐓-𝟎𝟕♡━|╾╯\n` +
        `┏━━━━━━━━━━━━━━━━━┓\n` +
        audiosOnPage
          .map((audio, index) => `┣➤ ${startIndex + index + 1}. ${audio.name} `)
          .join("\n") +
        `\n┗━━━━[𝗦𝗜𝗗𝗗𝗜𝗞-𝗕𝗢𝗧]━━━━┛\n` +
        `\n☽━━━━━━━━━━━━━━━━━━☾\n           🔰 | 𝐏𝐚𝐠𝐞 [ ${page}/${totalPages} ] 🔰\n☽━━━━━━━━━━━━━━━━━━☾`;

      message.reply({ body: messageContent }, (err, replyMessage) => {
        if (!err) {
          global.GoatBot.onReply.set(replyMessage.messageID, {
            commandName,
            messageID: replyMessage.messageID,
            author: event.senderID,
            siddik: audios,
            currentPage: page,
            itemsPerPage,
            totalPages,
            type: "reply"
          });

          setTimeout(() => {
            api.unsendMessage(replyMessage.messageID);
          }, 30000);
        }
      });
    } catch (error) {
      message.reply({ body: "Failed to fetch audio list. Please try again later." });
    }
  },
  onReply: async ({ message, event, Reply, args, api }) => { 
    if (event.senderID !== Reply.author) return;

    const selectedNumber = parseInt(args[0]);
    if (isNaN(selectedNumber)) {
      return message.reply({ body: "Please enter a valid number." });
    }

    const selectedAudio = Reply.siddik[selectedNumber - 1];

    if (selectedAudio) {
      const loadingMessage = await message.reply({ body: "𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐀𝐮𝐝𝐢𝐨 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭...⏰" });

      try {
        const audioUrl = selectedAudio.verses[Math.floor(Math.random() * selectedAudio.verses.length)];
        
        await message.reply({
          body: `𝐒𝐈𝐃𝐃𝐈𝐊-𝐁𝐎𝐓 - ${selectedAudio.name}`,
          attachment: await global.utils.getStreamFromURL(audioUrl)
        });
        
        await api.unsendMessage(loadingMessage.messageID); 
      } catch (error) {
        message.reply({ body: "Failed to send the audio. Please try again." });
        await api.unsendMessage(loadingMessage.messageID);
      }
    } else {
      message.reply({ body: "Invalid selection. Please try again." });
    }
  }
};