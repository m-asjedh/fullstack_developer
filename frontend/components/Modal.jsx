import React, { useState, useEffect } from "react";

export default function Modal({ isOpen, onClose, onSubmit, initialData }) {
  const [messageContent, setMessageContent] = useState(initialData || "");

  useEffect(() => {
    if (isOpen) {
      setMessageContent(initialData || "");
    }
  }, [isOpen, initialData]);

  return isOpen ? (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full sm:w-[425px] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {initialData ? "Edit Message" : "Add New Message"}
          </h3>
          <p className="text-gray-600">
            {initialData
              ? "Make changes to your message here."
              : "Enter a new message here."}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Submitting message:", messageContent);
            onSubmit(messageContent);
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="message" className="text-right text-gray-700">
                Message
              </label>
              <input
                id="message"
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="col-span-3 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
            >
              {initialData ? "Save Changes" : "Add Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
