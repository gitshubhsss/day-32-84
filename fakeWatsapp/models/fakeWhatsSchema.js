const mongoose=require("mongoose");

const whatsappSchema=new mongoose.Schema({
    from:{
       type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String
    },
    created_at:{
        type:Date,
    }
});

const Chat=mongoose.model("Chat",whatsappSchema);

module.exports=Chat;