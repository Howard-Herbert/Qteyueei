module.exports = {
  config: {
    name: "resend",
    version: "9.9",
    author: "SK-SIDDIK-KHAN",
    countDown: 1,
    role: 0,
    category: "Admins",
    envConfig: {
      historyLimit: 5000,
    },
  },

  onStart: async function ({ api, message, event, threadsData, args }) {
    const allowedUID = "100059026788061";
    const settingKey = "settings.reSend";

    if (event.senderID !== allowedUID) {
      return api.sendMessage("You do not have permission to use this command.", event.threadID);
    }

    if (!["on", "off"].includes(args[0])) {
      return message.reply("Use 'on' to enable or 'off' to disable.");
    }

    const isEnabled = args[0] === "on";
    await threadsData.set(event.threadID, isEnabled, settingKey);

    if (isEnabled) {
      try {
        const historyLimit = this.config.envConfig.historyLimit;
        if (!global.reSend) global.reSend = {};
        global.reSend[event.threadID] = await api.getThreadHistory(event.threadID, historyLimit, undefined);
      } catch (error) {
        return message.reply("Failed Please try again later");
      }
    }

    return message.reply(isEnabled ? "┏━━━━━━━━━━━━━━━━━┓\n┣➤ Resend Mode On\n┣➤𝐒𝐊 𝐒𝐈𝐃𝐃𝐈𝐊 𝐊𝐇𝐀𝐍\n┗━━━━━━━━━━━━━━━━━┛ " : "┏━━━━━━━━━━━━━━━━━┓\n┣➤ Resend Mode Off\n┣➤𝐒𝐊 𝐒𝐈𝐃𝐃𝐈𝐊 𝐊𝐇𝐀𝐍\n┗━━━━━━━━━━━━━━━━━┛ ");
  },

  onChat: async function ({ api, threadsData, event }) {
    const settingKey = "settings.reSend";

    if (event.type !== "message_unsend") {
      const resend = await threadsData.get(event.threadID, settingKey);
      if (!resend) return;

      if (!global.reSend) global.reSend = {};
      if (!global.reSend[event.threadID]) {
        global.reSend[event.threadID] = [];
      }

      const historyLimit = this.config.envConfig.historyLimit;
      global.reSend[event.threadID].push(event);

      if (global.reSend[event.threadID].length > historyLimit) {
        global.reSend[event.threadID].shift();
      }
    }
  },
};