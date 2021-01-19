var list = document.getElementById("lista");
var node = document.getElementsByClassName("Element");

function allowDrop(ev) {
  ev.preventDefault();
  //console.log(ev.target)
}

function drag(ev) {
  ev.dataTransfer.setData("id", ev.target.id);
  // console.log(ev.target)
}

function drop(ev) {
  ev.preventDefault();

  let target = ev.target.firstElementChild ? ev.target : ev.target.parentNode;

  let data = ev.dataTransfer.getData("id");
  let shambles = target.firstElementChild;
  let totrans = document.getElementById(data);
  let origen = totrans.parentNode;

  console.log("tar: " + target);
  console.log("sha: " + shambles);
  console.log("tot: " + totrans);
  console.log("ori: " + origen);

  target.removeChild(shambles);
  origen.appendChild(shambles);
  target.appendChild(totrans);
}

function init() {
  document.drop = drop;
  document.allowDrop = allowDrop;
  document.drag = drag;

  var list=document.querySelector('.headers').children;
  console.log(list);
  for (const key of list) {
 //   console.log(key)
  }
  //console.log(list.values())
}
init();
