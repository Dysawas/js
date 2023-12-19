function findMinCountCrossings(tributaries) {
  if (tributaries.length < 1)  return null
  
  let count = 1;
  let currentShore = tributaries[0] === "L" ? "right" : "left";
  for (let tributary of tributaries) {

    if (tributary === "B") {
      count++; 
      continue
    }

    if (currentShore === "right" && tributary === "R") {
      currentShore = "left";
      count++;
    } else if (currentShore === "left" && tributary === "L") {
      currentShore = "right";
      count++;
    }
  }

  return count;
}


