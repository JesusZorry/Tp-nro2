var columnas = 7;
var filas = 6;
function Tablero(){
  this.Matrix = new Array(columnas);
  for (var i = 0; i < this.Matrix.length; i++) {
    this.Matrix[i] = new Array(filas);
    for (var j = 0; j < this.Matrix[i].length; j++) {
      this.Matrix[i][j] = 0;
    }
  }
}

Tablero.prototype.cargarTablero = function (x, y, ctx, offsetX, offsetY, celda){
var ficha = new Ficha((x*celda)+offsetX,(y*celda)+offsetY,"#000000",celda);
  if (this.Matrix[x][y] == 1) {
    ficha.setColor("#FF0000");
    ficha.circulodib(ctx);
  }
  else if (this.Matrix[x][y] == 2){
    ficha.setColor("#0000FF");
    ficha.circulodib(ctx);
  }
  else {
      ficha.setColor("#FFFFFF")
      ficha.circulodib(ctx);
  }
}
Tablero.prototype.queColumnaAmeo = function (x,y) {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');
  var celda = ((2/3)*ctx.canvas.height)/filas;
  var offsetX = (1/4)*ctx.canvas.width;
  var offsetY = (1/3)*ctx.canvas.height-10;
  for (var col = 0; col < columnas; col++) {
        if ((((col*celda)+offsetX)<= x && ((col+1)*celda)+ offsetX >= x) && (offsetY>= y)){
            return col;
        }
  }
  return -1;
};
Tablero.prototype.dibujarGrilla = function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var celda = ((2/3)*ctx.canvas.height)/filas;
    var offsetX = (1/4)*ctx.canvas.width;
    var offsetY = (1/3)*ctx.canvas.height-10;//se le resta 10 para que los circulos queden separados del borde
      for (var x = 0; x <= columnas; x++) {
          for (var y = 0; y <= filas; y++) {
             if ((x<columnas)&&(y<filas)) {
                this.cargarTablero(x,y,ctx,offsetX,offsetY,celda);
            }

        }
    }
};

Tablero.prototype.setValor = function (x,y,valor){
  //ubica la ficha
if ((x < columnas) && (y < filas)) {
      this.Matrix[x][y] = valor;
  }
  else {
    console.log ("No anda");
  }
};

Tablero.prototype.getPosi = function (x){
  //calcula el ultimo espacio libre de la columna
   for (y = filas-1; y < this.Matrix[x].length; y--) {
     if (y< 0){return -1}; // en caso de que la grilla este llena
    if (this.Matrix[x][y] == 0){
        return y;
      }
    }
    return -1;
  };
Tablero.prototype.reiniciar = function () {
  for (var i = 0; i < this.Matrix.length; i++) {
    this.Matrix[i] = new Array(filas);
    for (var j = 0; j < this.Matrix[i].length; j++) {
      this.Matrix[i][j] = 0;
    }
  }
};
Tablero.prototype.verificarVictoria = function(jugador){ //El valor del jugador 1, 2
  for (x = 0; x < this.Matrix.length; x++) {
    for (i = 0; i < this.Matrix[x].length; i++) {
      if ((this.Matrix[i][x] == jugador) && (i < this.Matrix.length -3) ){ //
          if ((this.Matrix[i+1][x] == jugador) && (this.Matrix[i+2][x] == jugador) && (this.Matrix[i+3][x] == jugador)) {
            return true;
          }
      }
    }
  }
  for (x = 0; x < this.Matrix.length; x++) {
    for (i = 0; i < this.Matrix[x].length; i++) {
      if ((this.Matrix[x][i] == jugador) && (i+3 < this.Matrix[x].length)){
        if ((this.Matrix[x][i+1] == jugador) && (this.Matrix[x][i+2] == jugador) && (this.Matrix[x][i+3] == jugador)){
          return true;
        }
      }
    }
  }
  return false;
}
