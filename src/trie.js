export class Trie {
  static fromJsonString(jsonTrie) {
    const obj = JSON.parse(jsonTrie);
    const t = new Trie();
    for (let key of Object.keys(obj)) {
      t[key] = obj[key];
    }
    return t;
  }

  insert(word) {
    if (!word || !word.length) return false;

    let currentNode = this;
    for (let c of word) {
      if (!currentNode[c]) {
        currentNode[c] = new Trie();
      }
      currentNode = currentNode[c];
    }

    currentNode.$ = 1;
  }

  find(word) {
    if (!word || !word.length) return false;

    let currentNode = this;
    for (let c of word) {
      if (!currentNode[c]) return false;
      currentNode = currentNode[c];
    }

    return currentNode.$ === 1;
  }

  toJsonString() {
    return JSON.stringify(this);
  }

  toJsString() {
    return `module.exports=${this.toJsonString().replace(/\"/g, "")};`;
  }
}