import "./App.css";
import Display from "./plane/display";
import { useEffect, useRef, useState } from "react";
import ToastifyBody, { toastError, toastInfo, toastInfoLong, toastSuccess, toastWarning } from "./compoents/toastCore";
import { bodyGenrate, checkBody, createBodyBot, createBodyLeft, createBodyRight, createBodyTop, getRandomInteger } from "./utils/functions";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [pcBodys, setPcBodys] = useState([]);
  const [humanBodys, setHumanBodys] = useState([]);
  const [active, setActive] = useState(true);
  const [humanPoint, setHumanPoint] = useState({ шарх: 0, сөнсөн: 0 });
  const [pcPoint, setPcPoint] = useState({ шарх: 0, сөнсөн: 0 });
  const [gameStatus, setGameStatus] = useState(false);
  const [tempHead, setTempHead] = useState();
  const [shootData, setShootData] = useState([]);

  const humanMapRemote = useRef();

  useEffect(() => {
    setPcBodys(bodyGenrate());
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
    }
    return () => window.removeEventListener("keypress", keyPress);
  }, [tempHead, humanBodys]);

  useEffect(() => {
    if (active && humanBodys.length > 2) {
      let data;
      setTimeout(() => {
        data = randomShoot(shootData);
        humanMapRemote.current?.shoot(data[0], data[1]);
      }, 1000);
    }
    // eslint-disable-next-line
  }, [active, humanBodys]);

  useEffect(() => {
    // eslint-disable-next-line
    setGameStatus(gameIsDone());
    // eslint-disable-next-line
  });

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
          <h1>Тоглогч</h1>
          <Display
            active={active}
            isAuto
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
            win={gameStatus}
            show={humanBodys.length < 3}
            customRef={humanMapRemote}
          />
          <h4>Шарх: {pcPoint.шарх}</h4>
          <h4>Сөнсөн: {pcPoint.сөнсөн}</h4>
        </div>
        <div aria-disabled={true} className={"app " + (humanPoint.сөнсөн === 3 ? "winner" : "") + (pcPoint.сөнсөн === 3 ? "loser" : "")} key="pc">
          <h1>Аймаар машин</h1>
          <Display active={!active} bodys={pcBodys} onShoot={() => setActive(!active)} setPoint={setHumanPoint} win={gameStatus} />
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
    setHumanBodys([]);
    setHumanPoint({ шарх: 0, сөнсөн: 0 });
    setPcPoint({ шарх: 0, сөнсөн: 0 });
    setShootData([]);
    setActive(true);
  }

  function gameIsDone() {
    let result = pcPoint.сөнсөн === 3 ? -1 : humanPoint.сөнсөн === 3 ? 1 : 0;
    if (result === 1) {
      toastSuccess("Баяр хүргэе та яллаа");
      toastInfoLong(
        "Машин: Хэдийгээр би одоохондоо оновчгүй байгаа ч гэсэн Artificial Intelligence ийн ачаар мэдээлэл цуглуулан ялах магадлалаа илүү сайжруулах болно."
      );
    } else if (result === -1) {
      toastError("Та аймаар машинд ялагдлаа таньд баяр хүргэе 😂😂🤣");
    }
    return pcPoint.сөнсөн === 3 ? -1 : humanPoint.сөнсөн === 3 ? 1 : 0;
  }

  function randomShoot(shootData = [[]]) {
    let shoot;
    let check;
    while (!check) {
      check = true;
      shoot = [getRandomInteger(0, 9), getRandomInteger(0, 9)];
      shootData.forEach((item) => {
        if (check) {
          if (item[0] === shoot[0] && item[1] === shoot[1]) check = false;
        }
      });
    }
    setShootData([...shootData, shoot]);
    return shoot;
  }
}

export default App;
