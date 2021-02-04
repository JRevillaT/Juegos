var fps = 10;
var xEscenario;

function moverEscenario(){
  xEscenario++;
  console.log(xEscenario);
}

function main(){
  console.log('fotograma');
}
function atacar(){
  console.log("Has atacado");
}

setInterval(main, 1000/fps);
