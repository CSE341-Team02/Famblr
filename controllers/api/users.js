const User = require("../../models/user");
const Image = require("../../models/image");

// Get Current User
exports.getCurrentUser = (req, res, next) => {
    const user = req.session.user;
    return res.json({ user: user });
};

// Get User By ID
exports.getUserById = async (req, res, next) => {
    try {
        // Get URL Parameter
        const userId = req.params.userId;

        // Load User
        let user = await User.findById(userId);

        // Throw 404 if post not found
        if (!user) {
            let error = new Error("User Not Found");
            error.statusCode = 404;
            throw error;
        }

        // Return User Object
        return res.json({ user });

    } catch (error) {
        return res.status(error.statusCode || 400).json({ error: error.message });
    }
};

// Edit User
exports.editUserById = async (req, res, next) => {
    try {
        // Get URL Parameter
        const userId = req.params.userId;

        // Load User
        let user = await User.findById(userId);

        // Throw 404 if post not found
        if (!user) {
            let error = new Error("User Not Found");
            error.statusCode = 404;
            throw error;
        }

        // Save file if one provided
        if (req.file) {
            const image = new Image({ ...req.file });
            await image.save();
            user.profilePicture = image;
        }

        // Set new values, or defaul to existing values
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;

        // Check for existing email
        if (req.body.email && req.body.email != user.email) {
            let sameEmail = await User.findOne({ email: req.body.email });
            if (!sameEmail) {
                user.email = req.body.email;
            } else {
                throw new Error("Email Already In Use");
            }
        }

        // Check for existing username
        if (req.body.username && req.body.username != user.username) {
            let sameUsername = await User.findOne({ username: req.body.username });
            if (sameUsername) {
                user.email = req.body.email;
            } else {
                throw new Error("Email Already In Use");
            }
        }

        // Save Changes to the Database
        await user.save();

        // Only Return Image ID
        if (req.file) user.profilePicture = user.profilePicture._id;

        // Return Updated User Object
        return res.json({ user });

    } catch (error) {
        return res.status(error.statusCode || 400).json({ error: error.message });
    }
};
