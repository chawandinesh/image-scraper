import React, { useState, useEffect } from "react";
import images from '../ImagesLink.txt'

function Images(props) {
  const [imagesFile, setImagesFile] = useState("");

  const readTextFile = (file) => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
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
    <div className="m-2">
      {imagesFile.length &&
        imagesFile.filter(e => e !== '').map((e) => {
          return <img src={e} alt={"no_image"} height="150px" width="150px" className="p-1" />;
        })}
    </div>
  );
}

export default Images;
