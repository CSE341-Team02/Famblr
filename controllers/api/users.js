// Get Current User
exports.getCurrentUser = (req, res, next) => {
    const user = req.session.user;
    return res.json({ user: user });
};

// Get User By ID
exports.getUserById = (req, res, next) => {
    res.json({
        user: null,
    });
};

