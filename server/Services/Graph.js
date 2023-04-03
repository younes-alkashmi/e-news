export default class Graph {
  constructor() {
    this.adjecentList = new Map();
  }

  addVertex(vertex) {
    this.adjecentList.set(vertex, []);
  }

  addEdge(src, dest) {
    this.adjecentList.get(src).push(dest);
  }

  printGraph() {
    const keys = this.adjecentList.keys;

    for (const src of keys) {
      const values = this.adjecentList.get(src);
      const list = "";

      for (const dest of values) list += dest + " ";

      console.log(src + " -> " + list);
    }
  }

  getGraphList() {
    const keys = this.adjecentList.keys;
    const list = [];

    for (const src of keys) {
      const values = this.adjecentList.get(src);

      for (const dest of values) list.push(dest);
    }

    return list;
  }
}
