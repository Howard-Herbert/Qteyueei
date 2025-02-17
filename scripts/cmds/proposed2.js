const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs")
 
module.exports = {
 config: {
 name: "proposed2",
 aliases: ["proposal"],
 version: "1.1",
 author: "SIDDIK",
 countDown: 5,
 role: 0,
 shortDescription: "@mention someone to propose",
 longDescription: "",
 category: "fun",
 guide: "{pn} mention/tag"
 },
 
 onStart: async function ({ message, event, args }) {
 const mention = Object.keys(event.mentions);
 if (mention.length == 0) return message.reply("🔰-Please mention someone-🔰");
 else if (mention.length == 1) {
 const one = event.senderID, two = mention[0];
 bal(one, two).then(ptth => { message.reply({ body: "├─LOVE YOU MY OXYGEN─┤", attachment: fs.createReadStream(ptth) }) })
 } else {
 const one = mention[1], two = mention[0];
 bal(one, two).then(ptth => { message.reply({ body: "├─LOVE YOU MY OXYGEN─┤", attachment: fs.createReadStream(ptth) }) })
 }
 }
 
};
 
async function bal(one, two) {
 
 let avtwo = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
 avtwo.circle()
 let avone = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)
 avone.circle()
 let pth = "propose.png"
 let img = await jimp.read("https://i.imgur.com/TI6tMW7.png")
 
 img.resize(760, 506).composite(avone.resize(90, 90), 185, 40).composite(avtwo.resize(95, 100), 517, 142);
 
 await img.writeAsync(pth)
 return pth
}
