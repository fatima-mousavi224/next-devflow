 import { model, Schema, Types, models } from "mongoose";

export interface ICollection {
    author: Types.ObjectId,
    question: Types.ObjectId
}

const CollectionSchema = new Schema<ICollection>({
    author: {type: Schema.Types.ObjectId, ref: "user", require: true},
    question: {type: Schema.Types.ObjectId, ref: "question", required: true}
}, {timestamps: true})


const Collection = models?.Collection || model<ICollection>("Collection", CollectionSchema)

export default Collection;