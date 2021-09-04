const url = "https://github.com/topics";
const request = require('request');
const cheerio = require('cheerio');
const getRepo = require("./repo");
request(url,cb);

function cb(error, response , html){
    if(error){
        console.log(error);
    }else if (response.statusCode == 404) {
        console.log("Page Not Found");
      } else {
        getTopicLinks(html);
      }
}
// get the links of the topics.
function getTopicLinks(html){
  let searchTool = cheerio.load(html);
  let linkArr = searchTool(".no-underline.d-flex.flex-column.flex-justify-center");
   for(let i = 0; i < linkArr.length; i++){
      let link = searchTool(linkArr[i]).attr("href");
      let topic = link.split("/").pop();
      let fullLink =`https://github.com/${link}`;
    //   console.log(fullLink);
      getRepo.getRepoLink(fullLink,topic);
}
}