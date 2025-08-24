function automateFloorUpdate() {
  const w = 2;
  for (let u = 0; u < 50; u++) {
    for (let v = 0; v < 50; v++) {
      const nextEntry = `write Wall_grid Obj_place ${w} ${u} ${v} 16 ${u} ${v} ${w} 1 36 0`;
      console.log(`${nextEntry}`);
    }
  }
}

function main() {
  automateFloorUpdate();
}

main();

