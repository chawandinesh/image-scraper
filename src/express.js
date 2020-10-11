const express = require('express')
const app = express()
const port = 3003

const cherio = require('cheerio');
const request = require('request');
const fs = require('fs');


const bodyParser = require('body-parser');  
const cors = require('cors')
app.use(bodyParser())

app.use(cors())

fs.createWriteStream("src/ImagesLink.txt", "UTF-8");

app.post('/api/data', (req,res) => {
    let WriteStream  = fs.createWriteStream("src/ImagesLink.txt", "UTF-8");
    request(req.body.data, (err, resp, html)=>{

        if(!err && resp.statusCode == 200){
            console.log("Request was success ");
            
            // Define Cherio or $ Object 
            const $ = cherio.load(html);
    
            $("img").each((index, image)=>{
    
                var img = $(image).attr('src');
                var Links = img;
                WriteStream.write(Links);
                WriteStream.write("\n");
            });
        
    
        }else{
            console.log("Request Failed ");
        }
    
    });
})

app.listen(port, () => {
  console.log(`scraper app listening at http://localhost:${port}`)
})