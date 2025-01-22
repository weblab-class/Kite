import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { post } from "../utilities";
import MenuBar from "../components/MenuBar";
import ChatBox from "../components/ChatBox";
import "./story.css";

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

        // Format the message history for OpenAI API
        const formattedHistory = messages.map((msg) => ({
          role: msg.role === "AI" ? "assistant" : msg.role || "user",
          content: msg.content,
        }));

        const response = await post("/api/chat", {
          prompt:
            formattedHistory.length > 0
              ? "Continue the story based on the previous conversation"
              : "Start a new detective story in the foggy city",
          messageHistory: formattedHistory,
        });

        console.log("Received response:", response);

        const aiMessage = { role: "assistant", content: response.response };
        setMessages((prev) => [...prev, aiMessage]);
        setOptions(response.options);
      } catch (error) {
        console.error("Chat error details:", error);
        console.error("Error response:", error.response);
        setMessages((prev) => [
          ...prev,
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
      // Format the message history properly
      const formattedHistory = [...messages, userMessage].map((msg) => ({
        role: msg.role === "AI" ? "assistant" : msg.role || "user",
        content: msg.content,
      }));

      const response = await post("/api/chat", {
        prompt: option,
        messageHistory: formattedHistory,
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
