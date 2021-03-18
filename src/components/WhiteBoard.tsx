import React, { useEffect } from "react";
import { drawOnCanvas } from "../functions/whiteboard";
import "./styles/WhiteBoard.css";

const { createCanvas, loadImage } = require("canvas");

function WhiteBoard() {
  useEffect(() => {
    drawOnCanvas();
  }, []);
  return <canvas id="roomCanvas"></canvas>;
}

export default WhiteBoard;
