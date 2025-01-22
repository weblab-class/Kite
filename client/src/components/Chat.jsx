import React, { useState, useEffect } from "react";
import axios from "axios";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "/api/chat",
        { message: inputMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessages([
        ...messages,
        { text: inputMessage, sender: "user" },
        { text: response.data.message, sender: "ai" },
      ]);
      setInputMessage("");
    } catch (error) {
      console.error("Chat error:", error);
      // If unauthorized, redirect to login
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
