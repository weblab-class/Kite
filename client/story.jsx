import React, { useState } from 'react';
import axios from 'axios';

function Story() {
  const [chatHistory, setChatHistory] = useState([]);
  const [options, setOptions] = useState([]);

  const fetchOptions = async () => {
    try {
      const response = await axios.post('/api/generate-options', { chatHistory });
      console.log("Options response:", response.data.options); // Add a log to check the response
      setOptions(response.data.options);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  return (
    <div className="story-container">
      <button onClick={fetchOptions}>Generate Options</button>
      <ul>
        {options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
}

export default Story; 