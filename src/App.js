import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import InputBar from './components/InputBar'
import Images from './components/Images'

function App() {
  return (
    <div className="container">
      <InputBar/>
      <Images/>
    </div>
  );
}

export default App;
