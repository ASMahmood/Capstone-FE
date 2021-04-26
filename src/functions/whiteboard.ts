import { currentLineInfo } from "../types/otherInterfaces";
import {
  receiveDrawing,
  sendDrawing,
  joinRoom,
  sendCanvasData,
} from "./socket";
import { reduxStore } from "../types/reduxInterface";

export const drawOnCanvas = async (props: reduxStore) => {
  const canvas: HTMLCanvasElement = document.querySelector(
    "#roomCanvas"
  ) as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;
  const whiteboard: HTMLElement = document.querySelector(
    ".whiteBoard"
  ) as HTMLElement;
  const colorPicker: Element = document.querySelector(
    "#colorPicker"
  ) as Element;
  const widthPicker: Element = document.querySelector(
    "#widthPicker"
  ) as Element;

  function draw() {
    let image = new Image();
    image.onload = function () {
      ctx.drawImage(image, 0, 0);
    };
    image.src = props.room.images;
    image.width = whiteboard.offsetWidth;
    image.height = whiteboard.offsetHeight;
  }
  draw();

  let current: currentLineInfo = {
    x: 0,
    y: 0,
  };
  let drawing = false;
  let color: string = "black";
  let width: number = 2;

  joinRoom({
    roomId: props.room._id,
    username: props.user.username,
    userId: props.user._id,
  });

  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("mouseup", onMouseUp, false);
  canvas.addEventListener("mouseout", onMouseUp, false);
  canvas.addEventListener("mousemove", onMouseMove, false);
  colorPicker.addEventListener("change", changeColor, false);
  widthPicker.addEventListener("change", changeWidth, false);

  receiveDrawing(onDrawingEvent);

  window.addEventListener("resize", onResize, false);
  onResize();

  function changeColor(e: any) {
    color = e.currentTarget.value;
  }

  function changeWidth(e: any) {
    width = e.currentTarget.value;
  }

  function drawLine(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color: string,
    width: number,
    emit?: boolean
  ) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();

    if (!emit) {
      return;
    }
    let w = canvas.width;
    let h = canvas.height;

    sendDrawing({
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color,
      width: width,
      roomId: props.room._id,
    });
  }

  function onMouseDown(e: MouseEvent) {
    console.log(e.offsetX, e.offsetY);
    drawing = true;
    current.x = e.offsetX;
    current.y = e.offsetY;
  }

  function onMouseMove(e: MouseEvent) {
    if (!drawing) {
      return;
    }
    drawLine(current.x, current.y, e.offsetX, e.offsetY, color, width, true);
    current.x = e.offsetX;
    current.y = e.offsetY;
  }

  function onMouseUp(e: MouseEvent) {
    if (!drawing) {
      return;
    }
    drawing = false;
    drawLine(current.x, current.y, e.offsetX, e.offsetY, color, width, true);
    getCanvasDataAndSend();
  }

  function onDrawingEvent(data: any) {
    let w = canvas.width;
    let h = canvas.height;
    drawLine(
      data.x0 * w,
      data.y0 * h,
      data.x1 * w,
      data.y1 * h,
      data.color,
      data.width
    );
  }

  async function getCanvasDataAndSend() {
    let base64ImageData = await canvas.toDataURL("image/png");
    sendCanvasData({ canvasData: base64ImageData, roomId: props.room._id });
  }

  function onResize() {
    canvas.width = whiteboard.offsetWidth;
    canvas.height = whiteboard.offsetHeight;
    draw();
  }
};

export const userWhiteboard = async (props: reduxStore) => {
  let current: currentLineInfo = {
    x: 0,
    y: 0,
  };
  let editing: boolean = false;
  let drawing = false;
  let color: string = "black";
  let width: number = 2;

  const toggleEdit = () => {
    if (editing) {
      editing = false;
    } else {
      editing = true;
    }
  };

  const userCanvas: HTMLCanvasElement = document.querySelector(
    "#userCanvas"
  ) as HTMLCanvasElement;
  let ctx2: CanvasRenderingContext2D;
  if (userCanvas !== null) {
    ctx2 = userCanvas.getContext("2d") as CanvasRenderingContext2D;
  }
  const userWhiteboard: HTMLElement = document.querySelector(
    "#userWhiteboard"
  ) as HTMLElement;
  const editButton: HTMLElement = document.querySelector(
    "#homepageEdit"
  ) as HTMLElement;

  function draw() {
    let image = new Image();
    image.onload = function () {
      ctx2.drawImage(image, 0, 0);
    };
    image.src = props.user.bioImage;
    image.width = userWhiteboard.offsetWidth;
    image.height = userWhiteboard.offsetHeight;
  }
  if (props.user.bioImage) {
    draw();
  }

  if (userCanvas !== null) {
    userCanvas.addEventListener("mousedown", onMouseDown, false);
    userCanvas.addEventListener("mouseup", onMouseUp, false);
    userCanvas.addEventListener("mouseout", onMouseUp, false);
    userCanvas.addEventListener("mousemove", onMouseMove, false);
  }
  if (editButton !== null) {
    editButton.addEventListener("click", toggleEdit, false);
  }

  window.addEventListener("resize", onResize, false);
  onResize();

  function drawLine(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color: string,
    width: number
  ) {
    ctx2.beginPath();
    ctx2.moveTo(x0, y0);
    ctx2.lineTo(x1, y1);
    ctx2.lineCap = "round";
    ctx2.strokeStyle = color;
    ctx2.lineWidth = width;
    ctx2.stroke();
    ctx2.closePath();
  }

  function onMouseDown(e: MouseEvent) {
    if (editing) {
      drawing = true;
      current.x = e.offsetX;
      current.y = e.offsetY;
    }
  }

  function onMouseMove(e: MouseEvent) {
    if (!drawing) {
      return;
    }
    drawLine(current.x, current.y, e.offsetX, e.offsetY, color, width);
    current.x = e.offsetX;
    current.y = e.offsetY;
  }

  function onMouseUp(e: MouseEvent) {
    if (!drawing) {
      return;
    }
    drawing = false;
    drawLine(current.x, current.y, e.offsetX, e.offsetY, color, width);
  }

  function onResize() {
    if (userCanvas !== null) {
      userCanvas.width = userWhiteboard.offsetWidth;
      userCanvas.height = userWhiteboard.offsetHeight;
      draw();
    }
  }
};
