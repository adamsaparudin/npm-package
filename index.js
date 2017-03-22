var request = require('request');
var cheerio = require('cheerio');

module.exports = function(from, to, date, people) {
  request(`https://www.tiket.com/pesawat/cari?d=${from}&a=${to}&date=${date}&adult=${people}&child=0&infant=0`, function (error, response, html) {
    let $ = null
    let price = []
    let plane = []
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(html)
      $('div.strike').next().each( function(i, element) {
        let a = $(this).text()
        price.push(a)
      })
      $('div.flight_mark').children().next().each( function(i, element) {
        let b = $(this).text()
        plane.push(b)
      })
    }
    for(let i=0; i<price.length; i++) {
      console.log("Pesawat -> " + plane[i] + "\nHarga -> " + price[i]);
      console.log();
    }
  });
}
