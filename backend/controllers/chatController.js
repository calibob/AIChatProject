import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  const { sender, text } = req.body;
  try {
    const message = new Message({ sender, text });
    await message.save();
    res.status(201).json({ message: "Message envoyé", data: message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
