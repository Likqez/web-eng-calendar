import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./App.tsx";

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", function(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
  }
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App/>
)

export const getMousePos = () => {
  return {x: mouseX, y: mouseY};
}