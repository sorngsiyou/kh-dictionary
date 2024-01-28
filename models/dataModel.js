const mongoose = require('mongoose')
const schema = mongoose.Schema
let dataSchema = new schema({
    userId:{
        type:String,
        require:true
    },
    khmerText:{
        type:String,
        require:true
    },
    englishText:{
        type:String,
        require:true
    },
    imageLink: {
        type: String,
        required: false
    },
    description:{
        type:String,
    },

},{timestamps:true})
module.exports=mongoose.model('tbldata',dataSchema)