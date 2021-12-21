 import mongoose from "mongoose"

const {Schema,model}=mongoose


const Todoschema=Schema({
  title:{
    type: String,
    require:true

  },
  description:{
    type:String
  },
  isCompleted:{
    type:Boolean,
    default:false
  },
  date:{
    type:Date,
    default:Date.now
  },

  
})

const Todomodel=model("Todo",Todoschema)

export default Todomodel