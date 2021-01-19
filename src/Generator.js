import fetchData from "../src/util/fetchData.js";

const chck = document.querySelector(".checklist");
const mySslides = document.getElementsByClassName("mySlides");
const row = document.getElementsByClassName("row").item(0);
const URL = "http://192.168.11.110:8080/dynamic_reports/getModel";
let jsonArray, boxCtrl;

/*
tables.addEventListener("change", (event) => {
  while (chck.hasChildNodes()) {
    chck.removeChild(chck.lastChild);
  }
  actOpc(jsonArray);
});
*/
const getText = async (type, body, url = URL) => {
  let myObject = await fetchData(url, type, body);
  let myText = await myObject.text();
  jsonArray = JSON.parse(myText);
  console.table('ozas llamarme!');
  getCards(jsonArray);
  boxCtrl = new boxControl();
  boxCtrl.showSlides(1);
  window.plusSlides = plusSlides;
  window.currentSlide = currentSlide;
  window.jsonArray = jsonArray;
  return jsonArray;
  //actOpc(jsonArray);
};

let body = {
  table: "GUIASCOD",
  columns: "NOGUIA,VALORCOD,FECHA_GUIA",
  conditions: {
    columns: "FECHA_GUIA,NOGUIA",
    operators: ">=,like",
    values: "20200901,%1%",
  },
};

function getCards(obj) {
  let size = obj.length;
  let i = 1;
  for (const tbl of obj) {
    if (mySslides && mySslides.length > 0) {
      const cont = mySslides.item(0);
      let nombre = tbl.nombre;
      let index = tbl.index;
      let desc = tbl.des;
      let columnas = tbl.columnas.split(",");
      let cIndexs = tbl.cIndexs.split(",");
      let cDes = tbl.cDes.split("|");
      let cTypes = tbl.cTypes.split(",");
      let card = cardTable(nombre, index, desc);
      card.appendChild(numberText(i, size));
      cont.appendChild(card);
      row.appendChild(addMiniatura(nombre, i++, desc));
    } else {
      break;
    }
  }
}

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

let numberText = (index, total) => {
  let nmbtxt = document.createElement("div");
  nmbtxt.className = "numbertext";
  nmbtxt.textContent = index + "/" + total;
  return nmbtxt;
};

let cardTable = (nombre, key, desc) => {
  let tbl = document.createElement("div");
  tbl.className = "Etable";
  tbl.id = key;
  tbl.dataset.desc = desc;
  tbl.appendChild(titleTbl(nombre));
  return tbl;
};

let titleTbl = (nombre) => {
  let title = document.createElement("a");
  title.className = "title";
  //title.onclick = SelectColumns;
  title.textContent = nombre;
  return title;
};

function addMiniatura(nombre, key, desc) {
  let column = document.createElement("div");
  column.className = "column";
  let mini = document.createElement("div");
  mini.classList.add("demo", "cursor");
  mini.style = "width:100%";
  mini.dataset.desc = desc;
  mini.setAttribute("onclick", `currentSlide(${key})`);
  mini.textContent = nombre;
  column.appendChild(mini);
  return column;
}
// Next/previous controls
function plusSlides(n) {
  boxCtrl.showSlides((boxCtrl.slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  boxCtrl.showSlides((boxCtrl.slideIndex = n));
}
class boxControl {
  constructor() {
    this.slideIndex = 1;
  }

  showSlides(n) {
    var i;
    var tables = document.getElementsByClassName("Etable");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > tables.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = tables.length;
    }
    for (i = 0; i < tables.length; i++) {
      tables[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    tables[this.slideIndex - 1].style.display = "flex";
    dots[this.slideIndex - 1].className += " active";
    captionText.innerHTML = dots[this.slideIndex - 1].dataset.desc;
  }
}

export default getText;