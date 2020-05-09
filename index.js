const express =require ('express');
const app=express()
const port=3000;

app.get('/',(req,res) =>
{
    res.send('<h1>iam creating nodejs express application<h1>');
})



app.listen(port, () =>
{
    console.log("server started at 3000")
});