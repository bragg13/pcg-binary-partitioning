// constants
const MAX_W = 800;
const MAX_H = 800;
const MAX_DEPTH = 4;
const MIN_ROOM_H = 50;
const MIN_ROOM_W = 50;

let tree;
let allowUnevenSplitsInput, allowRandomRoomOffsetInput, keepTreeBalancedInput;

function setup() {
  createCanvas(MAX_W, MAX_H);

  // create inputs
  let splitBtn = createButton("split");
  let createDungeonBtn = createButton("next generation");
  let minRoomW = createInput("");
  let minRoomH = createInput("");

  allowUnevenSplitsInput = createCheckbox("Allow uneven splits");
  allowRandomRoomOffsetInput = createCheckbox("Allow random room offset");
  keepTreeBalancedInput = createCheckbox("Keep the tree balanced");

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
  tree.createRooms();
}

function keyPressed() {
  if (keyCode === 32) {
    this.splitTree();
  }
  return false;
}
function mouseClicked() {
  // console.log(mouseX, mouseY);
}

function splitTree() {
  let direction = random(["h", "v"]);
  let splitSize = allowUnevenSplitsInput.checked() ? random([30, 40, 50]) : 50;

  // select a random leaf node to split
  const leaves =
    keepTreeBalancedInput.checked() && tree.left != null
      ? tree.getLeavesBalanced()
      : tree.getLeaves();

  if (leaves) {
    let node = random(leaves);

    if (keepTreeBalancedInput.checked() && tree.left != null) {
      node.left.splitTree(direction, splitSize);
      node.right.splitTree(direction, splitSize);
    } else {
      node.splitTree(direction, splitSize);
    }
  }
}

function resetMinRoomDim() {
  MIN_ROOM_H = minRoomH.value();
  MIN_ROOM_W = minRoomW.value();
}
