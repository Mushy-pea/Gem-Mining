function main() {
  let phase = 0;
  let step = 0.03927;
  for (let n = 0; n < 41; n++) {
    console.log(`sineWave${n} = ${Math.trunc(Math.sin(phase) * 1000000)} `);
    phase = phase + step;
  }
}

main();

