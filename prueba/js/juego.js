var configTeclado = { prevent_repeat : true };

var eventoTeclado = new window.keypress.Listener(this,configTeclado);

function pulsaA(){

console.log ("Has pulsado A");

}

eventoTeclado.simple_combo("a", pulsaA);

/*document.addEventListener('keydown', function (tecla){
  if(tecla.keyCode == 32){
    console.log('Espacio');
  }else if(tecla.keyCode == 38){
    console.log('Arriba');
  }
});*/


/*var fps = 10;
var xEscenario = 0;

function moverEscenario(){
  xEscenario++;
  console.log(xEscenario);
}

function main(){
  //console.log('fotograma');
  moverEscenario();
}
function atacar(){
  console.log("Has atacado");
}

setInterval(main, 1000/fps);*/
