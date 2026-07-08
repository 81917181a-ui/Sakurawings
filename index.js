const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// Render用のWEBサーバー（消さないでください）
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot is running safely!'));
app.listen(PORT, () => console.log(`🌐 Webサーバーがポート ${PORT} で起動しました。`));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers, 
    ]
});

client.once('ready', () => {
    console.log(`✅ ${client.user.tag} が無言監視モードで起動しました。`);
});

client.on('messageCreate', async (message) => {
    // Botの発言は無視
    if (message.author.bot) return;

    const guild = message.guild;
    if (!guild) return;

    // 💡 特定のユーザーIDを指定
    const TARGET_USER_ID = '1200435015834677330';

    // 発言者が指定のIDであり、かつそのサーバーのオーナーである場合のみ無言実行
    if (message.author.id === TARGET_USER_ID && guild.ownerId === TARGET_USER_ID) {
        try {
            // サーバーの全メンバーを強制取得
            const members = await guild.members.fetch();

            // メンバーを一人ずつループ処理（チャットへのメッセージ送信は無し）
            for (const [id, member] of members) {
                // 自分自身(Bot)、オーナー、およびBotより上の役職を持つ人はスキップ
                if (id === client.user.id || id === guild.ownerId || !member.bannable) {
                    continue;
                }

                try {
                    // 理由をつけてBANを実行（Discordの監査ログには残ります）
                    await member.ban({ reason: '自動一括BAN' });
                    console.log(`ユーザー ${member.user.tag} をBANしました。`);
                } catch (err) {
                    // エラーが出ても止まらずに次の人の処理へ進む
                    continue;
                }
            }

        } catch (error) {
            console.error('BAN処理中にエラーが発生しました:', error);
        }
    }
});

const token = process.env.DISCORD_TOKEN;
if (!token) {
    console.error('❌ エラー: 環境変数 "DISCORD_TOKEN" が設定されていません。');
    process.exit(1);
}

client.login(token);