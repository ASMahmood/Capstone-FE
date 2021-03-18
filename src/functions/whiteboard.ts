import { currentLineInfo } from "../types/otherInterfaces";
import io from "socket.io-client";

export const drawOnCanvas = async () => {
  const connOpt = {
    transports: ["websocket"],
  };

  let socket = io("http://localhost:3333", connOpt);

  const canvas: HTMLCanvasElement = document.querySelector(
    "#roomCanvas"
  ) as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;

  let current: currentLineInfo = {
    x: 0,
    y: 0,
  };
  let drawing = false;

  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("mouseup", onMouseUp, false);
  canvas.addEventListener("mouseout", onMouseUp, false);
  canvas.addEventListener("mousemove", onMouseMove, false);

  socket.on("drawing", onDrawingEvent);

  window.addEventListener("resize", onResize, false);
  onResize();

  function drawLine(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    emit?: boolean
  ) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    if (!emit) {
      return;
    }
    let w = canvas.width;
    let h = canvas.height;

    socket.emit("drawing", {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
    });
  }

  function onMouseDown(e: MouseEvent) {
    console.log(e.offsetX, e.clientY);
    drawing = true;
    current.x = e.offsetX;
    current.y = e.clientY;
  }

  function onMouseMove(e: MouseEvent) {
    if (!drawing) {
      return;
    }
    drawLine(current.x, current.y, e.offsetX, e.clientY, true);
    current.x = e.offsetX;
    current.y = e.clientY;
  }

  function onMouseUp(e: MouseEvent) {
    if (!drawing) {
      return;
    }
    drawing = false;
    drawLine(current.x, current.y, e.offsetX, e.clientY, true);
  }

  function onDrawingEvent(data: any) {
    let w = canvas.width;
    let h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h);
  }

  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
};
