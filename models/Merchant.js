import mongoose from "mongoose";

const MerchantSchema = new mongoose.Schema(
    {
        businessName:          { type: String, required: true },
        businessType:          { type: String, required: true },
        ownerName:             { type: String, required: true },
        ownerContactNumber:    { type: String, required: true },
        businessEmail:         { type: String, required: true, unique: true },
        businessContactNumber: { type: String, required: true, unique: true },
        businessAddress:       { type: String, required: true },
        businessRegNumber:     { type: String, required: true, unique: true },
        businessTaxId:         { type: String, required: true, unique: true },
        numberOfEmployees:     { type: String, required: true},
        salesVolume:           { type: String, required: true },
        password:              { type: String, required: true },
        createdBy:             { type: String, required: true}
    },
    {timestamps: true}
)

const Merchant = mongoose.model("Merchant", MerchantSchema);
export default Merchant;