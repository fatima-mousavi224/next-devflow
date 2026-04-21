 import { model, Schema, Types, models } from "mongoose";

export interface IModel {
    user: Types.ObjectId,
    action: string,
    actionId: Types.ObjectId,
    actionType: "question" | "answer";
}

const ModelSchema = new Schema<IModel>({
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    action: {type: String, required: true},
    actionId: {type: Schema.Types.ObjectId, required: true},
    actionType: {type: String, enum: ["question" , "answer"], required: true}
}, {timestamps: true})


const Model = models?.Model || model<IModel>("Model", ModelSchema)

export default Model;