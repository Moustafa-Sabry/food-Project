const user= require('../models/user.model')
const Favorite = require('../models/favorite.model');
exports.createUser= async (req, res) => {
    try {
            const   {name,email,password,role}=req.body;
        if(req.body.role!=='user'&&req.body.role!=='admin'){
            return res.status(403).json({ message: 'Invalid role' });

        }
        else {
            const existing= await user.findOne({ email });
            if(existing){
                return res.status(403).json({ message: 'E-mail already exists' });
            }
            else{
                const newuser = await user.create({
                    name,
                    email,
                    password,
                    role,
                });
                return res.status(201).json({ message: 'User created', newuser });
            }
        }
    }catch(e){
        console.error('Error creating user:', e.message);
        return res.status(500).json({ message: 'Server error' });
    }
}
exports.getAllUsers = async (req, res) => {
    try {
        const users = await user.find();

        res.status(200).json(users);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const User = await user.findById(id);

        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }

        // Optional cleanup (VERY GOOD PRACTICE)
        await Favorite.deleteMany({ userId: id });

        await user.findByIdAndDelete(id);

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedUser = await user.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const User = await user.findById(id);

        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(User);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};