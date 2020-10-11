import React, { useState } from "react";
import axios from "axios";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";

function InputBar() {
  const [textValue, setTextValue] = useState("");

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3003/api/data", { data: textValue })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log("err", err));
  };
  return (
    <div style={{ width: "100%", height: "100px" }}>
      <Navbar className="bg-light justify-content-between">
        <h4>Image Scraper</h4>
        <Form inline onSubmit={handleTextSubmit}>
          <FormControl
            type="text"
            placeholder="Enter Url"
            className=" mr-sm-2"
            onChange={(e) => setTextValue(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Navbar>
    </div>
  );
}

export default InputBar;
