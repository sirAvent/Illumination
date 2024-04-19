class Analyzer {
  constructor(wordsNum) {
    this.wordsNum = wordsNum; // how many terms should be return
  }

  analyze() {
    throw new Error("Analyzer didn't implemented analyze()");
  }
}

export default Analyzer;
