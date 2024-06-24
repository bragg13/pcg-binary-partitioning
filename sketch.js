// constants
const MAX_W = 800;
const MAX_H = 800;
const MAX_DEPTH = 5;

let roomDim = {
  height: 100,
  width: 100,
};

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
  console.log(mouseX, mouseY);
}

function splitTree() {
  let direction = random(["h", "v"]);
  console.log(`Splitting on ${direction}`);

  // select a random leaf node to split
  const leaves = tree.getLeaves();
  console.log("leaves");
  console.log(leaves);

  let node = random(leaves);
  node.splitTree(direction);
  console.log(tree);
}

function resetMinRoomDim() {
  roomDim["height"] = minRoomH.value();
  roomDim["width"] = minRoomW.value();
}
