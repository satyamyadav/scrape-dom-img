'use strict';
var request = require('request');
var cheerio = require('cheerio');
var exec = require('child_process').exec;

var url = process.argv[2];
var range = process.argv[3];
var d = new Date();

//d = [d.getDate(), d.getMonth() + 1 , d.getFullYear(), d.getTime()].join('_');

exec("mkdir ~/Downloads/nodescraper");

const extractDomain =  (url) => {
    let domain;
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
const destination = "~/Downloads/nodescraper/" + d;
exec("mkdir" + destination);

const scrapeIt = (url) => {

  const scrape = (links) => {

    console.log('downloading ... at ', destination);

    links.forEach((link) => {
      let command =  ["wget", link, "-P " + destination].join(' ') ;
      exec(command);
    })
  }

  request(url, (error, response, html) => {
      if(!error){
        const $ = cheerio.load(html);
        const links = [];
        $('img').filter((i) => {
          let source = $('img')[i]['attribs']['src'];
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
  const last = url.match(/([^\/]*)\/*$/)[1];
  for (var i = 0; i < range; i++) {
    let newUrl = url.split(last)[0] + (parseInt(last) + i);
    //console.log(newUrl);
    scrapeIt(newUrl);
  }
} else {
  scrapeIt(url);
}
