const discordBotToken = 'YOUR BOT TOKEN BETWEEN SINGLE QUOTATION MARKS';

const api = require('kucoin-node-api');

const config = {
    apiKey: 'xXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxXXX',
    secretKey: 'xxxxxxxxXXXXXXXXXXXXXxxXXXXXXXXXXXXXxxxXXX',
    passphrase: 'xxxxxx',
    environment: 'live'
};

api.init(config);

const Discord = require('discord.js');

const bot = new Discord.Client();

let guildMeCache = [];

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity(`VRA on Kucoin`, { type: 'WATCHING'});

    bot.guilds.cache.each(guild => guildMeCache.push(guild.me));

    let symbol = 'VRA-USDT';

    const getPrice = () => {
        let data =  api.get24hrStats(symbol);
        data.then(function(result) {
            //console.log(result.data.price)
            let price = result.data.last;
            let trimmedPrice = parseFloat(price.substring(0,7));
	    let centPrice = (trimmedPrice * 100);
            let change = result.data.changePrice;
	    let changeArrow = change > 0 ? '▲' : (change < 0 ? '▼' : '▶')
            guildMeCache.forEach(guildMe => guildMe.setNickname(`${centPrice}¢ ${changeArrow} ${((change/(-change+trimmedPrice))*100).toFixed(2)}%`));
        })
            //console.log(output.data.changeRate)
            bot.user.setActivity(`VRA on Kucoin`, { type: 'WATCHING'});
    };

    function myFunction() {
        myVar = setInterval(getPrice,10000)
    };

    myFunction()
});


bot.login(discordBotToken);