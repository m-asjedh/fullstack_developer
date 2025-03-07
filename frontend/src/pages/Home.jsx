import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { FaPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "../../components/Modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messages = [
    {
      id: 1,
      content: "Welcome to StyleBay! We're excited to have you here.",
      createdAt: new Date("2023-11-15T09:30:00"),
    },
    {
      id: 2,
      content: "Don't forget to check out our new summer collection!",
      createdAt: new Date("2023-11-16T14:45:00"),
    },
  ];

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleEdit = (id) => {
    console.log(`Edit message with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete message with id: ${id}`);
  };

  const handleAddMessage = () => {
    console.log("Add new message");
  };

  return (
    <div>
      <Navbar />

      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          <button
            onClick={handleAddMessage}
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
                        onClick={() => handleEdit(message.id)}
                        className="h-8 w-8 text-blue-500"
                      >
                        <FaRegEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(message.id)}
                        className="h-8 w-8 text-red-500 "
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
        onSubmit={handleAddMessage}
      />
    </div>
  );
}
