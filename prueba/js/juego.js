var canvas;
var ctx;
var fps=50;
var imgPro;

var anchoF=50;
var largoF=50;

var escenario=[[0,1,0,0,0],[0,2,0,0,0],[0,3,0,0,0],[0,4,0,0,0],[0,5,0,0,0]]

//Clases

var protagonista = function (x,y) {
  this.x = x;
  this.y = y;
  this.velocidad = 3;

  this.texto = function () {
    ctx.font = '30px impact';
    ctx.fillStyle = '#555555';
    ctx.fillText("("+this.x+", "+this.y+")", 100, 100);
  }

  this. dibuja = function () {
    ctx.drawImage(imgPro, this.x, this.y);
  }

  this.arriba = function () {
    this.y -= this.velocidad;
  }

  this.abajo = function () {
    this.y += this.velocidad;
  }

  this.izquierda= function () {
    this.x -= this.velocidad;
  }

  this.derecha = function () {
    this.x += this.velocidad;
  }
}

// Metodos

function dibujaEscenario() {
  for (var i = 0; i < escenario.length; i++) {
    for (var j = 0; j < escenario.length; j++) {
      console.log(escenario[i][j]);
    }
  }
}

var personaje = function(x,y) {
  this.x=x;
  this.y=y;
  this.derecha = true;

  this.dibuja = function () {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(this.x, this.y, 50, 50);
  }

  this.mueve = function (velocidad) {
    if(this.derecha == true){
      if (this.x < 400)
        this.x+=velocidad;
      else {
        this.derecha = false;
      }
    }else {
      if (this.x > 50)
        this.x-=velocidad;
      else {
        this.derecha = true;
      }
    }
  }
}


var personaje1 = new personaje(10, 100);
var personaje2 = new personaje(10, 200);
var personaje3 = new personaje(10, 350);
var protagonista1 = new protagonista(200, 200);



function inicializar() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  imgPro= new Image();
  imgPro.src = 'img/dino.png';

  dibujaEscenario();

  setInterval(function () {
    main();
  }, 1000/fps);
}


function main() {
  borraCanvas();
  personaje1.dibuja();
  personaje2.dibuja();
  personaje3.dibuja();
  protagonista1.dibuja();
  protagonista1.texto();

  personaje1.mueve(1);
  personaje2.mueve(5);
  personaje3.mueve(10);
  //console.log("Funcion");
}

document.addEventListener('keydown', function(tecla){
  if(tecla.keyCode == 38){ //mover hacia arriba
    protagonista1.arriba();
  }
  if(tecla.keyCode == 40){ //mover hacia abajo
    protagonista1.abajo();
  }
  if(tecla.keyCode == 37){ //mover hacia la izquierda
    protagonista1.izquierda();
  }
  if(tecla.keyCode == 39){ //mover hacia la derecha
    protagonista1.derecha();
  }
});

function borraCanvas() {
  canvas.width = 500;
  canvas.height = 400;
}


/*var miCanvas;

function inicializar() {
  miCanvas = document.getElementById('canvas')
  miCanvas.addEventListener('mousedown', clicRaton, false);
  miCanvas.addEventListener('mouseup', sueltaRaton, false);
  miCanvas.addEventListener('mousemove', movimientoRaton, false);

}

function clicRaton(e){
  console.log("Pulso en el canvas");
}

function sueltaRaton(e){
  console.log("Solto el mouse en el canvas");
}

function movimientoRaton(e){
  var x=e.pageX;
  var y=e.pageY;
  console.log("Mouse moviendose  pos "+x+","+y);
}*/


/*var configTeclado = { prevent_repeat : true };

var eventoTeclado = new window.keypress.Listener(this,configTeclado);

function pulsaA(){

console.log ("Has pulsado A");

}
function pulsaB(){

console.log ("Has pulsado B");

}
function pulsaCombo(){
console.log ("Has activado el ataque especial");
}

eventoTeclado.simple_combo("a", pulsaA);
eventoTeclado.simple_combo("b", pulsaB);
eventoTeclado.sequence_combo("up down a b", pulsaCombo);*/

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
