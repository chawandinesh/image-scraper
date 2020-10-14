import React from "react";

function ImagesList(props) {
  return (
    <div style={{ margin: "10px" }}>
      {props.imageData.length ?
        props.imageData.map((e, idx) => (
          <img
            src={e}
            key={idx}
            alt="no_image_available"
            style={{ padding: "5px" }}
            height="200px"
            width="200px"
          />
        )): <div/>
    }
    </div>
  );
}

export default ImagesList;
