var request = require('request');
var cheerio = require('cheerio');
var exec = require('child_process').exec;

var url = process.argv[2];
var range = process.argv[3];
var d = new Date();

//d = [d.getDate(), d.getMonth() + 1 , d.getFullYear(), d.getTime()].join('_');

exec("mkdir ~/Downloads/nodescraper");

var extractDomain = function (url) {
    var domain;
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    domain = domain.split(':')[0];
    return domain;
}

d = ['nodescraper', extractDomain(url), d.getTime()].join('_');
var destination = "~/Downloads/nodescraper/" + d;
exec("mkdir" + destination);

var scrapeIt = function (url) {

  var scrape = function(links) {

    console.log('downloading ... at ', destination);

    links.forEach(function (link) {
      var command =  ["wget", link, "-P " + destination].join(' ') ;
      exec(command);

    })
  }

  request(url, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);
        var links = [];
        $('img').filter(function(i){
          var source = $('img')[i]['attribs']['src'];
          if (source.indexOf('http') < 0) {
            source = 'http:' + source;
          }
          //console.log(source);
          links.push(source);
        });
        scrape(links);
      }
  })/*.pipe(request.put(url));*/
  console.log('scrapping');
}


if (range) {
  var last = url.match(/([^\/]*)\/*$/)[1];
  for (var i = 0; i < range; i++) {
    var newUrl = url.split(last)[0] + (parseInt(last) + i);
    //console.log(newUrl);
    scrapeIt(newUrl);
  }
} else {
  scrapeIt(url);
}
