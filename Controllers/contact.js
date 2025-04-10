import {Contact} from "../Models/Contact.js"; // Fix import
import { isAuthenticated } from "../Middlewares/Auth.js";
import mongoose from "mongoose";



// Create a new contact
export const newContact = async (req, res) => {
    try {
        const { name, email, phone, type } = req.body;

        // Fix validation check
        if (!name || !email || !phone || !type) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const contact = await Contact.create({ name, email, phone, type, user: req.user._id });

        res.status(201).json({ message: "Contact created successfully", contact });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// get all contacts

export const getAllContacts = async (req, res) => {
    const userContact = await Contact.find();

    if(!userContact) {
        return res.status(404).json({ message: "No contacts found" });
    }
    res.status(200).json({ contacts: userContact });
};

// get single contact
export const getSingleContact = async (req, res) => {
    const id = req.params.id;
    const userContact = await Contact.findById(id);
    if(!userContact) {
        return res.status(404).json({ message: "No contact found" });
    }
    res.status(200).json({ contact: userContact });
};

// update contact by id

export const updateContactById = async (req, res) => {
    const id = req.params.id;
    const { name, email, phone, type } = req.body;

    // Fix validation check
    if (!name || !email || !phone || !type) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const userContact = await Contact.findByIdAndUpdate(id, { name, email, phone, type }, { new: true });

    if(!userContact) {
        return res.status(404).json({ message: "No contact found" });
    }
    res.status(200).json({ message: "Contact updated successfully", contact: userContact });
};

// delete contact by id
export const deleteContactById = async (req, res) => {
    const id = req.params.id;
    const userContact = await Contact.findByIdAndDelete(id);

    if(!userContact) {
        return res.status(404).json({ message: "No contact found" });
    }
    res.status(200).json({ message: "Contact deleted successfully", contact: userContact });
};
