

const findCurrentUser = async (req, res) => {
    try {
        const user = await req.user;
        const currentUser = await User.findById(user.user._id);
        currentUser.password = null;
        return res.status(200).send(currentUser);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const findUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        user.password = null;
        return res.status(200).send(currentUser);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const searchUser = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limits = req.query.size || 10;
        const skip = (page - 1) * limits;
        const keyword = req.query.search ? {
            $or: [
                { username: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]
        } : {}
        const user = await User.find(keyword).select("username profile_image").skip(skip).limit(limits);
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}















