const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const pdfkit = require('pdfkit');

function getIssue(link,topic,repoName){
   request(link,cb);
   function cb(error, response , html){
    if(error){
        console.log(error);
    }else if (response.statusCode == 404) {
        console.log("Page Not Found");
      } else {
        getIssueHtml(html);
      }
}
function getIssueHtml(html){
    let $ = cheerio.load(html);
    let issuesElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let arr =[];
    // console.log(issuesElemArr.length);
    for(let i=0;i<issuesElemArr.length;i++){
       let link = $(issuesElemArr[i]).attr("href");
        arr.push(link);

    } 
    //  console.log(topic,"       ",arr)
    let folderpath= path.join(__dirname,topic);
    dirCreator(folderpath);
    let filePath = path.join(folderpath,repoName+".pdf");
    let text = JSON.stringify(arr);
    let pdfDoc = new pdfkit();
    pdfDoc.pipe(fs.createWriteStream(filePath))
    pdfDoc.text(text);
    pdfDoc.end();
}
}

function dirCreator(folderpath){
    if(!fs.existsSync(folderpath)){
        fs.mkdirSync(folderpath);
    }
    }

module.exports={
    getIssue : getIssue
}
