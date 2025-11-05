import mongoose from "mongoose";

export type messageShemaType = {
    room: mongoose.Types.ObjectId
    sender: mongoose.Types.ObjectId
    content: string
    createdTime :string
}


const messageSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true }, // texto del mensaje
    createdTime: { type: String, required: true }, // hora del mensaje
})

const Message = mongoose.model<messageShemaType>('Message', messageSchema)
export default Message