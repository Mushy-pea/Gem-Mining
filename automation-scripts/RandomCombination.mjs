function main() {
  for (let m = 0; m < 64; m++) {
    const bitArray = new Array(0);
    for (let n = 0; n < 6; n++) {
      const diceThrow = Math.random();
      if (diceThrow < 0.5) {
        bitArray.push(false);
      }
      else {
        bitArray.push(true);
      }
    }
    let nextCombo = "";
    bitArray.forEach((element) => {
      if (element) {
        nextCombo += "1 ";
      }
      else {
        nextCombo += "0 ";
      }
    });
    console.log(nextCombo);
  }
}

main();

