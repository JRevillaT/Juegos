var canvas;
var ctx;
var fps=50;

var lava = '#eb7507';
var piso = '#8a948b';

var anchoF = 50;
var largoF = 50;

var escenario = [ [1,1,0,0,0,0,0,1,0,0],
                  [1,0,0,0,1,1,1,1,1,0],
                  [1,1,1,1,1,0,0,1,1,1],
                  [0,0,1,0,1,0,0,1,0,1],
                  [0,0,1,0,1,0,1,1,1,1],
                  [0,0,1,0,1,0,1,0,0,1],
                  [1,1,1,0,1,0,1,0,0,1],
                  [0,0,1,1,1,0,0,0,0,1],
                  [0,0,1,0,0,0,0,0,0,1],
                  [1,1,1,0,0,0,0,0,0,1]
                ];


var jugador = function () {
  this.x = 1;
  this.y = 1;
  this.color = '#eff216';

  this.dibuja = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x*anchoF, this.y*largoF, anchoF, largoF);
  }

  this.arriba = function () {
    if(this.margenes(this.x, this.y-1 ) == false /*|| (this.y-1)*anchoF < 0*/)
      this.y--;
      console.log(this.x+", "+this.y);
  }

  this.abajo = function () {
    if(this.margenes(this.x, this.y+1 ) == false)
      this.y++;
      console.log(this.x+", "+this.y);
  }

  this.izquierda= function () {
    if(this.margenes(this.x-1, this.y ) == false)
      this.x--;
      console.log(this.x+", "+this.y);
  }

  this.derecha = function () {
    if(this.margenes(this.x+1, this.y ) == false)
      this.x++;
      console.log(this.x+", "+this.y);
  }

  this.margenes = function (x,y) {
    var colision = false;
    if(x >= escenario.length || x < 0 || y>=escenario[0].length || y < 0)
      colision = true;
    else if(escenario[y][x] == 0){
      colision = true;
    }
    return colision;
  }

}

function dibujaEscenario() {
  var color;
  for (var i = 0; i < escenario.length; i++) {
    for (var j = 0; j < escenario.length; j++) {
      //console.log(escenario[i][j]);
      if(escenario [i][j] == 0){
        color = lava
      }else if(escenario [i][j] == 1){
        color = piso;
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
  canvas.width = 500;
  canvas.height = 500;
}
