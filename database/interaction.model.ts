//  import { model, Schema, Types, models } from "mongoose";

// export interface IModel {
//     user: Types.ObjectId,
//     action: string,
//     actionId: Types.ObjectId,
//     actionType: "question" | "answer";
// }

// const ModelSchema = new Schema<IModel>({
//     user: {type: Schema.Types.ObjectId, ref: "User", required: true},
//     action: {type: String, required: true},
//     actionId: {type: Schema.Types.ObjectId, required: true},
//     actionType: {type: String, enum: ["question" , "answer"], required: true}
// }, {timestamps: true})


// const Model = models?.Model || model<IModel>("Model", ModelSchema)

// export default Model;


import { model, models, Schema, Types, Document } from "mongoose";

export interface IInteraction {
  user: Types.ObjectId;
  action: string;
  actionId: Types.ObjectId;
  actionType: "question" | "answer";
}

export interface IInteractionDoc extends IInteraction, Document {}
const InteractionSchema = new Schema<IInteraction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    actionId: { type: Schema.Types.ObjectId, required: true },
    actionType: { type: String, enum: ["question", "answer"], required: true },
  },
  { timestamps: true }
);

const Interaction =
  models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;