module.exports = {
	config: {
		name: "ramadan",
		version: "1.0",
		author: "SK-SIDDIK-KHAN", 
		aliases: ["romjan date"],
		countDown: 5,
		role: 0,
		category: "dates",
		shortDescription: "See Ramadan time",
		longDescription: "Ramadan countdown date",
		guide: "en: {p}{n}"
	},

	onStart: async function ({ event, api }) {
		const targetDate = Date.parse("February 28, 2025 00:00:00");
		const currentTime = Date.parse(new Date());
		const timeDifference = targetDate - currentTime;
		const seconds = Math.floor((timeDifference / 1000) % 60);
		const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
		const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
		const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
		
		const userName = (await api.getUserInfo(event.senderID))[event.senderID].name;

		const message = `┏━━━━━━━━━━━━━━━━━┓\n┣➤ ${userName}\n┣➤ ⏰ রমজান আসতে সময় বাকি\n┣➤  ${days} দিন\n┣➤  ${hours} ঘন্টা \n┣➤ ${minutes} মিনিট \n┣➤ ${seconds} সেকেন্ড\n┗━━━━[𝗦𝗜𝗗𝗗𝗜𝗞-𝗕𝗢𝗧]━━━━━┛`;

		await api.sendMessage({
			body: message,
			attachment: await global.utils.getStreamFromURL("https://i.imgur.com/d2HIXRV.jpeg")
		}, event.threadID, event.messageID);
	}
};