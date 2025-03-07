import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { FaPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "../../components/Modal";
import axios from "axios";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);

  const getAuthToken = () => localStorage.getItem("authToken");

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/messages", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      if (Array.isArray(response.data.data)) {
        setMessages(response.data.data);
      } else {
        console.error("Expected an array but received:", response.data);
        setMessages([]);
      }
    } catch (error) {
      console.error("Fetch messages error:", error);
      setMessages([]);
    }
  };

  const handleAddMessage = async (messageContent) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/messages",
        { content: messageContent },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      console.log("Message added:", response.data);
      fetchMessages();
    } catch (error) {
      console.error("Add message error:", error);
    }
  };

  const handleEdit = (message) => {
    setEditingMessage(message);
    setIsModalOpen(true);
  };

  const handleUpdateMessage = async (id, updatedMessage) => {
    try {
      await axios.put(
        `http://localhost:5000/api/messages/${id}`,
        { content: updatedMessage },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      console.log(`Message updated with id: ${id}`);
      fetchMessages();
    } catch (error) {
      console.error("Edit message error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      console.log(`Message deleted with id: ${id}`);
      fetchMessages();
    } catch (error) {
      console.error("Delete message error:", error);
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
            <button
              onClick={() => {
                setEditingMessage(null);
                setIsModalOpen(true);
              }}
              className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg flex items-center gap-2"
            >
              <FaPlus className="h-4 w-4" />
              Add Message
            </button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="w-[20%] text-left p-2 border-r">Created At</th>
                  <th className="w-[60%] text-left p-2 border-r">Content</th>
                  <th className="w-[10%] text-center p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id} className="border-t">
                    <td className="p-2">{formatDate(message.createdAt)}</td>
                    <td className="font-medium p-2">{message.content}</td>
                    <td className="text-right p-2">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(message)}
                          className="h-8 w-8 text-blue-500"
                        >
                          <FaRegEdit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(message.id)}
                          className="h-8 w-8 text-red-500"
                        >
                          <RiDeleteBin6Line className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={editingMessage ? editingMessage.content : ""}
          onSubmit={(updatedContent) => {
            if (editingMessage) {
              handleUpdateMessage(editingMessage.id, updatedContent);
            } else {
              handleAddMessage(updatedContent);
            }
            setIsModalOpen(false);
          }}
        />
      </div>
    </>
  );
}
