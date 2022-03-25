import React, { useEffect, useState } from "react";
import { toastWarning } from "../compoents/toastCore";

export default function Display({ bodys = [], setPoint = ({ шарх = 0, сөнсөн = 0 }) => {} }) {
  const [map, setMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]);

  function CheckBody(items, index, index2) {
    return items.findIndex((item3) => item3[0] === index2 && item3[1] === index) !== -1;
  }

  return (
    <div className="map">
      <div className="row">
        <div className="cell">0</div>
        {map[0].map((_, index) => {
          return (
            <div key={`${index} col numbers`} className="cell">
              {index + 1}
            </div>
          );
        })}
      </div>
      {map.map((item, index) => {
        return (
          <div className="row" key={index}>
            <div className="cell" key={index + "row numbers"}>
              {index + 1}
            </div>
            {item.map((_, index2) => {
              return (
                <div
                  className={"cell " + (bodys.findIndex((item4) => CheckBody(item4, index, index2)) === -1 ? "" : "have_body")}
                  onClick={() => {
                    if (map[index][index2] === 0) {
                      let result = "X";
                      bodys.forEach((b) => {
                        if (result !== "X") {
                          return;
                        }
                        let finded = b.findIndex((item4) => item4[0] === index2 && item4[1] === index);
                        if (finded !== -1) {
                          result = finded === 0 ? "С" : "Ш";
                        }
                      });
                      map[index][index2] = result;
                      setPoint((e) => ({ шарх: e.шарх + (result === "Ш" ? 1 : 0), сөнсөн: e.сөнсөн + (result === "С" ? 1 : 0) }));
                      setMap([...map]);
                    } else toastWarning("Чи аль хэдийн дарсан байна ахиад өөр дараагүй нүдэн дээр дарж ажаамуй ¯\\_(ツ)_/¯");
                  }}
                  key={`${index} : ${index2}`}>
                  {map[index][index2] === 0 ? "" : <h3 style={{ color: "yellowgreen" }}>{map[index][index2]}</h3>}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
