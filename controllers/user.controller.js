// controllers/user.controller.js
const User = require('../models/user.model');
const { z } = require('zod');

// Updated schema to allow either email or firstName
const searchQuerySchema = z.object({
    email: z.string().email().optional(),
    firstName: z.string().min(1, "First name cannot be empty").optional(),
}).refine((data) => data.email || data.firstName, {
    message: "Either email or firstName must be provided"
});

exports.searchUser = async (req, res) => {
    try {
        // 1. Validate the incoming query
        const validationResult = searchQuerySchema.safeParse(req.query);

        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error.issues[0].message });
        }

        const { email, firstName } = validationResult.data;

        // 2. Search with $or query
        const foundUser = await User.findOne({
            $or: [
                ...(email ? [{ email }] : []),
                ...(firstName ? [{ firstName }] : [])
            ]
        });

        // 3. Respond
        if (!foundUser) {
            return res.status(404).json({ message: "Phew! Your partner is not on the list." });
        }

        res.status(200).json(foundUser);

    } catch (error) {
        res.status(500).json({ error: "An unexpected server error occurred." });
    }
};
