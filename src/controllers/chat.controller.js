

const createChat = async (req, res) => {
    try {
        const { userId } = req.body;
        const reqUser = await req.user;

        if (!userId) {
            return res.status(400).send({ error: "user id require for creating chat" });
        }

        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: reqUser.user._id } } },
                { users: { $elemMatch: { $eq: reqUser.userId } } },
            ]
        }).populate("users", "-password").populate("latestMessage");

        isChat = await UserActivation.populate(isChat, {
            path: "latestMessage.sender",
            select: "name profile_image email"
        })

        if (isChat.length > 0) {
            return res.status(200).send(isChat[0]);
        }
        else {
            var chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [reqUser.user._id, userId]
            }
        }

        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({ _id: createChat._id }).populate("users", "-password");
        return res.status(200).send(fullChat);


    } catch (error) {
        console.log("AQUI: ", error);
        return res.status(400).send(error.message);
    }
}

const getAllChat = async (req, res) => {
    try {
        const reqUser = await req.user;
        const chats = await Chat.find({ users: reqUser.user._id }.populate("users", "-password")
        )
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ timestamps: -1 })

        return res.status(200).send(chats);
    } catch (error) {
        console.log("AQUI: ", error);
        return res.status(400).send(error.message);
    }
}

















