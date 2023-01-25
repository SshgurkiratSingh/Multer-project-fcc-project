const express = require('express')
const ejs = require('ejs')
const path = require('path')
const app = express()
const port = 801
const multer =require('multer')
//set storage engine
const storage=multer.diskStorage({destination:'./public/upload/',filename:function(req,file,cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
}});

const upload=multer({storage:storage,limits:{fileSize:1000000}}).single('myImage');
app.set('view engine','ejs')
app.use(express.static('./public'))

app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/upload',(req,res)=>{
    upload(req, res, (err) => {
        if(err){
          res.render('index', {
            msg: err
          });
        } else {
            console.log(req.file)
            res.send('ff')
        }
      });
    });
    

















app.listen(port, () => console.log(`app listening on port ${port}!`)) 