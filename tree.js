class Room {
  constructor(name, w, h) {
    this.name = name;
    this.width = w;
    this.height = h;

    this.position = { ...position };
  }

  draw() {}
}

class Node {
  constructor(parent, position, size) {
    this.left = null;
    this.right = null;
    this.parent = parent;
    this.depth = parent != null ? parent.depth + 1 : 0;
    const colorOffset = int((250 / 6) * (this.depth + 1));
    this.color = `rgb(${colorOffset}, ${colorOffset}, ${colorOffset})`;

    this.position = position;
    this.size = size;
    this.leaf = true;

    // init room
    this.room = null;
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
    }
    // this.room.draw();
  }

  getLeaves() {
    if (this.leaf) {
      return [this];
    }

    let left = this.left.getLeaves();
    let right = this.right.getLeaves();

    return [...left, ...right];
  }
  splitTree(mode) {
    console.log(`splitting`);
    this.leaf = false;

    if (mode == "h") {
      // HORIZONTAL SPLIT
      let half = this.size.height / 2;

      this.left = new Node(this, this.position, {
        width: this.size.width,
        height: half,
      });

      this.right = new Node(
        this,
        { x: this.position.x, y: this.position.y + half },
        { width: this.size.width, height: half },
      );
    } else {
      // VERTICAL SPLIT
      let half = this.size.width / 2;

      this.left = new Node(this, this.position, {
        width: half,
        height: this.size.height,
      });

      this.right = new Node(
        this,
        { x: this.position.x + half, y: this.position.y },
        { width: half, height: this.size.height },
      );
    }
  }

  // toString() {
  //   return `depth: ${this.depth}, pos: ${this.position}, size: ${this.size}
  //   - ${this.left}
  //   - ${this.right}
  //   `;
  // }
}
