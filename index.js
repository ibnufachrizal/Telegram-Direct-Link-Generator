// Import library node-telegram-bot-api dan module fs
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// Define token yang diberikan oleh BotFather
const token = 'YOUR_TELEGRAM_BOT_TOKEN';

// Buat instance dari TelegramBot
const bot = new TelegramBot(token, { polling: true });

// Define ID grup yang akan menerima link direct download
const groupId = 'YOUR_GROUP_ID';

// Function untuk menangkap pesan yang dikirim ke bot
bot.on('message', (msg) => {
  // Cek jika pesan yang dikirim adalah file
  if (msg.document) {
    // Dapatkan informasi file yang dikirim
    const fileId = msg.document.file_id;
    const fileName = msg.document.file_name;

    // Tampilkan informasi file yang dikirim ke console
    console.log(`File "${fileName}" dikirim oleh user ${msg.from.id}`);

    // Dapatkan link direct download untuk file yang dikirim
    bot.getFileLink(fileId).then((link) => {
      // Tampilkan link direct download ke console
      console.log(`Link direct download untuk file "${fileName}": ${link}`);

      // Menyimpan console log ke dalam file log.txt
      fs.appendFile('log.txt', `File "${fileName}" dikirim oleh user ${msg.from.id}\n`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      fs.appendFile('log.txt', `Link direct download untuk file "${fileName}": ${link}\n`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      // Buat inline keyboard yang berisi tombol download
      const inlineKeyboard = [
        [
          {
            text: `⬇️ Download Disini ⬇️`,
            url: link,
          },
        ],
      ];

      // Kirim link direct download ke grup yang telah didefinisikan
      bot.sendMessage(groupId, `Link direct download untuk file "${fileName}":`, {
        reply_markup: {
          inline_keyboard: inlineKeyboard,
      
    },
  });
});
}
});

      // Kirim link direct download ke grup yang telah didefinisikan
      // bot.sendMessage(groupId, `Link direct download untuk file "${fileName}": ${link} `);

      // Kirim link direct download ke pengirim pesan
      // bot.sendMessage(msg.from.id, `Link direct download untuk file "${fileName}": ${link}`);
