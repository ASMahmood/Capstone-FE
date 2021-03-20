import React, { useEffect } from "react";
import { drawOnCanvas } from "../functions/whiteboard";
import { connect } from "react-redux";
import { reduxStore } from "../types/reduxInterface";
import "./styles/WhiteBoard.css";

const mapStateToProps = (state: reduxStore) => state;

const { createCanvas, loadImage } = require("canvas");

function WhiteBoard(props: reduxStore) {
  useEffect(() => {
    setTimeout(() => {
      drawOnCanvas(props);
    }, 1000);
  }, []);
  return <canvas id="roomCanvas"></canvas>;
}

export default connect(mapStateToProps)(WhiteBoard);
