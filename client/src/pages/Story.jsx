import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { post, get } from "../utilities";
import MenuBar from "../components/MenuBar";
import ChatBox from "../components/ChatBox";
import "./story.css";

function Story() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState(location.state?.chatHistory || []);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const initiateConversation = async () => {
      setIsLoading(true);
      try {
        // First, fetch the character data
        const characterData = await get("/api/current-character");
        if (!characterData) {
          console.error("No character selected");
          navigate("/characters");
          return;
        }

        setCharacter(characterData);

        // Handle both new conversations and existing chat history
        if (messages.length === 0) {
          console.log("Initiating new conversation");
          const response = await post("/api/chat", {
            prompt: "Start a new detective story in the foggy city",
            messageHistory: [],
            character: characterData,
          });

          const aiMessage = { role: "assistant", content: response.response };
          setMessages([aiMessage]);
          setOptions(response.options);
        } else {
          // For existing chat history, get new options
          console.log("Continuing existing conversation");
          const formattedHistory = messages.map((msg) => ({
            role: msg.role === "AI" ? "assistant" : msg.role || "user",
            content: msg.content,
          }));

          const response = await post("/api/chat", {
            prompt: "Continue the story based on the previous conversation",
            messageHistory: formattedHistory,
            character: characterData,
          });

          setOptions(response.options);
        }
      } catch (error) {
        console.error("Chat error details:", error);
        if (error.response?.status === 404) {
          navigate("/characters");
          return;
        }
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
  }, [navigate]);

  const handleOptionSelect = async (option) => {
    const userMessage = { role: "user", content: option };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const formattedHistory = [...messages, userMessage].map((msg) => ({
        role: msg.role === "AI" ? "assistant" : msg.role || "user",
        content: msg.content,
      }));

      const response = await post("/api/chat", {
        prompt: option,
        messageHistory: formattedHistory,
        character: character,
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
