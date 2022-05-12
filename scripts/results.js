var OM = sessionStorage.getObj("outputMatrix");

console.log(OM);
//first names
const onenn = document.createTextNode(OM[0][0] + " " + OM[0][1] + " vs You");
const onen = document.getElementById("1n");
onen.appendChild(onenn);

const twonn = document.createTextNode(OM[1][0] + " " + OM[1][1] + " vs You");
const twon = document.getElementById("2n");
twon.appendChild(twonn);

const threenn = document.createTextNode(OM[2][0] + " " + OM[2][1] + " vs You");
const threen = document.getElementById("3n");
threen.appendChild(threenn);

