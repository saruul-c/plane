import logo from "./logo.svg";
import "./App.css";
import Display from "./plane/display";
import { useEffect, useState } from "react";

function App() {
  const [pcBodys, setPcBodys] = useState([]);
  // ongotsnii biye iig buteeh
  function bodyGenrate(
    bodys = [
      
    ]
  ) {
    console.log('you here budy');
    console.log(bodys.length);
    while (bodys.length < 3) {
      let head = [getRandomInteger(0, 9), getRandomInteger(0, 9)];
      console.log(`togloi: ${JSON.stringify(head)}`);

      let randomDir = getRandomInteger(1, 4);
      if (randomDir === 1) {
        bodys.push(createBodyTop(head));
      } else if (randomDir === 2) {
        bodys.push(createBodyBot(head));
      } else if (randomDir === 3) {
        bodys.push(createBodyLeft(head));
      } else if (randomDir === 4) {
        bodys.push(createBodyRight(head));

      }
      console.log(bodys);
    }

    return bodys;
  }
  // deesh harsan biye uusgeh
  function createBodyTop(head) {
    return [
      head,
      [head[0], head[1] + 1],
      [head[0], head[1] + 2],
      [head[0], head[1] + 3],
      [head[0] - 1, head[1] + 1],
      [head[0] - 1, head[1] + 3],
      [head[0] + 1, head[1] + 1],
      [head[0] + 1, head[1] + 3],
    ];
  }

  // doosh harsan biye uusgeh
  function createBodyBot(head) {
    return [
      head,
      [head[0], head[1] - 1],
      [head[0], head[1] - 2],
      [head[0], head[1] - 3],
      [head[0] - 1, head[1] - 1],
      [head[0] - 1, head[1] - 3],
      [head[0] + 1, head[1] - 1],
      [head[0] + 1, head[1] - 3],
    ];
  }

  // baruun harsan biye uusgeh
  function createBodyLeft(head) {
    return [
      head,
      [head[0] + 1, head[1]],
      [head[0] + 2, head[1]],
      [head[0] + 3, head[1]],
      [head[0] + 1, head[1] - 1],
      [head[0] + 3, head[1] - 1],
      [head[0] + 1, head[1] + 1],
      [head[0] + 3, head[1] + 1],
    ];
  }

  // zuun harsan biye uusgeh
  function createBodyRight(head) {
    return [
      head,
      [head[0] - 1, head[1]],
      [head[0] - 2, head[1]],
      [head[0] - 3, head[1]],
      [head[0] - 1, head[1] - 1],
      [head[0] - 3, head[1] - 1],
      [head[0] - 1, head[1] + 1],
      [head[0] - 3, head[1] + 1],
    ];
  }

  // integer utga butsaa random func

  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // useEffect(() => {}, );

  return (
    <>
      <h1>Онгоц бууддаг тоглоом</h1>
      <div className="container">
        <div className="app">
          <h1>Тоглогч</h1>
          <Display bodys={[bodyGenrate()]} />
          <h4>Ялалт: </h4>
          <h4>Ялагдал: </h4>
        </div>
        <div className="app">
          <h1>Аймаар машин </h1>
          <Display />
          <h4>Ялалт: </h4>
          <h4>Ялагдал: </h4>
        </div>
      </div>
    </>
  );
}

export default App;
