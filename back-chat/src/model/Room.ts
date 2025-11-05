import mongoose  from "mongoose";

export type roomSchemaType = {
    members: mongoose.Types.ObjectId[]
    name?: string
    createdBy?: mongoose.Types.ObjectId
    createDate : string
}


const roomSchema = new mongoose.Schema({
    name : {
        type : String ,
        require : true,
        unique : true
    },
    // Array de usuarios , todos sus Id's
    members : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User'
    }],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User' 
    },
    createDate: {
        type : String ,
        require :true 
    }
})

const Room = mongoose.model<roomSchemaType>('Room', roomSchema)
export default Room