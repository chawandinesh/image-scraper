import React, { useEffect, useState } from "react";
import images from "./ImagesLink.txt";
import axios from 'axios'
import "./App.css";

function App() {
  const [imagesFile, setImagesFile] = useState("");
  const [textValue, setTextValue] = useState("");
  const [submittedText, setSubmittedText] = useState("");

  const handleTextSubmit = (e) => {
     
     axios.post("http://localhost:3003/api/data",{"data": e}).then(res => {return res.data}).then(data => console.log(data)).catch(err => console.log("err", err))
     setSubmittedText(e);

  };

  const readTextFile = (file) => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          setImagesFile(allText.split("\n"));
        }
      }
    };
    rawFile.send(null);
  };

  useEffect(() => {
    readTextFile(images);
  }, []);

  return (
    <div className="App">
      <p className="textValue">{submittedText}</p>

      <div style={{ width: "100%", height: "100px" }}>
        <input type="text" onChange={(e) => setTextValue(e.target.value)} />
        <button type="button" onClick={() => handleTextSubmit(textValue)}>
          submit
        </button>
      </div>
      <div>
        {imagesFile.length &&
          imagesFile.map((e) => {
            return <img src={e} alt="no image" />;
          })}
      </div>
    </div>
  );
}

export default App;
