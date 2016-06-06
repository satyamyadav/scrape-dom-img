prerequisites

`nodejs`
`npm`


*	clone the repository and cd into the folder where it is cloned
* run:   npm install
* run :  npm start {url}


scrape-dom-img :
======================================================================
It can't scrape all the images of a site, It downloads the images loaded at url.

It is to omit the manual right click and `save as` step of saving images from web pages.

### usages

to download images of a url

`npm start <url>`

e.g.  `npm start https://www.lomography.com/photos/21236247`

to download images of multiple urls if url contains number pattern at last e.g. /pages/23 ,
then give an integer as second parameter to scrape multiple urls.

`npm start <url> <range>`  : range is integer

now open `Downloads/nodescraper` , every batch of scraping is downloaded in a new folder.

e.g. `npm start https://www.lomography.com/photos/21236247 5`
