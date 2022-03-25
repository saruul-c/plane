import "./App.css";
import Display from "./plane/display";
import { useEffect, useState } from "react";
import ToastifyBody from "./compoents/toastCore";
import { bodyGenrate } from "./utils/functions";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [pcBodys, setPcBodys] = useState([]);
  const [humanBodys, setHumanBodys] = useState([]);
  const [active, setActive] = useState(false);
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
        <div aria-disabled={active} className={"app " + (pcPoint.сөнсөн === 3 ? "winner" : "") + (humanPoint.сөнсөн === 3 ? "loser" : "")} key="user">
          <h1>Тоглогч</h1>
          <Display disbled={active} bodys={pcBodys} setPoint={setPcPoint} win={pcPoint.сөнсөн === 3 || humanPoint.сөнсөн === 3} />
          <h4>Шарх: {pcPoint.шарх}</h4>
          <h4>Сөнсөн: {pcPoint.сөнсөн}</h4>
        </div>
        <div aria-disabled={!active} className={"app " + (humanPoint.сөнсөн === 3 ? "winner" : "") + (pcPoint.сөнсөн === 3 ? "loser" : "")} key="pc">
          <h1>Аймаар машин</h1>
          <Display disbled={!active} setPoint={setHumanPoint} win={pcPoint.сөнсөн === 3 || humanPoint.сөнсөн === 3} />
          <h4>Шарх: {humanPoint.шарх}</h4>
          <h4>Сөнсөн: {humanPoint.сөнсөн}</h4>
        </div>
        <button onClick={restart}>Нахий</button>
      </div>
      <ToastifyBody />
    </>
  );
  function restart() {
    setPcBodys(bodyGenrate());
    setHumanBodys(bodyGenrate());
    setHumanPoint({ шарх: 0, сөнсөн: 0 });
    setPcPoint({ шарх: 0, сөнсөн: 0 });
  }
}

export default App;
