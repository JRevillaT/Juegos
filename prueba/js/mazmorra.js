var canvas;
var ctx;
var fps=50;

var lava = '#eb7507';
var piso = '#8a948b';
var col_llave = '#fccf03';
var salida = '#b09751';

var anchoF = 50;
var largoF = 50;

var tile_map;

var enemigo = [];
var imgAntorcha = [];

var escenario = [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                  [0,2,2,0,0,0,2,2,2,2,0,0,2,2,0],
                  [0,0,2,2,2,2,2,0,0,2,0,0,2,0,0],
                  [0,0,2,0,0,0,2,2,0,2,2,2,2,0,0],
                  [0,0,2,2,2,0,0,2,0,0,0,2,0,0,0],
                  [0,2,2,0,0,0,0,2,0,0,0,2,0,0,0],
                  [0,0,2,0,0,0,2,2,2,0,0,2,2,2,0],
                  [0,2,2,2,0,0,2,0,0,0,1,0,0,2,0],
                  [0,2,2,3,0,0,2,0,0,2,2,2,2,2,0],
                  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                ];


var jugador = function () {
  this.x = 1;
  this.y = 1;
  this.color = '#36965e';
  this.llave = false;

  this.dibuja = function () {
    ctx.drawImage(tile_map, 32, 32, 32, 32, this.x*anchoF, this.y*largoF, anchoF, largoF);
  }

  this.colisionEnemigo = function (x,y) {
    if(this.x == x && this.y == y){
      console.log("GAME OVER !!!");
      this.derrota();
    }

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
    this.x = 1;
    this.y = 1;
    this.llave = false;

    escenario [8][3] = 3;
  }

  this.derrota = function () {
    this.x = 1;
    this.y = 1;
    this.llave = false;

    escenario [8][3] = 3;
  }

  this.logicaObjetos = function(){
    var objeto = escenario [this.y][this.x];

    if(objeto == 3){
      this.llave = true;
      escenario [this.y][this.x]=2;
      console.log("Se encontro la llave");
    }
    if(objeto == 1){
      if(this.llave == true)
        this.victoria();
      else {
        console.log("Te falta la llave");
      }
    }
  }

}

var oponente = function (x,y) {
  this.x = x;
  this.y = y;

  this.direccion = Math.floor(Math.random()*4);
  this.lentitud = 50;
  this.fotograma = 0;

  this.dibuja = function () {
    ctx.drawImage(tile_map, 0, 32, 32, 32, this.x*anchoF, this.y*largoF, anchoF, largoF);
  }

  this.comprobarColision = function (x,y) {
    var colisiona = false;

    if( escenario [y][x] == 0){
      colisiona = true;
    }
    return colisiona;
  }

  this.mueve = function () {

    player.colisionEnemigo(this.x,this.y);

    if(this.contador < this.lentitud){
      this.contador++;
    }else {

      this.contador = 0;
      //Se mueve hacia arriba
      if(this.direccion == 0){
        if(this.comprobarColision(this.x, this.y-1) == false){
          this.y--;
        }else {
          this.direccion = Math.floor(Math.random()*4);
        }
      }

      //Se mueve hacia abajo
      if(this.direccion == 1){
        if(this.comprobarColision(this.x, this.y+1) == false){
          this.y++;
        }else {
          this.direccion = Math.floor(Math.random()*4);
        }
      }

      //Se mueve hacia izquierda
      if(this.direccion == 2){
        if(this.comprobarColision(this.x-1, this.y) == false){
          this.x--;
        }else {
          this.direccion = Math.floor(Math.random()*4);
        }
      }

      //Se mueve hacia derecha
      if(this.direccion == 3){
        if(this.comprobarColision(this.x+1, this.y) == false){
          this.x++;
        }else {
          this.direccion = Math.floor(Math.random()*4);
        }
      }

    }

  }
}

function dibujaEscenario() {
  for (var i = 0; i < 10 /*escenario.length*/; i++) { //Eje y
    for (var j = 0; j < 15/*escenario[i].length*/; j++) { // Eje x
      var tile = escenario [i][j];
      ctx.drawImage(tile_map, tile*32, 0, 32, 32, anchoF*j, largoF*i, anchoF, largoF);
    }
  }
}

var antorcha = function (x,y) {
  this.x = x;
  this.y = y;

  this.fotograma = 0;
  this.contador = 0;
  this.lentitud=10;

  this.cambiarFotograma = function () {
    if (this.fotograma < 3)  {
      this.fotograma++;
    }else {
      this.fotograma = 0;
    }
  }

  this.dibuja = function () {
    if(this.contador < this.lentitud)
      this.contador++;
    else {
      this.contador = 0;
      this.cambiarFotograma();
    }
    ctx.drawImage(tile_map, this.fotograma*32, 64, 32, 32, anchoF*x, largoF*y, anchoF, largoF);
  }
}

var player;

function inicializar() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  tile_map = new Image();
  tile_map.src = 'img/tilemap.png';

  dibujaEscenario();

  enemigo.push(new oponente(3, 7));
  enemigo.push(new oponente(7, 7));

  imgAntorcha.push(new antorcha(0,0));
  imgAntorcha.push(new antorcha(3,3));
  imgAntorcha.push(new antorcha(1,3));

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

  //Dibujamos al jugador principal
  player.dibuja();

  //Dibujamos a los enemigos
  for (var e = 0; e < enemigo.length; e++) {
    enemigo[e].mueve();
    enemigo[e].dibuja();
  }

  for (var a = 0; a < imgAntorcha.length; a++) {
    imgAntorcha[a].dibuja();
  }


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
