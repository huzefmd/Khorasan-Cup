const express = require("express");
const ExcelJS = require("exceljs");
const Registration = require("../models/Registration");

const router = express.Router();

router.get("/excel", async (req, res) => {
  try {
    const registrations = await Registration.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Registrations");

    worksheet.columns = [
      { header: "Team Name", key: "clubName", width: 25 },
      { header: "City", key: "city", width: 20 },
      { header: "Manager", key: "managerName", width: 25 },
      { header: "Phone", key: "contactNumber", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Squad Size", key: "squadSize", width: 15 },
      { header: "Payment Option", key: "paymentOption", width: 20 },
      { header: "Venue Preference", key: "venuePreference", width: 25 },
      { header: "Additional Info", key: "additionalInfo", width: 40 },
      { header: "Payment Method", key: "paymentMethod", width: 20 },
      { header: "Status", key: "registrationStatus", width: 15 },
      { header: "Created At", key: "createdAt", width: 25 },
    ];

    registrations.forEach((registration) => {
      worksheet.addRow({
        clubName: registration.clubName,
        city: registration.city,
        managerName: registration.managerName,
        contactNumber: registration.contactNumber,
        email: registration.email,
        squadSize: registration.squadSize,
        paymentOption: registration.paymentOption,
        venuePreference: registration.venuePreference,
        additionalInfo: registration.additionalInfo,
        paymentMethod: registration.paymentMethod,
        registrationStatus: registration.registrationStatus,
        createdAt: registration.createdAt,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=registrations.xlsx",
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
