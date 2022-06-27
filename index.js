import config from './config.json' assert { type: 'json' };
import prompt from 'prompt';
import ora from "ora";
import Discord from "discord.js";
const client = new Discord.Client();

prompt.start();
var inter, inter2, inter3, is = false;

const getToken = async () => {
    let token;

    if (config.token) token = config.token;
    else {
        let ptoken = await prompt.get(['token']);
        token = ptoken.token;
    };

    token = token.replaceAll(" ", "");

    let spinner = ora("Token'e giriş yapılıyor...").start();

    try {
        await client.login(token);
        await spinner.stop();
        await getChannel();
    } catch {
        spinner.stop();
        console.log("Token hatalı.");
    };
};

const getChannel = async () => {
    let kanal;

    if (config.kanal) kanal = config.kanal;
    else {
        let pkanal = await prompt.get(['kanal']);
        kanal = pkanal.kanal;
    };

    kanal = kanal.replaceAll(" ", "");

    let spinner = ora("Kanal kontrol ediliyor...").start();

    try {
        kanal = await client.channels.get(kanal);
        await spinner.stop();
        await startSystem(kanal);
        await client.on("message", message => {
            if (is == false && message.channel.id == kanal.id && message.author.id == "408785106942164992") {
                let msg = message.content.toLowerCase();
                if (msg.includes("beep") || msg.includes("boop") || msg.includes("real") || msg.includes("check") || msg.includes("complete")) {
                    stopSystem(kanal);
                };
            };
        });
    } catch (err) {
        console.log(err);
        spinner.stop();
        await client.destroy();
        console.log("Kanal hatalı.");
    };
};

const startSystem = async (kanal) => {

    console.log("Sistem başladı...");

    inter = setInterval(() => {
        kanal.send("wh");
        kanal.send("wb");
    }, 15000);

    inter2 = setInterval(() => {
        kanal.send("owo pray");
    }, 1000 * 60 * 5);

    inter3 = setInterval(() => {
        kanal.send("/bump");
    }, 1000 * 60 * 60 * 2);
};

const stopSystem = async (kanal) => {

    console.log("Sistem durdu. Doğrulama isteniyor...");

    clearInterval(inter);
    clearInterval(inter2);
    clearInterval(inter3);
    is = true;

    prompt.get(['Doğrulamayı onayladıktan sonra enterlayın']).then(a => {
        startSystem(kanal);
        is = false;
    });
};

getToken();