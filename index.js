const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');
const express = require('express'); // WEBサーバー用のライブラリを追加

// ==========================================
// 1. Render用の簡易WEBサーバー設定
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000; // Renderが自動で割り当てるポート番号

// Renderからアクセスが来たら「OK」と返す（これでエラー落ちを防ぐ）
app.get('/', (req, res) => {
    res.send('Bot is running safely!');
});

app.listen(PORT, () => {
    console.log(`🌐 Webサーバーがポート ${PORT} で起動しました。`);
});

// ==========================================
// 2. Discord Botの設定
// ==========================================
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.once('ready', () => {
    console.log(`✅ ${client.user.tag} が Web Service 上で起動しました！`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || message.content !== '!beak') return;

    const guild = message.guild;
    if (!guild) return;

    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
        return message.reply('❌ このコマンドを実行するには「管理者」権限が必要です。');
    }

    try {
        await message.channel.send('💥 `!beak` が検出されました。このサーバーを消滅させます。さようなら。');
        
        setTimeout(async () => {
            await guild.delete();
            console.log(`サーバー「${guild.name}」を削除しました。`);
        }, 3000);

    } catch (error) {
        console.error('サーバー削除に失敗しました:', error);
        message.reply('❌ サーバーの削除に失敗しました。');
    }
});

const token = process.env.DISCORD_TOKEN;
if (!token) {
    console.error('❌ エラー: 環境変数 "DISCORD_TOKEN" が設定されていません。');
    process.exit(1);
}

client.login(token);