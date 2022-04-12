//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
var mongoUtil = require( './backend/mongoUtil' );
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
//const port = 3000;
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.enable('trust proxy');




var store = new MongoDBStore(
    {
        uri: mongoUtil.urlMongo,
        databaseName: 'MYRLE',
        collection: 'sessions'
    });
store.on('error', function(error) {
    console.log(error);
  });
app.use(session({
    secret: 'dfghjksdfghjkdfghj',
    cookie: {
    // secure: true, // uncomment for heroku
    // httpOnly: true,
    // sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 7,// 1 week
    },
    store: store,
    // unset: 'destroy',
    saveUninitialized: false,
    resave: false,
    proxy: true,
}));

app.use(express.static('Assets'));
app.use(express.static('Assets/js'));

app.get('/', (req,res) => {
  res.sendFile(__dirname+'/index.html');
});

app.get("/register", (req, res) =>{
  res.sendFile(__dirname+'/register.html');
  //res.send("sss");


});

app.get("/menu",(req,res) =>{

  res.sendFile(__dirname+"/menu-section.html");
});

app.get("/events",(req,res) =>{
  
  res.sendFile(__dirname+"/events.html");
});

app.get("/profile",(req,res) =>{
  
  res.sendFile(__dirname+"/profile.html");
});

app.get("/social-life",(req,res) =>{
  
  res.sendFile(__dirname+"/social-life.html");
});

app.get("/information",(req,res) =>{
  
  res.sendFile(__dirname+"/information.html");
});

app.get("/billing",(req,res) =>{
  
  res.sendFile(__dirname+"/billing.html");
});
app.get("/community",(req,res) =>{
  
  res.sendFile(__dirname+"/community.html");
});
app.get("/admin",(req,res) =>{
  
  res.sendFile(__dirname+"/adminDashboard.html");
});

app.get("/admin-register",(req,res) =>{
  res.sendFile(__dirname+"/adminRegister.html");
});


 var editID ;
app.get("/admin-edit",(req,res) =>{
  editID = req.query.id;
  res.sendFile(__dirname+"/adminEdit.html");
});

app.get("/admin-edit-id",(req,res) =>{
  res.status(200).send({status:200, id: editID});
});



mongoUtil.connectToServer( function( err, client ) {
    var user = require( './backend/controllers/users.js' );

    app.post('/user/add', (req, res)=>{user.register(req,res)});
    app.get('/user/login',(req,res)=>{user.login(req,res)});
    app.put('/user/update',(req,res)=>{user.update(req,res)});
    app.get('/user/logout', (req,res)=>{user.logout(req,res)});
    app.post('/user/club/add', (req, res)=>{user.add_club(req,res)});
    app.get('/user/club/check', (req, res)=>{user.check_club(req,res)});
    app.get('/user/data',(req,res)=>{user.get_data(req,res)});
    app.get('/all/data',(req,res)=>{user.get_all_data(req,res)});
    app.delete('/user/delete',(req,res)=>{user.delete(req,res)});
    app.put('/user/update',(req,res)=>{user.update(req,res)});
    app.get('/admin/data',(req,res)=>{user.get_data_by_ID(req,res)});
    app.put('/admin/update',(req,res)=>{user.updateByID(req,res)});
    
})

let port = process.env.PORT;
if (port == null || port == "") {
  port =3000;
}   

app.listen(port, function() {
  console.log("Server started in port 3000");
});
