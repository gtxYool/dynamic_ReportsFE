import getText from "../Generator.js";

var base, randomized, dragging, draggedOver;

console.table('voy a llamar al getText hhehe!');
var jsonArray = getText("GET", "", undefined).then();

let columnas = function (json) {
  let cols = json.columnas.split(",");
  let indxs = json.cIndexs.split(",");
  let ctypes = json.cTypes.split(",");
  let cdesc = json.cDes.split("|");

  let objCols = {};
  for (let i = 0; i < cols.length; i++) {
    objCols[i].nombre = cols[i];
    objCols[i].index = indxs[i];
    objCols[i].tipo = ctypes[i];
    objCols[i].descripcion = cdesc[i];
  }
  return objCols;
};

const rederItems = (data) => {
  list.innerText = "";
  data.forEach((item) => {
    var node = document.createElement("label");
    node.draggable = true;
    node.addEventListener("drag", setDragging);
    node.addEventListener("dragover", setDraggedOver);
    node.addEventListener("drop", compare);
    node.innerText = item;
    list.appendChild(node);
  });
};

const setDragging = (e) => {
  dragging = e.target.dataset.key;
};

function setDraggedOver(e) {
  e.preventDefault();
  draggedOver = e.target.dataset.key;
}

const Order = (ev) => {
  var indx1 = list.indexOf(dragging);
  var indx2 = list.indexOf(draggedOver);

  list.splice(indx1, 1);
  list.splice(indx2, 0, draggedOver);

  //rederItems(list);

};
  console.log(columnas(jsonArray));