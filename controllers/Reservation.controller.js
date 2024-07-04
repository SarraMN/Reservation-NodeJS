import Reservation from "../models/Reservation.js";
import SalleReunion from "../models/SalleReunion.js";
import User from "../models/User.js";
import mongoose from "mongoose";


/*var ObjectID = require('mongoose').Types.ObjectId;*/
export const addReservation = async (req, res) => {
    try {
        // Check if the salleId exists in the SalleReunion collection
        const { numSalleId } = req.body;
        const salle = await SalleReunion.findOne(new mongoose.Types.ObjectId( numSalleId ));
        if (!salle) {
            return res.status(404).json({ message: 'SalleReunion with the specified numSalleId does not exist' });
        }
  
        const user = await User.findOne(new mongoose.Types.ObjectId( req.body.userId ));
        if(!user)
        {
            return res.status(404).json({ message: 'user does not exist' });
        }
        const { dateFinReservation, dateDebutReservation } = req.body;

        // Check for conflicting reservations
        const conflictingReservation = await Reservation.findOne({
            numSalleId,
            $or: [
                { dateDebutReservation: { $lt: dateFinReservation, $gte: dateDebutReservation } },
                { dateFinReservation: { $gt: dateDebutReservation, $lte: dateFinReservation } },
                { dateDebutReservation: { $lte: dateDebutReservation }, dateFinReservation: { $gte: dateFinReservation } }
            ]
        });

        if (conflictingReservation) {
            return res.status(409).json({ message: 'There is a conflicting reservation for the specified time slot' });
        }
        

        // Create the reservation if salleId exists
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ message: 'Duplicate entry error' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

export const getReservations = async (req, res) => {
    try {
        const reservation = await Reservation.find();
        res.json(reservation);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}

export const getReservationById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Reservation.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const updateReservation = async (req, res) => {
    try {
        const postId = req.params.id;
        const { name, userId, numSalleId, dateDebutReservation, dateFinReservation } = req.body;
        const updatedReservation = await Reservation.findByIdAndUpdate(
            postId,
            { name, userId, numSalleId, dateDebutReservation, dateFinReservation },
            { new: true }
        );
        if (!updatedReservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.json(updatedReservation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteReservation = async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedReservation = await Reservation.findByIdAndDelete(postId);
        if (!deletedReservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.json({ message: 'Reservation deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};