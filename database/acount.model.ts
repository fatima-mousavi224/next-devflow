import { model, Schema, Types, models } from "mongoose";

export interface IAccount {
    userId: Types.ObjectId;
    name: string,
    image?: string,
    password?: string,
    provider: string,
    providerAcountId: string
}

const AccountSchema = new Schema<IAccount>({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    name: {type: String, required: true},
    image: {type: String},
    password: {type: String},
    provider: {type: String, required: true},
    providerAcountId: {type: String, required: true}
}, {timestamps: true})


const Account = models?.Account || model<IAccount>("Acount", AccountSchema)

export default Account;