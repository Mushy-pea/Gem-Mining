import fs from "node:fs"

function encodeLine(line) {
  let key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ,'.?;:+-=!()<>".split("");
  let encodedLine = "";
  line.forEach((char) => {
    let encodedChar = key.findIndex((element) => {
      if (element === char) { return true }
      else { return false }
    }) + 1;
    if (encodedChar !== 0) { encodedLine += `${encodedChar} ` }
  });
  return encodedLine;
}

function postprocessLine(line) {
  let outputLine = "";
  line.forEach((token) => {
    if (token.length === 1) { outputLine += `0${token} ` }
    else { outputLine += `${token} ` }
  });
  return outputLine;
}

function packageTokens(paragraph) {
  let c = 8;
  let outputText = "";
  let numTokens = 0;
  paragraph.forEach((token) => {
    if (c === 15 && token.charAt(0) !== "-") {
      outputText += `${token} \n`;
      c = 0;
      numTokens++;
    }
    else if (token.charAt(0) === "-") {
      outputText += `${token} `;
    }
    else {
      outputText += `${token} `;
      c++;
      numTokens++;
    }
  });
  outputText += `\n\nnumTokens: ${numTokens - 3}`;
  return outputText;
}

function encodeMessage(message, outputFile) {
  let encodedMessage = "";
  message.forEach((line) => {
    let line0 = line.split("/")[0];
    let line1 = line.split("/")[1];
    let intermediateLine = `${line0} ${encodeLine(line1.split(""))}`;
    encodedMessage += `${postprocessLine(intermediateLine.split(" "))}`;
  });
  const outputText = packageTokens(encodedMessage.split(" "));
  fs.writeFileSync(outputFile, outputText);
}

function main() {
  const inputFile = process.argv[2];
  const outputFile = process.argv[3];
  const message = fs.readFileSync(inputFile, "utf8").split("\n");
  encodeMessage(message, outputFile);
}

main();

