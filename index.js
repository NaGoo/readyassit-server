const express=require('express');
var mysql=require('mysql');
const bodyParser=require('body-parser');
const path=require('path');
const app=express()
const port=4100  

var connection =mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Qwerty@123",
    database: "onlineshop"
});
connection.connect(function(err){
if(err) throw err;
console.log("database connected");

})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
const publicDirectory=path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.set('view engine','hbs');
app.get('/', (req, res) =>
{
   res.render("login")
    });


    app.post('/submit',function(req,res){
        var sql="insert into user values(null,'"+  req.body.customer+"')";
        connection.query(sql,function(err){
            if(err) throw err
            res.render('login',{title:'saved',message:'saved successfully'})
            res.redirect('/webpage')

        })
        connection.end();

    })
    
    
    app.get('/webpage', (req, res) =>
{
   res.render("webpage")
    });
    app.get('/products', (req, res) =>
    {
       res.render("products")
        });
       
app.listen(port, () =>{
    console.log("start")
});

