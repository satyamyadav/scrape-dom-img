prerequisites

`nodejs`
`npm`


*	clone the repository and cd into the folder where it is cloned
* run:   npm install
* run :  npm start <url>

scrape-dom-img :
======================================================================
It can't scrape all the images of a site, It downloads the images loaded at url.

It is to omit the manula right click and `save as` step of saving images from web pasges.

### usages

to download images of a url

`npm start <url>`

to download images of multiple urls if url contains number pattern at last e.g. /pages/23 ,
then give a an integer as second parameter to scrape multiple urls.

`npm start <url> <range>`  : range is integer

now open `Downloads/nodescraper` , every batch of scraping is downloaded in a new folder.
