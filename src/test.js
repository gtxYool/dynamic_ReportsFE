import fetchData from "../src/util/fetchData.js";
const chck = document.querySelector(".checklist");
const tables = document.getElementById("tables");
let jsonArray;

tables.addEventListener("change", (event) => {
  while (chck.hasChildNodes()) {
    chck.removeChild(chck.lastChild);
  }
  actOpc(jsonArray);
});

async function getText(url, type, body) {
  let myObject = await fetchData(url, type, body);
  let myText = await myObject.text();
  jsonArray = JSON.parse(myText);
  console.table(jsonArray);
  const option = document.createElement("option");
  tables.style.textTransform = "capitalize";
  option.value = jsonArray[0].index;
  option.textContent = jsonArray[0].nombre;
  option.style.textTransform = "capitalize";
  const option2 = option.cloneNode();
  option2.value = jsonArray[1].index;
  option2.textContent = jsonArray[1].nombre;
  option2.style.textTransform = "capitalize";
  tables.appendChild(option);
  tables.appendChild(option2);

  console.log(tables.selectedIndex);
  actOpc(jsonArray);
}

let body = {
  table: "GUIASCOD",
  columns: "NOGUIA,VALORCOD,FECHA_GUIA",
  conditions: {
    columns: "FECHA_GUIA,NOGUIA",
    operators: ">=,like",
    values: "20200901,%1%",
  },
};
getText("http://192.168.11.110:8080/dynamic_reports/getModel", "GET", "");

function actOpc(obj) {
  let selectedInd = tables.selectedIndex;
  if (selectedInd != -1) {
    let objSelected = obj[selectedInd];
    let columnas = objSelected.columnas.split(",");
    let indexs = objSelected.cIndexs.split(",");
    let i = 0;
    columnas.forEach((str) => {
      //console.log(`columna: ${str}| index: ${indexs[i]}`);
      chck.appendChild(input("checkbox", indexs[i], str, indexs[i]));
      chck.appendChild(label(indexs[i++], str));
    });
  }
}

let input = (tipo, id, nombre, value) => {
  const input = document.createElement("input");
  input.type = tipo;
  input.id = id;
  input.name = nombre;
  input.value = value;
  return input;
};

let label = (id, txt) => {
  const lbl = document.createElement("label");
  lbl.setAttribute("for", id);
  lbl.textContent = txt;
  return lbl;
};

