import express from "express";
import cors from "cors";

const app=express();
app.use(cors());

app.get("/getData",(req,res)=>{
    res.send("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend fringilla pulvinar. Phasellus egestas finibus arcu, volutpat vehicula elit porta eu. Praesent commodo dui in sapien imperdiet malesuada. Donec tincidunt diam eu nunc lacinia, quis pharetra ipsum ultrices. Aliquam non augue ac lectus pretium vestibulum. Integer non finibus diam. In mattis nibh eu ante tristique euismod. Etiam eget ornare nisi, vitae posuere justo.");
});
app.listen(5000,()=>console.log("app is running..."));
