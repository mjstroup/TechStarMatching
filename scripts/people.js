// for (let i = 0; i < userData.length; i++) {
//     const td = document.createElement("td");
//     const node = document.createTextNode(userData[i][0] + " " + userData[i][1]);
//     td.appendChild(node);

//     const element = document.getElementById("tableofpeople");
//     element.appendChild(td);
// }
for (let i = 0; i < userData.length; i++) {
    const td = document.createElement("td");
    const h2 = document.createElement("h2");
    const node = document.createTextNode(userData[i][0] + " " + userData[i][1]);
    h2.appendChild(node);
    td.appendChild(h2);
    const element = document.getElementById("tableofpeople");
    element.appendChild(td);
}