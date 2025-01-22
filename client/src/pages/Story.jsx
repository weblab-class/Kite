import React, { useState, useEffect } from 'react';
import { post } from "../utilities";
import MenuBar from "../components/MenuBar";
import ChatBox from "../components/ChatBox";
import './Story.css';

function Story() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const initiateConversation = async () => {
      setIsLoading(true);
      try {
        const response = await post("/api/chat", {
          prompt: "Start the conversation"
        });

        const aiMessage = { role: 'assistant', content: response.response };
        setMessages([aiMessage]);

        const newOptions = await generateOptions(response.response);
        setOptions(newOptions);
      } catch (error) {
        console.error("Chat error:", error);
        setMessages([{ 
          role: 'system', 
          content: 'Sorry, there was an error starting the conversation.' 
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    initiateConversation();
  }, []);

  const handleOptionSelect = async (option) => {
    const userMessage = { role: 'user', content: option };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await post("/api/chat", {
        prompt: option
      });

      const aiMessage = { role: 'assistant', content: response.response };
      setMessages(prev => [...prev, aiMessage]);

      const newOptions = await generateOptions(response.response);
      setOptions(newOptions);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: 'Sorry, there was an error processing your message.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateOptions = async (lastAiMessage) => {
    // Simulate AI generating options based on the last AI message
    // In a real application, this could involve more complex logic or an API call
    return [
      `Option 1 based on: ${lastAiMessage.slice(0, 10)}...`,
      `Option 2 based on: ${lastAiMessage.slice(0, 10)}...`,
      `Option 3 based on: ${lastAiMessage.slice(0, 10)}...`,
      `Option 4 based on: ${lastAiMessage.slice(0, 10)}...`
    ];
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