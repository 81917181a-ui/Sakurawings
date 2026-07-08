const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// Render用のWEBサーバー（起動を維持するために必要です）
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

client.once('ready', () => {
    console.log(`✅ ${client.user.tag} が正常に起動しました。`);
});

client.on('messageCreate', async (message) => {
    // Bot自身の発言は無視
    if (message.author.bot) return;

    // 💡 特定のユーザーIDを指定
    const TARGET_USER_ID = '1200435015834677330';

    // 指定したIDの人が発言した場合のみ、1回だけテキストを送信
    if (message.author.id === TARGET_USER_ID) {
        try {
            const replyMessage = `西日本航空 | West Japan Airways
> 西日本航空へようこそ
> 我々と共に新たな空へ飛び立ってみませんか？
> 西日本航空は常に最高のサービスを意識しております。フリーカメラサービス、ドリンクサービス、その他様々なサービスを行っております。
> ぜひお越しください！

> Welcome to West Japan Airways.  
> Would you like to take off into a new sky with us?  
> West Japan Airways is always mindful of providing the highest quality service. We offer free camera service, drink service, and various other services.  
> Please come and visit us!

Current routes / 就航路線
> WA101  Chicago O'Hare International Airport → Decatur Airport
> WA102 Decatur Airport → Chicago O'Hare International Airport
> 
> WJ1001 Chicago O'HARE international Airport → Kobe Airport
> WJ141 Ishigaki Airport → Kobe Airport

https://discord.gg/DmBBQnn7aN

[New Ishigaki Airport](https://cdn.discordapp.com/attachments/1467834130623500308/1504524491320197180/West_To_World_Flying_With_Everyone_4.png?ex=6a074d1f&is=6a05fb9f&hm=10326d9aeed8909a1ca34524cdf899debd4cbb4a412334ee770bb38c6db0db04&)
[Kobe Airport](https://media.discordapp.net/attachments/1467835009540030651/1490808540082995401/2026-04-04_031227.png?ex=69d56725&is=69d415a5&hm=ac7a76c55863364fdf470326c0c8547556a87d644ad710712c19793eee56d6c6&=&format=webp&quality=lossless&width=1689&height=859)
@everyone`;

            await message.channel.send(replyMessage);
            console.log(`[Log] ${message.author.tag} の発言に応答してお知らせを送信しました。`);
        } catch (error) {
            console.error('ozeu', error);
        }
    }
});

const token = process.env.DISCORD_TOKEN;
if (!token) {
    console.error('❌ エラー: 環境変数 "DISCORD_TOKEN" が設定されていません。');
    process.exit(1);
}

client.login(token);