const express=require("express");
const app=express();

const port=8080;

app.listen(port,()=>{
    console.log("app is listening on the port 8080");
});

const ExpressError=require("./expressError.js");


const checkToken=(req,res,next)=>{
    let {token}=req.query;
    if(token==="data"){
        next();
    }
    throw new ExpressError(404,"ACCESS DENIED !");
}

app.get("/api",checkToken,(req,res)=>{
    let{token}=req.query;
    console.log(token);
    res.send("data");
})

//error handeling middleware



app.get("/err",(req,res)=>{
    abcd=abcd;
});


app.get("/admin",(req,res)=>{
    throw new ExpressError(403,"Access is forbidden");
})


//exress error handeleer middleware 
app.use((err,req,res,next)=>{
    let{status=500,message="Some error occred"}=err;
    res.status(status).send(`${message} status : ${status}`);
})