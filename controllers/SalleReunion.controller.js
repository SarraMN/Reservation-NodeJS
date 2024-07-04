import SalleReunion from "../models/SalleReunion.js";

export const addSalleReunion = async (req, res) => {
    try {
        const salleReunion = await SalleReunion.create(req.body);
        res.status(201).json(salleReunion);
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

export const getSalleReunions = async (req, res) => {
    try {
        const salleReunion = await SalleReunion.find();
        res.json(salleReunion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getSalleReunionById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await SalleReunion.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Salle reunion not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const updateSalleReunion = async (req, res) => {
    try {
        const postId = req.params.id;
        const { numSalle, name, capacity, isAvailable } = req.body;
        const updatedSalleReunion = await SalleReunion.findByIdAndUpdate(
            postId,
            { numSalle, name, capacity, isAvailable },
            { new: true }
        );
        if (!updatedSalleReunion) {
            return res.status(404).json({ error: 'SalleReunion not found' });
        }
        res.json(updatedSalleReunion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteSalleReunion = async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedSalleReunion = await SalleReunion.findByIdAndDelete(postId);
        if (!deletedSalleReunion) {
            return res.status(404).json({ error: 'SalleReunion not found' });
        }
        res.json({ message: 'SalleReunion deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};