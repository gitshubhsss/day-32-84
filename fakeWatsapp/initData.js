let allChats = [
    {
      from: "shubham ranjane",
      to: "mansi singh",
      msg: "i love to talk with you in english",
      created_at: new Date(),
    },
    {
      from: "mansi singh",
      to: "shubham ranjane",
      msg: "i too",
      created_at: new Date(),
    },
    {
      from: "omkar daswadkar",
      to: "shubham ranjane",
      msg: "what you have studied today?",
      created_at: new Date(),
    },
    {
      from: "shubham ranjane",
      to: "omkar omkar daswadkar",
      msg: "i have studied mongoose with express",
      created_at: new Date(),
    },
  ];
;
//this is the data that we have 

const mongoose=require("mongoose");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

main().then(()=>{
    console.log("initData connection succesfull");
}).catch((err)=>{
    console.log(err);
});

const Chat=require("./models/fakeWhatsSchema.js");

async function insertToDb(){
    await Chat.insertMany(allChats);
};

insertToDb();