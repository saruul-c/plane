import React, { useState } from "react";

export default function Display() {
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

  const [planeBodysPc, setPlaneBodysPc] = useState([createPlane()]);

  function createPlane() {
    let planeBody = [
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
                  className="cell" 
                  onClick={() => {
                    alert(`x=${index2 + 1} y=${index + 1}`);
                  }}
                >
                    {createPlane().findIndex(item3=>item3[0] === index2 && item3[1] === index ) === -1 ? '':'*'}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
