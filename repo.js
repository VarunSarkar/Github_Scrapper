const request = require('request');
const cheerio = require('cheerio');
const issue = require('./issue');

function getRepoLink(link,topic){
   request(link,cb);

   function cb(error, response , html){
    if(error){
        console.log(error);
    }else if (response.statusCode == 404) {
        console.log("Page Not Found");
      } else {
        //   console.log(html);
        getRepoLink(html);
      }
}
function getRepoLink(html){
 let searchTool = cheerio.load(html);
 let headArr = searchTool(".f3.color-text-secondary.text-normal.lh-condensed");
 
 for(let i=0;i<8;i++){
     let anchors = searchTool(headArr[i]).find("a");
     let link = searchTool(anchors[1]).attr("href");
  //  console.log(link);
    // get issues 
    let fullLink =`https://github.com${link}/issues`;
    // console.log(fullLink);
    let repoName = link.split("/").pop();
    issue.getIssue(fullLink,topic,repoName);
    
  }
  // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

}
}


module.exports = {
    getRepoLink : getRepoLink
}