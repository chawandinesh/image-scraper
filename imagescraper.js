const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const port = 3006;
const cherio = require("cheerio");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser());
app.use(cors());

var data = []
app.get("/", (req,res) => {
  res.status(200).json({
    status: "Api is working",
    data: data
  })
})
app.post("/api/data",  async(req, res) => {
  const { url } = req.query;
  if (!url) {
    res.status(400).send("Bad request: 'url' param is missing!");
    return;
  }
  try {
    const html =  await getPageHTML(url);
    const $ = cherio.load(html);
    let arrayData = [];
    $("img").each((index, image) => {
      var img = $(image).attr("src");
      let Links;
      if(img){
        Links = img
      }
      arrayData.push(Links);
    });
    data = arrayData
    res.status(200).send(arrayData);
  } catch (error) {
    res.status(500).send(error);
  }
});
const getPageHTML = async (pageUrl) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(pageUrl);
  const pageHTML = await page.evaluate(
    "new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML"
  );
  await browser.close();
  return pageHTML;
};
app.listen(port, () => console.log(`Image scraper app server is running on  port ${port}!..........`));
