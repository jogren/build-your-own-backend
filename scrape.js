const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const playerData = fs.createWriteStream('post.csv');
const teamData = fs.createWriteStream('post2.csv');

//Headers
playerData.write(`Name,Team,Goals,Position \n`);
teamData.write(`Name,gamesPlayed,Goals,Assists \n`);


request('https://www.mlssoccer.com/stats/season?year=2019&group=g', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    $('tbody tr').each((i, el) => {
      const name = $(el)
        .find('td[data-title="Player"]')
        .text()
      const team = $(el)
        .find('td[data-title="Club"]')
        .text()
      const goals = $(el)
        .find('td[data-title="G"]')
        .text();
      const position = $(el)
        .find('td[data-title="POS"]')
        .text();
      playerData.write(`${name}, ${team}, ${goals}, ${position} \n`);
    });
    console.log('Scraping Done...')
  }
})

request('https://www.mlssoccer.com/stats', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    $('tbody tr').each((i, el) => {
      const name = $(el)
        .find('td[data-title="club"]')
        .text()
      const gamesPlayed = $(el)
        .find('td[data-title="gp"]')
        .text()
      const goals = $(el)
        .find('td[data-title="g"]')
        .text();
      const assists = $(el)
        .find('td[data-title="a"]')
        .text();
      teamData.write(`${name}, ${gamesPlayed}, ${goals}, ${assists} \n`);
    });
    console.log('Scraping Done Second Time...')
  }
})