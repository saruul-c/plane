import React, { useState } from "react";

export default function Display({bodys=[]}) {
  const [map] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [planeBodysPc, setPlaneBodysPc] = useState(bodys);
  console.log(bodys);

  function createPlane() {
    let planeBody = bodys?.[0] ?? [
      [1, 1],
      [2, 0],
      [2, 1],
      [2, 2],
      [3, 1],
      [4, 0],
      [4, 1],
      [4, 2],
    ];
    return planeBody;
  }

  function CheckBody(items, index, index2) {
    return items.findIndex(item3=>item3[0] === index2 && item3[1] === index ) === -1
  }

  return (
    <div className="map">
      <div className="row">
        <div className="cell">0</div>
        {map[0].map((item, index) => {
          return <div className="cell">{index + 1}</div>;
        })}
      </div>
      {map.map((item, index) => {
        return (
          <div className="row">
            <div className="cell">{index + 1}</div>
            {item.map((item2, index2) => {
              return (
                <div
                  className={"cell " + (bodys.findIndex(item4=> CheckBody(item4, index, index2)) === -1 ? '':'have_body')}
                  onClick={() => {
                    console.log('item2');
                    console.log(item2);
                    alert(`x=${index2 + 1} y=${index + 1}`);
                  }}
                >
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
