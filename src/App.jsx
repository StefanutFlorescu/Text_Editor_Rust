import { useState } from "react";
import React from 'react'
import Sidebar from "./SideBar";
import TextInput from "./TextInput";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [fileContent, setFileContent] = useState(''); 
  const [filePath, setFilePath] = useState('');

  let filePath2 = '';

  const loadFunction = async () => {
    try {
      const response = await invoke('open');
      console.log(response);
      filePath2 = response;
      setFilePath(response);
      const response2 = await invoke('load', { path: response } );
      console.log(response2);
      setFileContent(response2); 
    } catch (error) {
      console.error('Error calling Rust function:', error);
    }
  };

  const saveFunction = async () => {
    try {
      console.log(filePath);
      const response = await invoke('save_to_file', {input : fileContent, filePath : filePath});
      console.log(response);
    } catch (error) {
      console.error('Error calling Rust functiosn:', error);
    }
  };

  return (
    <main className="container">
      <Sidebar loadFunction={loadFunction} saveFunction ={saveFunction} />
      <div className="main-content">
        <TextInput fileContent={fileContent} setFileContent = {setFileContent} />
      </div>
    </main>
  );
}

export default App;
