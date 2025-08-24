import { readFileSync } from "node:fs";

function compareCombo(comboA, comboSet) {
  let collisions = -1;
  comboSet.forEach((combo) => {
    if (combo.button1 === comboA.button1 &&
        combo.button2 === comboA.button2 &&
        combo.button3 === comboA.button3 &&
        combo.button4 === comboA.button4 &&
        combo.button5 === comboA.button5 &&
        combo.button6 === comboA.button6) { collisions ++ }
  });
  return collisions;
}

function loadComboSet(serialisedSet) {
  const comboSetArray = new Array(0);
  serialisedSet.forEach((comboStr) => {
    const comboStrArray = comboStr.split(" ");
    const comboArray = new Array(0);
    comboStrArray.forEach((element) => {
      if (element === "1") { comboArray.push(true) }
      else if (element === "0") { comboArray.push(false) }
    });
    const nextCombo = {
      button1: false,
      button2: false,
      button3: false,
      button4: false,
      button5: false,
      button6: false
    };
    if (comboArray[0] === true) { nextCombo.button1 = true }
    if (comboArray[1] === true) { nextCombo.button2 = true }
    if (comboArray[2] === true) { nextCombo.button3 = true }
    if (comboArray[3] === true) { nextCombo.button4 = true }
    if (comboArray[4] === true) { nextCombo.button5 = true }
    if (comboArray[5] === true) { nextCombo.button6 = true }
    comboSetArray.push(nextCombo);
  });
  return comboSetArray;
}

function main() {
  const path = process.argv[2];
  const contents = readFileSync(path, "utf8").split("\n");
  const comboSet = loadComboSet(contents);
  // let i = 1;
  // comboSet.forEach((combo) => {
  //   console.log(`[${i}]: ${JSON.stringify(combo)}`);
  //   i++;
  // });  
  comboSet.forEach((combo) => {
    const collisions = compareCombo(combo, comboSet);
    if (collisions > 0) {
      console.log(`\ncombination: ${JSON.stringify(combo)}`);
      console.log(`collisions: ${collisions}`);
    }
  });
}

main();

