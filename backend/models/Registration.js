const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    clubName: String,
    city: String,
    managerName: String,
    contactNumber: String,
    email: String,
    squadSize: Number,
    paymentOption: String,
    venuePreference: String,
    additionalInfo: String,
    paymentMethod: String,

    registrationStatus: {
        type: String,
        required: true,
        default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Registration", registrationSchema);
