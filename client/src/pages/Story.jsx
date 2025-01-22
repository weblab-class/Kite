import React, { useState, useEffect } from 'react';
import { post } from "../utilities";
import MenuBar from "../components/MenuBar";
import './Story.css';

function Story() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // AI initiates the conversation
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

  const generateOptions = async (response) => {
    // Simulate AI generating options
    return [
      "Option 1 based on response",
      "Option 2 based on response",
      "Option 3 based on response",
      "Option 4 based on response"
    ];
  };

  return (
    <div className="v74_28">
      <MenuBar isOpen={isMenuOpen} toggleMenu={setIsMenuOpen} />
      
      <div className="chatbox">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.role}`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="message system">
              <div className="loading-dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}
        </div>
        <div className="options-container">
          {options.map((option, index) => (
            <button 
              key={index} 
              className="option-button"
              onClick={() => handleOptionSelect(option)}
              disabled={isLoading}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Story; 