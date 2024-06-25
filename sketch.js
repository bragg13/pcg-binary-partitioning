// constants
const MAX_W = 800;
const MAX_H = 800;
const MAX_DEPTH = 4;
const MIN_ROOM_H = 50;
const MIN_ROOM_W = 50;

let tree;

function setup() {
  createCanvas(MAX_W, MAX_H);

  // create inputs
  let splitBtn = createButton("split");
  let createDungeonBtn = createButton("next generation");
  let minRoomW = createInput("");
  let minRoomH = createInput("");

  splitBtn.mousePressed(splitTree);
  createDungeonBtn.mousePressed(createDungeon);
  minRoomH.input(resetMinRoomDim);
  minRoomW.input(resetMinRoomDim);

  // tree
  tree = new Node(null, { x: 0, y: 0 }, { width: MAX_W, height: MAX_H });
}

function draw() {
  background(220);
  tree.draw();
}

function createDungeon() {
  const leaves = tree.getLeaves();
  console.log(leaves);
}
function mouseClicked() {
  // console.log(mouseX, mouseY);
}

function splitTree() {
  let direction = random(["h", "v"]);
  let splitSize = random([30, 40, 50]);

  // select a random leaf node to split
  const leaves = tree.getLeaves();

  if (leaves) {
    let node = random(leaves);
    node.splitTree(direction, splitSize);
  }
}

function resetMinRoomDim() {
  MIN_ROOM_H = minRoomH.value();
  MIN_ROOM_W = minRoomW.value();
}
