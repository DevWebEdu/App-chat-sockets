import mongoose, { Schema } from "mongoose"

export interface IUser {
    __id: mongoose.Schema.Types.ObjectId
    fullname: string
    username: string
    password: string
    photo: string
    email: string
    status: string
}


const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    photo: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    status : {
        type : String ,
        enum : ["online", "offline"] ,
        default : "offline"
    }
})

const User = mongoose.model<IUser>('User',UserSchema)
export default User;