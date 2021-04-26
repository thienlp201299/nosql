const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const mongoose = require('mongoose');
require("./book")

const book = mongoose.model("admin")

const user = mongoose.model("user")
app.use(bodyParse.json())



const mongoUri = 'mongodb+srv://thang:WbBubyFbAJG8DQcB@cluster0.57hww.mongodb.net/mydb?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on("error", (err) => {
  console.log("error", error)
})

app.post('/delete', (req, res) => {
  book.findByIdAndRemove(req.body.id)
    .then(data => {
      console.log(data)
      res.send(data)
    }).catch(err => {
      console.log("error", err)
    })
})

app.post('/update', (req, res) => {
  book.findByIdAndUpdate(req.body.id, {
    Name: req.body.Name,
    Image: req.body.Image,
    body: req.body.body,
  }).then(data => {
    console.log(data)
    res.send(data)
  }).catch(err => {
    console.log("error", err)
  })
})

app.post('/send-data', (req, res) => {
  const book1 = new book({
    Name: req.body.Name,
    Image: req.body.Image,
    Mota: req.body.Mota,
    Status: req.body.Status,
    Type: req.body.Type,
    Chuong: req.body.Chuong,
    Vote: "0",
    Author: "",

  })
  book1.save()
    .then(data => {
      console.log(data)
      res.send(data)
    }).catch(err => {
      console.log(err)
    })
})

app.post('/createUser', (req, res) => {
  const book2 = new user({
    Taikhoan: req.body.Taikhoan,
    Matkhau: req.body.Matkhau,


  })
  book2.save()
    .then(data => {
      console.log(data)
      res.send(data)
    }).catch(err => {
      console.log(err)
    })
})
app.get('/hot', (req, res) => {
  book.find({}).sort({ $natural: -1 }).limit(5)
    .then(data => {
      console.log(data)
      res.send(data)
    }).catch(err => {
      console.log(err)
    })
})
app.get('/getall', (req, res) => {
 
  book.find({},  { _id:1, Name:1,Image:1, Vote: 1 })
    .then(data => {
      console.log(data)
      res.send(data)
    }).catch(err => {
      console.log(err)
    })
})
app.post('/user', async (req, res) =>{
  console.log(req.body)
   user.find({
    Username:  req.body.Username,Password:req.body.Password}, function(err, user) 
{
   if (user)
   {
    console.log(user);
   }
   console.log(user);
   res.json(user);

});
 
 });
app.get("/detail/:id", (req, res, next) => {
  var id = req.params.id
 
  book.findById(id).then(data => {

    console.log(data)
    res.send(data)
  }).catch(err => {
    console.log(err)
  })

})
page = 1
app.get("/:page", (req, res, next) => {
  const resultsPerPage = 1;
  let page = req.params.page >= 1 ? req.params.page : 1;
  const query = req.query.search;

  page = page - 1
  book.find({})
    .limit(resultsPerPage)
    .skip(resultsPerPage * page)
    .then(data => {
      console.log(data)
      res.send(data)
    }).catch(err => {
      console.log(err)
    })
})


app.listen(3000, () => {
  console.log('sever running')
})
