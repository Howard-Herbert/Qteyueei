module.exports = {
  config: {
    name: "prefix",
    aliases: ["Prefiz2", "px2"],
    version: "1.2",
    author: "SK-SIDDIK-KHAN",
    countDown: 5,
    role: 0,
    category: "auto",
  },

  onStart: async function() {},

  onChat: async function({ event, message, getLang, usersData, threadsData }) {
    try {
      if (event.body && event.body.toLowerCase() === "prefix") {
        
        const data = await usersData.get(event.senderID);
        const name = data?.name || "User";

        const thread = await threadsData.get(event.threadID);
        const threadName = thread?.threadName || "Unknown";

        return message.reply({
          body: `戍式式式Ⅸ ??????-??? Ⅸ式式式扣\n\n戍式? ${name}\n\n戍式? ???-??????:□ ${global.GoatBot.config.prefix} ■\n\n戍式? ???-????: ??????-??? \n\n戍式????-???? : ${threadName}`,
          attachment: await global.utils.getStreamFromURL("https://i.imgur.com/jh4xtD2.jpeg")
        });
      }
    } catch (error) {
      console.error("Error in prefix command:", error);
      return message.reply("An error occurred while processing your request. Please try again later.");
    }
  },
};