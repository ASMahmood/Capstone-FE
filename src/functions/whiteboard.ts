import { currentLineInfo } from "../types/otherInterfaces";

export const drawOnCanvas = async () => {
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

  window.addEventListener("resize", onResize, false);
  onResize();

  function drawLine(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    emit: boolean
  ) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    return;
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

  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
};
