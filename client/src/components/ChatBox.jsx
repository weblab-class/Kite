import React, { useState } from 'react';
import './ChatBox.css';

function ChatBox({ messages, options, isLoading, handleOptionSelect }) {
  const [expandedOption, setExpandedOption] = useState(null);

  const handleExpandOption = (option) => {
    setExpandedOption(option);
  };

  const handleReturn = () => {
    setExpandedOption(null);
  };

  const handleSelectOption = () => {
    if (expandedOption) {
      handleOptionSelect(expandedOption);
      setExpandedOption(null);
    }
  };

  // Filter out both system prompts
  const displayMessages = messages.filter(message => 
    message.content !== "Continue the story based on the previous conversation" &&
    message.content !== "Start a new detective story in the foggy city"
  );

  return (
    <div className="chatbox">
      <div className="chat-messages">
        {displayMessages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.role} ${index < displayMessages.length - 2 ? 'history' : ''}`}
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
      {expandedOption ? (
        <div className="expanded-option">
          <div className="expanded-content">
            {expandedOption}
          </div>
          <button className="select-button" onClick={handleSelectOption}>
            Select
          </button>
          <button className="return-button" onClick={handleReturn}>
            Return
          </button>
        </div>
      ) : (
        <div className="options-container">
          {options.map((option, index) => (
            <button 
              key={index} 
              className="option-button"
              onClick={() => handleExpandOption(option)}
              disabled={isLoading}
            >
              {`Option ${index + 1}: ${option.split(' ').slice(0, 10).join(' ')}...`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatBox; 