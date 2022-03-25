import "./App.css";
import Display from "./plane/display";
import { useEffect, useState } from "react";
import ToastifyBody from "./compoents/toastCore";
import { bodyGenrate } from "./utils/functions";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [pcBodys, setPcBodys] = useState([]);
  const [humanBodys, setHumanBodys] = useState([]);

  const [humanPoint, setHumanPoint] = useState({ шарх: 0, сөнсөн: 0 });
  const [pcPoint, setPcPoint] = useState({ шарх: 0, сөнсөн: 0 });

  useEffect(() => {
    setPcBodys(bodyGenrate());
    setHumanBodys(bodyGenrate());
  }, []);

  return (
    <>
      <h1>Онгоц бууддаг тоглоом</h1>
      <div className="container">
        <div className="app" key="user">
          <h1>Тоглогч</h1>
          <Display bodys={pcBodys} setPoint={setPcPoint} />
          <h4>Шарх: {pcPoint.шарх}</h4>
          <h4>Сөнсөн: {pcPoint.сөнсөн}</h4>
        </div>
        <div className="app" key="pc">
          <h1>Аймаар машин</h1>
          <Display bodys={humanBodys} setPoint={setHumanPoint} />
          <h4>Шарх: {humanPoint.шарх}</h4>
          <h4>Сөнсөн: {humanPoint.сөнсөн}</h4>
        </div>
      </div>
      <ToastifyBody />
    </>
  );
}

export default App;
