function Jugador(NumJ, Name,offsetY,offsetX,color){
  this.fichas = new Array(21);
  this.turno = false;
  this.numero = NumJ;
  this.nombre = Name;
  this.color = color;
  this.osX = offsetX;
  this.osY= offsetY;
  this.dibFichaP();
}
Jugador.prototype.dibFichaP = function (){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');
  for (var i = 0; i < this.fichas.length; i++) {
    if (i < 10 ) {
      this.fichas[i] = new Ficha(this.osX,this.osY+i*30,this.color,30);
      this.fichas[i].circulodib(ctx);
    }
    else {
      this.fichas[i] = new Ficha(this.osX+60,this.osY+(i-11)*30,this.color,30);
      this.fichas[i].circulodib(ctx);
    }

  }

}
Jugador.prototype.moverFicha = function(x,y,ctx,ficha) {
  this.fichas[ficha].dibFichaMov(x,y,ctx);

};
Jugador.prototype.misFichas = function (x,y) { // devuelve true en caso de que el click sea en una de sus fichas
  for (var i = 0; i < this.fichas.length; i++) {
    if (this.fichas[i].seleccion(x,y,this.fichas[i])){
          return i;
    }
  }
  return -1;
};
Jugador.prototype.jugar = function (){
    if (this.fichas.length > 0){
      index = this.fichas.length;
      this.fichas.splice(this.fichas[index], 1);
      this.dibFichaP();
          return true;

  }
  return false;
};
