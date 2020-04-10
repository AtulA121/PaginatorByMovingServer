let express=require("express");
let mongoose=require("mongoose");
let bodyParser=require("body-parser");
let cors=require("cors");
let person=require("./user");
let app=express();

app.use(cors());
app.use(bodyParser.json());

app.use("/getData",(req,res,next)=>{
    console.log("/getData request : ",req.body);
    let limit=2;

    // let personIs=new person({
    //     name : "a121",
    //     age : "21"
    // });
    // personIs.save((err,data)=>{
    //     console.log(err,data);
    // });

    let query={};
    if(req.body.createdAt !== null){
        query={ createdAt: { $gt: req.body.createdAt }};
    }

    if(req.body.onLoad !==undefined){
        limit=limit*2;
    }

    person.find(query).limit(limit).exec((err,data)=>{
        res.send({
            result : err,
            data : data
        });
    });
});

mongoose.connect("mongodb://localhost/user",(err,data)=>{
    if(err){
        console.log("not connected : ");
    }else{
        console.log("connected to database :");
    }
});

app.listen(3000,()=>{
    console.log("Server listen on 3000...");
});