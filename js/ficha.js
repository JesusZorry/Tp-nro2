function Ficha (paramPosX, paramPosY, paramColor,diametro){
  this.PosX = paramPosX;
  this.PosY = paramPosY;
  this.color = paramColor;
  this.radio = (diametro/2);
}
Ficha.prototype.setColor = function(color){
  this.color=color;
}
Ficha.prototype.circulodib = function (ctx){
  ctx.fillStyle = this.color;
  // var img = new Image();
  // img.src = "imagenes/horda.png";
  // ctx.beginPath();
  // var imgx =this.PosX ;
  // var imgy= this.PosY;
  // img.onload = function(){
  //
  //
  //   ctx.drawImage(img,imgx,imgy,68,68);
  // }
  // ctx.closePath();
  // ctx.stroke();

  ctx.beginPath();
  M = Math.floor ((Math.sqrt(((this.radio*2)*(this.radio*2)) + ((this.radio*2)*(this.radio*2))))/2)-12;
  ctx.arc(M+this.PosX,M+this.PosY,this.radio, 0, Math.PI *2);
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
}
Ficha.prototype.dibFichaMov = function (x,y,ctx){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(x,y,this.radio, 0, Math.PI *2);
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
}
Ficha.prototype.seleccion = function (x,y,ficha) { // triangula la posicion, para saber asi si el click fue o no en su ficha
  var hipotenusa = Math.floor(Math.sqrt(((x - ficha.PosX) * (x - ficha.PosX)) + ((y - ficha.PosY) * (y - ficha.PosY))));
  if ((hipotenusa) <= (ficha.radio)){
    return true;
  } else {
    return false;
  }

};
