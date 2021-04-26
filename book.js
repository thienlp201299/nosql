const mongoose = require('mongoose')
const EmployeeSchema = new mongoose.Schema({
    Name : String,
    Image : String,
    Mota : String,
    Status: Boolean,
    Type: [],
    Chuong: [{ stt:Number,body: String, NameSession: String, time : { type : Date, default: Date.now }   }],
    Vote: Number,
    Tacgia:String
},{ timestamps: true })
const userS = new mongoose.Schema({
    Username: String,
    Password : String,
    
    
})
mongoose.model("admin",EmployeeSchema)
mongoose.model("user",userS)