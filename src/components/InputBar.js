import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from 'axios'

function InputBar(props) {
  const [text, setText] = useState("");
  const [imageData, setImageData] = useState([])

  const handleSubmit = async() => {
    props.loading(true, "fetching")
    await axios.post(`http://localhost:3006/api/data?url=${text}`, text).then((res) => {
        props.loading(false, "success")
        setImageData(res.data)
        props.getImagesList(res.data)
      }).catch(err => {
        props.loading(false, "failed")
        console.log(err, imageData)
      })
  };
  return (
    <div style={{ padding: "7px", display: "flex", justifyContent: "space-between" }}>
      <h1>Image Scraper</h1>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center",}}>
        <TextField
          id="outlined-basic"
          label="Enter Url"
          variant="outlined"
          onChange={(e) => setText(e.target.value)}
          size="small"
          style={{marginRight: "10px"}}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          size="medium"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default InputBar;
