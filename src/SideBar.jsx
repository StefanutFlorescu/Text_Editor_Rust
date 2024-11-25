// src/components/Sidebar.js
import React, { useState } from 'react';
import './Sidebar.css'; 


const Sidebar = ({ loadFunction, saveFunction }) =>{
  const [isOpen, setIsOpen] = useState(true);
  const [fileContent, setFileContent] = useState('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#Load" onClick={loadFunction}>Load</a></li>
          <li><a href="#Save" onClick={saveFunction}>Save</a></li>
          <li><a href="#New">New</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
