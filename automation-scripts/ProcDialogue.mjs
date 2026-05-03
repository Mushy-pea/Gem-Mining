import fs from "node:fs"
import child_process from "node:child_process"

function processNodes(nodes, allBranches, outputPath, processFile) {
  let outputText = "";
  for (let m = 0; m < nodes.length; m++) {
    outputText += `node[${m}]:/\n-1 00/`;
    const bodyText = nodes[m].speech.split("");
    bodyText.forEach(char => {
      if (char === "~") { outputText += "\n-1 00/" }
      else { outputText += char }
    });
    outputText += "\n";
    for (let n = 0; n < nodes[m].theseBranches.length; n++) {
      const thisBranch = allBranches[nodes[m].theseBranches[n]].response.split("");
      outputText += `-1 0${n + 1}/`;
      thisBranch.forEach(char => {
        outputText += char;
      });
      outputText += "\n";
    }
    const outputFile = `${outputPath}${m}.txt`;
    fs.writeFileSync(outputFile, outputText.slice(0, -1));
    child_process.execFileSync("node", [processFile, outputFile, `${outputFile.slice(0, -4)}(1).txt`]);
    outputText = "";
  }
}

function main() {
  const inputFile = process.argv[2];
  const outputPath = process.argv[3];
  const processFile = process.argv[4];
  const data = fs.readFileSync(inputFile, "utf8");
  const converstion = JSON.parse(data);
  processNodes(converstion.nodes, converstion.allBranches, outputPath, processFile);
}

main();

