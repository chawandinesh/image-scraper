import React,{useState} from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

function App() {
  const [text, setText] = useState('')
  const [imageData, setImageData] = useState([])
  const handleSubmit = async() => {
    await axios.post(`http://localhost:3006/api/data?url=${text}`, text).then((res) => {
      // console.log(res.data)
      setImageData(res.data)
    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <div className="App">
      {/* <InputBar/>
      <ImagesList/> */}
      <input type = "text" onChange={(e) => setText(e.target.value)}/>
      <button onClick={handleSubmit}>Submit</button>

      <div style={{margin: "10px"}}>
        {imageData.length && imageData.map((e,idx) => (
          <img src={e} key={idx} alt="no_image_available" style={{padding: "5px"}} height="200px" width="200px"/>
        ))}
      </div>
    </div>
  );
}

export default App;
