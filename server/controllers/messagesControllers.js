const Messages = require("../model/messageModel");
const bcrypt = require("bcrypt");

module.exports.addMessage = async (req, res, next) => {
    // console.log(req.body);
    try {
        const {from , to, message} = req.body;
        const data = await Messages.create({
            message:{text:message},
            users: [from, to],
            sender: from,
        });
        if(data)
            return res.json({meg: "Message added successfully."});
        return res.json({msg : "Failed to add Message."});
    } catch (err) {
        next(err);
    }
};

module.exports.getAllMessage = async (req, res, next) => {
    // console.log(req.body);
    try {
        const {from , to} = req.body;
        const messages = await Messages.find({
            users:{
                $all: [from, to],
            },
        }).sort({updatedAt : 1});
        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf : msg.sender.toString() === from,
                message : msg.message.text,
            };
        });
        return res.json(projectedMessages);
    } catch (err) {
        next(err);
    }
};