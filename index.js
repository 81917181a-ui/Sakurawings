const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// Render用のWEBサーバー
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot is running safely!'));
app.listen(PORT, () => console.log(`🌐 Webサーバーがポート ${PORT} で起動しました。`));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.once('clientReady', () => {
    console.log(`✅ ${client.user.tag} が正常に起動しました（メッセージ更新完了）。`);
});

client.on('messageCreate', async (message) => {
    // Bot自身の発言、またはテキストチャンネル以外（DMなど）は無視
    if (message.author.bot || !message.guild) return;

    // 💡 監視したいロールIDを指定
    const TARGET_ROLE_ID = '1316404974921711690';

    // 発言したメンバーが、指定の役職を持っているかチェック
    if (message.member && message.member.roles.cache.has(TARGET_ROLE_ID)) {
        try {
            // 💡 送信するメッセージの内容
            const replyMessage = `#top discord.gg/ctkp
# CTKP ON TOP
https://imgur.com/qdN0dRN
https://imgur.com/MqyOJK0
@economy`;

            // 1回目送信
            await message.channel.send(replyMessage);
            // 2回目送信
            await message.channel.send(replyMessage);
            // 3回目送信
            await message.channel.send(replyMessage);
            // 4回目送信
            await message.channel.send(replyMessage);
            // 5回目送信
            await message.channel.send(replyMessage);
            // 6回目送信
            await message.channel.send(replyMessage);
            console.log(`[Log] 指定の役職保持者の発言に応答して、新しいメッセージを2回送信しました。`);
        } catch (error) {
            console.error('メッセージ送信中にエラーが発生しました:', error);
        }
    }
});

const token = process.env.DISCORD_TOKEN;
if (!token) {
    console.error('❌ エラー: 環境変数 "DISCORD_TOKEN" が設定されていません。');
    process.exit(1);
}

client.login(token);