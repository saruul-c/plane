// deesh harsan biye uusgeh
export function createBodyTop(head) {
  return [
    head,
    [head[0], head[1] + 1],
    [head[0], head[1] + 2],
    [head[0], head[1] + 3],
    [head[0] - 1, head[1] + 1],
    [head[0] - 1, head[1] + 3],
    [head[0] + 1, head[1] + 1],
    [head[0] + 1, head[1] + 3]
  ];
}

// doosh harsan biye uusgeh
export function createBodyBot(head) {
  return [
    head,
    [head[0], head[1] - 1],
    [head[0], head[1] - 2],
    [head[0], head[1] - 3],
    [head[0] - 1, head[1] - 1],
    [head[0] - 1, head[1] - 3],
    [head[0] + 1, head[1] - 1],
    [head[0] + 1, head[1] - 3]
  ];
}

// baruun harsan biye uusgeh
export function createBodyLeft(head) {
  return [
    head,
    [head[0] + 1, head[1]],
    [head[0] + 2, head[1]],
    [head[0] + 3, head[1]],
    [head[0] + 1, head[1] - 1],
    [head[0] + 3, head[1] - 1],
    [head[0] + 1, head[1] + 1],
    [head[0] + 3, head[1] + 1]
  ];
}

// zuun harsan biye uusgeh
export function createBodyRight(head) {
  return [
    head,
    [head[0] - 1, head[1]],
    [head[0] - 2, head[1]],
    [head[0] - 3, head[1]],
    [head[0] - 1, head[1] - 1],
    [head[0] - 3, head[1] - 1],
    [head[0] - 1, head[1] + 1],
    [head[0] - 3, head[1] + 1]
  ];
}

// ongotsnii biyesiig buteeh

export function bodyGenrate(bodys = []) {
  while (bodys.length < 3) {
    let head = [getRandomInteger(0, 9), getRandomInteger(0, 9)];

    let body;
    let randomDir = getRandomInteger(1, 4);
    if (randomDir === 1) {
      body = createBodyTop(head);
    } else if (randomDir === 2) {
      body = createBodyBot(head);
    } else if (randomDir === 3) {
      body = createBodyLeft(head);
    } else if (randomDir === 4) {
      body = createBodyRight(head);
    }

    if (checkBody(bodys, body)) {
      bodys.push(body);
    }
  }

  return bodys;
}

// check body davhtsal bolon hureenii gadna garsan esehiig shalgana

export function checkBody(bodys = [[]], body = []) {
  let check = true;

  bodys.forEach((b) => {
    if (!check) return;
    b.forEach((elm1) => {
      if (!check) return;
      body.forEach((elm2) => {
        if (!check) return;
        if (elm1[0] === elm2[0] && elm1[1] === elm2[1]) {
          check = false;
        }
      });
    });
  });

  return check && body.findIndex((item) => item[0] < 0 || item[0] > 9 || item[1] < 0 || item[1] > 9) === -1;
}

// sanamsargui buhel toon utga butsaah function

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*

*/
