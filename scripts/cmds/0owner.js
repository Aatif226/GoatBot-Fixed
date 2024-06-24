const { GoatWrapper } = require('fca-liane-utils');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
	config: {
		name: "owner",
		author: "Tokodori",
		role: 0,
		shortDescription: " ",
		longDescription: "",
		category: "admin",
		guide: "{pn}"
	},

	onStart: async function ({ api, event }) {
		try {
			const ownerInfo = {
				name: '𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡𝐢 𝐊𝐚𝐮𝐫',
				gender: '𝐅𝐞𝐦𝐥𝐞',
				hobby: '𝐆𝐮𝐧 𝐅𝐢𝐫𝐢𝐧𝐠 𝐀𝐧𝐝 𝐌𝐮𝐬𝐢𝐜',
				Fb: 'https://facebook.com/PriyanshiKaurJi',
				Relationship: '𝐂𝐫𝐮𝐬𝐡',
				bio: '𝐖𝐨𝐫𝐥𝐝 𝐈𝐬 𝐅𝐮𝐥𝐥 𝐎𝐟 𝐖𝐨𝐧𝐝𝐞𝐫𝐬. 𝐑𝐢𝐠𝐡𝐭'
			};

			const bold = 'https://i.imgur.com/SyBjkss.mp4';
			const tmpFolderPath = path.join(__dirname, 'tmp');

			if (!fs.existsSync(tmpFolderPath)) {
				fs.mkdirSync(tmpFolderPath);
			}

			const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
			const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

			fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

			const response = `
◈ 𝖮𝖶𝖭𝖤𝖱 𝖨𝖭𝖥𝖮𝖱𝖬𝖠𝖳𝖨𝖮𝖭:\n
Name: ${ownerInfo.name}
Gender: ${ownerInfo.gender}
Relationship: ${ownerInfo.Relationship}
Hobby: ${ownerInfo.hobby}
Fb: ${ownerInfo.Fb}
Bio: ${ownerInfo.bio}
			`;

			await api.sendMessage({
				body: response,
				attachment: fs.createReadStream(videoPath)
			}, event.threadID, event.messageID);

			fs.unlinkSync(videoPath);

			api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
		} catch (error) {
			console.error('Error in ownerinfo command:', error);
			return api.sendMessage('An error occurred while processing the command.', event.threadID);
		}
	}
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });