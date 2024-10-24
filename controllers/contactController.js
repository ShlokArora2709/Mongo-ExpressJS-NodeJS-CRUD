import expressAsyncHandler from "express-async-handler";
import contactModel from "../models/contactModel.js";

// Get all contacts for the authenticated user.
const getContact = expressAsyncHandler(async (req, res) => {
    const contact = await contactModel.find({ user_id: req.user.id });
    res.status(200).json(contact);
});

// Create a new contact for the authenticated user.
const postContact = expressAsyncHandler(async (req, res, next) => {
    console.log(req.body);
    const { name, email, phone } = req.body;

    // Validate required fields.
    if (!name || !email || !phone) {
        const err = new Error("Name, email, and phone are required fields.");
        res.status(400);
        return next(err);
    }

    const contact = await contactModel.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    res.status(201).json({ contact });
});

// Get a specific contact by ID if it belongs to the authenticated user.
const getSpecific = expressAsyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);

    // Contact not found.
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found.");
    }

    // Ensure contact belongs to the requesting user.
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Access denied. This contact does not belong to you.");
    }

    res.status(200).json(contact);
});

// Update a contact if it belongs to the authenticated user.
const updateContact = expressAsyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);

    // Contact not found.
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found.");
    }

    // Ensure contact belongs to the requesting user.
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Access denied. This contact does not belong to you.");
    }

    const updatedData = await contactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedData);
});

// Delete a contact if it belongs to the authenticated user.
const deleteContact = expressAsyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);

    // Contact not found.
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found.");
    }

    // Ensure contact belongs to the requesting user.
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Access denied. This contact does not belong to you.");
    }

    await contactModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Contact deleted successfully." });
});

export default { getContact, postContact, updateContact, getSpecific, deleteContact };
