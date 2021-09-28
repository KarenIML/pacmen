var pos = 0;
const pacArray = [
  ["./images/PacMan1.png", "./images/PacMan2.png"],
  ["./images/PacMan3.png", "./images/PacMan4.png"],
];

const pacMen = []; // This array holds all the pacmen

function run() {
  update();
  mouthAnimation();
}

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";

  let direction = 0;
  let focus = 0;
  newimg.src = pacArray[direction][focus];
  newimg.width = 100;
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  game.appendChild(newimg);
  // return details in an object
  return {
    position,
    velocity,
    newimg,
    focus,
    direction,
  };
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    direction = checkCollisions(item, item.direction);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;

    item.direction = direction;
    item.newimg.src = pacArray[item.direction][item.focus];
  });
  setTimeout(update, 20);
}

function mouthAnimation() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    item.focus = (item.focus + 1) % 2;
    item.newimg.src = pacArray[item.direction][item.focus];
  });
  setTimeout(mouthAnimation, 200);
}

function checkCollisions(item, direction) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    if (
      direction == 0 &&
      item.position.x + item.velocity.x + item.newimg.width > window.innerWidth
    ) {
      direction = 1;
    }
    if (direction == 1 && item.position.x + item.velocity.x < 0) {
      direction = 0;
    }
    item.velocity.x = -item.velocity.x;
  }
  if (
    item.position.y + item.velocity.y + item.newimg.height >
      window.innerHeight ||
    item.position.y + item.velocity.y < 0
  ) {
    item.velocity.y = -item.velocity.y;
  }
  return direction;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
