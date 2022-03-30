import "./App.css";
import Display from "./plane/display";
import { useEffect, useState } from "react";
import ToastifyBody, { toastInfo, toastWarning } from "./compoents/toastCore";
import { bodyGenrate, checkBody, createBodyBot, createBodyLeft, createBodyRight, createBodyTop } from "./utils/functions";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [pcBodys, setPcBodys] = useState([]);
  const [humanBodys, setHumanBodys] = useState([]);
  const [active, setActive] = useState(true);
  const [humanPoint, setHumanPoint] = useState({ шарх: 0, сөнсөн: 0 });
  const [pcPoint, setPcPoint] = useState({ шарх: 0, сөнсөн: 0 });
  const [waiting, setWaiting] = useState(true);
  const [tempHead, setTempHead] = useState();

  useEffect(() => {
    setWaiting(gameIsReady());
  }, [pcBodys, humanBodys]);

  useEffect(() => {
    setPcBodys(bodyGenrate());
    // setHumanBodys(bodyGenrate());
  }, []);

  useEffect(() => {
    function keyPress(e) {
      let bodyTemp;

      if (e.key === "w") {
        bodyTemp = createBodyTop(tempHead);
      } else if (e.key === "s") {
        bodyTemp = createBodyBot(tempHead);
      } else if (e.key === "a") {
        bodyTemp = createBodyLeft(tempHead);
      } else if (e.key === "d") {
        bodyTemp = createBodyRight(tempHead);
      } else if (e.key === "x") {
        setHumanBodys([...humanBodys]);
        setTempHead();
      } else {
        toastWarning("Та буруу товч дарсан байна ^_-");
      }
      if (bodyTemp) {
        if (checkBody(humanBodys, bodyTemp)) {
          setHumanBodys([...humanBodys, bodyTemp]);
          setTempHead();
          toastInfo("Амжилттай");
        } else toastWarning("Энэ онгоцы зурагдалт буруу байна");
      }
    }
    if (tempHead) {
      window.addEventListener("keypress", keyPress);
    } else window.removeEventListener("keypress", keyPress);
  }, [tempHead]);

  return (
    <>
      <h1>Онгоц бууддаг тоглоом</h1>
      <div
        className="container"
        onKeyDown={(e) => {
          console.log("hha");
          console.log(e.code);
        }}>
        <div aria-disabled={true} className={"app " + (pcPoint.сөнсөн === 3 ? "winner" : "") + (humanPoint.сөнсөн === 3 ? "loser" : "")} key="user">
          <h1>Саруулаа</h1>
          <Display
            active={active}
            onShoot={(index, index2) => {
              if (humanBodys.length < 3) {
                if (!tempHead) setTempHead([index2, index]);
                else {
                  toastInfo('Бие байршуулалтаа дуусгана уу. Хэрэв шинэ тоглой зурах бол "х" товчийг дарна уу.');
                }
              } else setActive(!active);
            }}
            creatingPlane={false}
            bodys={humanBodys}
            setPoint={setPcPoint}
            win={humanBodys.length < 3 || gameIsDone()}
          />
          <h4>Шарх: {pcPoint.шарх}</h4>
          <h4>Сөнсөн: {pcPoint.сөнсөн}</h4>
        </div>
        <div aria-disabled={true} className={"app " + (humanPoint.сөнсөн === 3 ? "winner" : "") + (pcPoint.сөнсөн === 3 ? "loser" : "")} key="pc">
          <h1>Хишигбаяр</h1>
          <Display active={!active} bodys={pcBodys} onShoot={() => setActive(!active)} setPoint={setHumanPoint} win={gameIsDone()} />
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

  function gameIsDone() {
    return pcPoint.сөнсөн === 3 ? -1 : humanPoint.сөнсөн === 3 ? 1 : 0;
  }
  function gameIsReady() {
    return pcBodys.length === 3 && humanBodys.length === 3;
  }
}

export default App;
