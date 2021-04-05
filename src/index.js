const fetch = require('node-fetch');
const cheerio = require('cheerio');
const scrapeIt = require('scrape-it');
const fs = require('fs');

const scrape = () => 
    fetch("https://www.cpubenchmark.net/cpu_list.php") 
    .then(body => body.text())
    .then(text => cheerio.load(text))
    .then($ => scrapeIt.scrapeHTML($, {
      benchmarks: {
        listItem: '#cputable tbody tr',
        data: {
          cpu: {
            selector: 'td:nth-child(1)',
          },
          score: {
            selector: 'td:nth-child(2)',
            convert: x => parseInt(x.replace(',', ''))
          },
        },
    }}));

(async () => {
    const data = await scrape();
    fs.writeFileSync('./output/output.json', JSON.stringify(data, null, 4));
})();