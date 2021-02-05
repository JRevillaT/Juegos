var canvas;
var ctx;
var fps=50;

var lava = '#eb7507';
var piso = '#8a948b';
var col_llave = '#fccf03';
var salida = '#b09751';

var anchoF = 50;
var largoF = 50;

var escenario = [ [1,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
                  [1,0,0,0,1,1,1,1,1,0,0,0,1,1,1],
                  [1,1,1,1,1,0,0,1,1,1,1,1,1,0,0],
                  [0,0,1,0,1,0,0,1,0,1,0,0,1,0,1],
                  [0,0,1,0,1,0,1,1,1,1,0,0,1,1,1],
                  [0,0,1,0,1,0,1,0,0,1,0,0,0,1,0],
                  [1,1,1,0,1,0,1,0,0,1,0,0,2,1,0],
                  [0,0,1,1,1,0,3,0,0,1,0,0,0,1,1],
                  [0,0,1,0,0,0,0,0,0,1,1,1,0,0,1],
                  [1,1,1,0,0,0,0,0,0,1,0,0,0,0,1]
                ];


var jugador = function () {
  this.x = 0;
  this.y = 9;
  this.color = '#36965e';
  this.llave = false;

  this.dibuja = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x*anchoF, this.y*largoF, anchoF, largoF);
  }

  this.arriba = function () {
    if(this.margenes(this.x, this.y-1 ) == false /*|| (this.y-1)*anchoF < 0*/)
      this.y--;
      console.log(this.x+", "+this.y);
      this.logicaObjetos();
  }

  this.abajo = function () {
    if(this.margenes(this.x, this.y+1 ) == false)
      this.y++;
      console.log(this.x+", "+this.y);
      this.logicaObjetos();
  }

  this.izquierda= function () {
    if(this.margenes(this.x-1, this.y ) == false)
      this.x--;
      console.log(this.x+", "+this.y);
      this.logicaObjetos();
  }

  this.derecha = function () {
    if(this.margenes(this.x+1, this.y ) == false)
      this.x++;
      console.log(this.x+", "+this.y);
      this.logicaObjetos();
  }

  this.margenes = function (x,y) {
    var colision = false;
    if(y >= escenario.length || y < 0 || x>=escenario[0].length || x < 0)
      colision = true;
    else if(escenario[y][x] == 0){
      colision = true;
    }
    return colision;
  }

  this.victoria = function () {
    console.log("HAS GANADO!!!");
    this.x = 0;
    this.y = 9;
    this.llave = false;

    escenario [6][12] = 2;
  }

  this.logicaObjetos = function(){
    var objeto = escenario [this.y][this.x];

    if(objeto == 2){
      this.llave = true;
      escenario [this.y][this.x]=1;
      console.log("Se encontro la llave");
    }
    if(objeto == 3){
      if(this.llave == true)
        this.victoria();
      else {
        console.log("Te falta la llave");
      }
    }
  }

}

function dibujaEscenario() {
  var color;
  for (var i = 0; i < escenario.length; i++) {
    for (var j = 0; j < escenario[i].length; j++) {
      //console.log(escenario[i][j]);
      if(escenario [i][j] == 0){
        color = lava
      }else if(escenario [i][j] == 1){
        color = piso;
      }else if(escenario [i][j] == 2){
        color = col_llave;
      }else if(escenario [i][j] == 3){
        color = salida;
      }
      ctx.fillStyle = color;
      ctx.fillRect(j*anchoF, i*largoF, anchoF, largoF);
    }
  }
}

var player;

function inicializar() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  dibujaEscenario();

   player = new jugador();
   document.addEventListener('keydown', function (tecla) {

   });

  setInterval(function () {
    main();
  }, 1000/fps);
}

function main() {
  borraCanvas();
  dibujaEscenario();
  player.dibuja();

}

document.addEventListener('keydown', function(tecla){
  if(tecla.keyCode == 38 || tecla.keyCode == 87 ){ //mover hacia arriba
    player.arriba();
  }
  if(tecla.keyCode == 40 || tecla.keyCode == 83){ //mover hacia abajo
    player.abajo();
  }
  if(tecla.keyCode == 37 || tecla.keyCode == 65){ //mover hacia la izquierda
    player.izquierda();
  }
  if(tecla.keyCode == 39 || tecla.keyCode == 68){ //mover hacia la derecha
    player.derecha();
  }
});

function borraCanvas() {
  canvas.width = 750;
  canvas.height = 500;
}
