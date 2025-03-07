import { prisma } from "../prismaClient.js";

const createMessage = async (req, res) => {
  const { content } = req.body;
  const userId = req.userId;

  try {
    const message = await prisma.message.create({
      data: { content, userId },
    });

    res.status(201).json({ message: "Message created", data: message });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating message", message: error.message });
  }
};

const getMessages = async (req, res) => {
  const userId = req.userId;

  try {
    const messages = await prisma.message.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ data: messages });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching messages", message: error.message });
  }
};

const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.userId;

  try {
    const message = await prisma.message.updateMany({
      where: { id, userId },
      data: { content, updatedAt: new Date() },
    });

    if (message.count === 0) {
      return res
        .status(404)
        .json({ error: "Message not found or unauthorized" });
    }

    res.status(200).json({ message: "Message updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating message", message: error.message });
  }
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const message = await prisma.message.deleteMany({
      where: { id, userId },
    });

    if (message.count === 0) {
      return res
        .status(404)
        .json({ error: "Message not found or unauthorized" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting message", message: error.message });
  }
};

export { createMessage, getMessages, updateMessage, deleteMessage };
