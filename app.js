const express = require('express')
const ejs = require('ejs')
const path = require('path')
const app = express()
const port = process.env.PORT || 8080
const multer =require('multer')
const { getFips } = require('crypto')
//set storage engine
const storage=multer.diskStorage({destination:'./public/upload/',filename:function(req,file,cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
}});

const upload=multer({storage:storage,limits:{
  fileSize:1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');
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
            res.render('index',{msg:"File Uploaded",file:`upload/${req.file.filename}`})
        }
      });
    });
    

function checkFileType(file,cb){
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}







app.listen(port, () => console.log(`app listening on port ${port}!`)) 
