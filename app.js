const express = require('express')
const ejs = require('ejs')
const path = require('path')
const app = express()
const port = 801
const multer =require('multer')
//set storage engine
const storage=multer.diskStorage({destination:'./public/upload/',filename:function(req,file,cb){
    cb(null,);
}});
app.set('view engine','ejs')
app.use(express.static('./public'))

app.get('/',(req,res)=>{
    res.render('index')
})














app.listen(port, () => console.log(`app listening on port ${port}!`)) 