import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { post } from "../utilities";
import MenuBar from "../components/MenuBar";
import ChatBox from "../components/ChatBox";
import "./Story.css";

function Story() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState(location.state?.chatHistory || []);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const initiateConversation = async () => {
      setIsLoading(true);
      try {
        console.log("Initiating conversation with messages:", messages);

        const response = await post("/api/chat", {
          prompt:
            messages.length > 0
              ? "Continue the story"
              : "Start the conversation",
          messageHistory: messages.map((msg) => ({
            role: msg.role || msg.sender,
            content: msg.content,
          })),
        });

        console.log("Received response:", response);

        const aiMessage = { role: "assistant", content: response.response };
        setMessages((prev) => [...prev, aiMessage]);
        setOptions(response.options);
      } catch (error) {
        console.error("Chat error details:", error);
        console.error("Error response:", error.response);
        setMessages([
          {
            role: "system",
            content: `Error: ${error.message || "Unknown error occurred"}`,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    initiateConversation();
  }, []); // Only run once on component mount

  const handleOptionSelect = async (option) => {
    const userMessage = { role: "user", content: option };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await post("/api/chat", {
        prompt: option,
        messageHistory: messages,
      });

      const aiMessage = { role: "assistant", content: response.response };
      setMessages((prev) => [...prev, aiMessage]);
      setOptions(response.options);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Sorry, there was an error processing your message.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="v74_28">
      <MenuBar isOpen={isMenuOpen} toggleMenu={setIsMenuOpen} />
      <ChatBox
        messages={messages}
        options={options}
        isLoading={isLoading}
        handleOptionSelect={handleOptionSelect}
      />
    </div>
  );
}

export default Story;
