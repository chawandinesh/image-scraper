import React, { useState } from "react";
import "./App.css";
import Container from "@material-ui/core/Container";
import InputBar from "./components/InputBar";
import ImagesList from "./components/ImagesList";
import CircularProgress from "@material-ui/core/CircularProgress";
import failedLogo from "./assets/images/errorred.png";

function App() {
  const [imageData, setImageData] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState({
    boolean: false,
    status: "",
  });
  const getImagesList = (images) => {
    setImageData(images);
  };
  const getLoadingStatus = (boolean, status) => {
    setLoadingStatus({ ...loadingStatus, boolean: boolean, status: status });
  };
  return (
    <Container
      maxWidth="lg"
      style={{ background: "#eef", minHeight: "100vh", height: "auto" }}
    >
      <InputBar getImagesList={getImagesList} loading={getLoadingStatus} />
      {loadingStatus.boolean === true ? (
        <div
          style={{
            display: "flex",
            marginTop: "100px",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <h2 style={{ marginLeft: "5px" }}>Loading...</h2>
        </div>
      ) : loadingStatus.status === "success" ? (
        <ImagesList imageData={imageData} />
      ) : loadingStatus.status === "failed" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "100px",
            flexDirection: "column-reverse",
          }}
        >
          <h2>Failed</h2>
          <img src={failedLogo} height="100px" alt="failed_logo" />
        </div>
      ) : (
        <div />
      )}
    </Container>
  );
}

export default App;
