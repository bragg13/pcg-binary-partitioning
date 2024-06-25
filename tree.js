class Room {
  constructor(name, pos, size, parentSize) {
    this.name = name;
    this.size = size;
    this.parentSize = parentSize;
    this.position = pos;
  }

  draw() {
    fill("#7a6323");
    let offX = 5;
    let offY = 5;

    let freeSpaceW = this.parentSize.width - this.size.width;
    let freeSpaceH = this.parentSize.height - this.size.height;

    rect(
      this.position.x + freeSpaceW / 2 + offX,
      this.position.y + freeSpaceH / 2 + offY,
      this.size.width - 2 * offX,
      this.size.height - 2 * offY,
    );
  }
}

class Node {
  constructor(parent, position, size) {
    this.left = null;
    this.right = null;
    this.parent = parent;
    this.depth = parent != null ? parent.depth + 1 : 0;
    const colorOffset = int((250 / MAX_DEPTH) * (this.depth + 1));
    this.color = `rgb(${colorOffset}, ${colorOffset}, ${colorOffset})`;

    this.position = position;
    this.size = size;
    this.leaf = true;

    // init room
    this.room = null;
  }

  createRoom(size) {
    this.room = new Room(
      this.createRandomString(4),
      this.position,
      size,
      this.size,
    );
  }

  createRooms() {
    if (this.leaf) {
      let size = {
        width: random(MIN_ROOM_W, this.size.width),
        height: random(MIN_ROOM_H, this.size.height),
      };
      this.createRoom(size);
    } else {
      this.left.createRooms();
      this.right.createRooms();
    }
  }

  draw() {
    fill(this.color);
    let offX = 5;
    let offY = 5;

    rect(
      this.position.x + offX,
      this.position.y + offY,
      this.size.width - 2 * offX,
      this.size.height - 2 * offY,
    );

    if (!this.leaf) {
      this.left.draw();
      this.right.draw();
    } else {
      fill(this.depth > 2 ? "black" : "white");
      const centerX = this.position.x + this.size.width / 2;
      const centerY = this.position.y + this.size.height / 2;
      // text(
      //   `${this.depth} (${this.size.width},${this.size.height})`,
      //   centerX,
      //   centerY,
      // );
    }

    if (this.room) this.room.draw();
  }

  canBeSplit() {
    // and if the smallest potential spit (30%) would still be larger than the minimum room size
    return (
      this.size.width * 0.3 > MIN_ROOM_W && this.size.height * 0.3 > MIN_ROOM_H
    );
  }

  getLeaves() {
    if (this.leaf) {
      if (this.depth < MAX_DEPTH) {
        if (this.canBeSplit()) {
          return [this];
        }
      }
      return [];
    }

    let left = this.left.getLeaves();
    let right = this.right.getLeaves();

    return [...left, ...right];
  }
  splitTree(mode, perc) {
    this.leaf = false;

    if (mode == "h") {
      // HORIZONTAL SPLIT
      let leftDim = this.size.height / (100 / perc);
      let rightDim = this.size.height - leftDim;

      this.left = new Node(this, this.position, {
        width: this.size.width,
        height: leftDim,
      });

      this.right = new Node(
        this,
        { x: this.position.x, y: this.position.y + leftDim },
        { width: this.size.width, height: rightDim },
      );
    } else {
      // VERTICAL SPLIT
      let leftDim = this.size.width / (100 / perc);
      let rightDim = this.size.width - leftDim;

      this.left = new Node(this, this.position, {
        width: leftDim,
        height: this.size.height,
      });

      this.right = new Node(
        this,
        { x: this.position.x + leftDim, y: this.position.y },
        { width: rightDim, height: this.size.height },
      );
    }
  }

  createRandomString(length) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
