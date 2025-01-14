import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Story.css';

function Story() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    switch(path) {
      case 'save':
        // Add save functionality
        console.log('Save game');
        break;
      case 'load':
        // Add load functionality
        console.log('Load game');
        break;
      case 'rules':
        navigate('/rules');
        break;
      case 'chars':
        navigate('/characters');
        break;
      default:
        break;
    }
  };

  return (
    <div className="v74_28">
      <div className="v73_55">
        <span 
          className="v73_52" 
          onClick={() => handleNavigation('save')}
          role="button"
          tabIndex={0}
        >
          {`> Save`}
        </span>
        <span 
          className="v73_53" 
          onClick={() => handleNavigation('load')}
          role="button"
          tabIndex={0}
        >
          {`> Load`}
        </span>
        <span 
          className="v73_51" 
          onClick={() => handleNavigation('rules')}
          role="button"
          tabIndex={0}
        >
          {`> Rules`}
        </span>
        <span 
          className="v73_54" 
          onClick={() => handleNavigation('chars')}
          role="button"
          tabIndex={0}
        >
          {`> Chars`}
        </span>
      </div>
      <div className="v74_50" />
    </div>
  );
}

export default Story; 