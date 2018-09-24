var tablero = new Tablero();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var offsetY = (1/2)*canvas.height;
var offsetX = 20;
var pf = -1;
var offsetX2 = (5/6)*canvas.width;
var jugador1 = new Jugador(21,1,"Juan",offsetY,offsetX,"#FF0000");
var jugador2 = new Jugador(21,2,"Pedro",offsetY,offsetX2,"#0000FF");
function mueveRaton(x,y,jugador,ctx){
  if (jugador.turno){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    tablero.dibujarGrilla();
    jugador1.dibFichaP();
    jugador2.dibFichaP();
    jugador.moverFicha(x,y,ctx,pf);
  }
}
canvas.addEventListener('mousemove',function(event){
  var x = event.clientX - canvas.getBoundingClientRect().left -1.5;
  var y = event.clientY - canvas.getBoundingClientRect().top;
  if (jugador1.turno){
      mueveRaton(x,y,jugador1,ctx); // le paso el jugador para saber que fichas voy a mover
  }
  if (jugador2.turno){
      mueveRaton(x,y,jugador2,ctx);
  }
});
canvas.addEventListener("mousedown", function(event){
    var x = event.clientX - canvas.getBoundingClientRect().left -1.5;
    var y = event.clientY - canvas.getBoundingClientRect().top;
    console.log(x,y);
    if (jugador1.misFichas(x,y)>= 0){
      console.log("1");
      jugador1.turno = true;
      pf=jugador1.misFichas(x,y);
      jugador2.turno = false;
    }else {
    if (jugador2.misFichas(x,y)>= 0){
      console.log("2");
      jugador2.turno = true;
      pf=jugador2.misFichas(x,y);
      jugador1.turno = false;
    }}
    pf=0;
});
function levantaRaton(x,y,ctx,jugador){
   if (tablero.queColumnaAmeo(x,y,ctx)>=0){
     jugador.turno=false;
     if (jugador.jugar()){
       tablero.setValor(tablero.queColumnaAmeo(x,y,ctx),tablero.getValor(tablero.queColumnaAmeo(x,y,ctx)), (jugador.numero));
       ctx.clearRect(0,0,canvas.width,canvas.height);
       tablero.dibujarGrilla();
       jugador1.dibFichaP();
       jugador2.dibFichaP();
       if (tablero.verificarVictoria(jugador.numero)){
         console.log("Ganó " + jugador.nombre);
         jugador1.turno=false;
         jugador2.turno=false;
       };
     }
  }
  else {
    console.log("ninguna columna");
    jugador.turno=false;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    tablero.dibujarGrilla();
    jugador1.dibFichaP();
    jugador2.dibFichaP();
  }


}
canvas.addEventListener('mouseup', function(event){
  var x = event.clientX - canvas.getBoundingClientRect().left -1.5;
  var y = event.clientY - canvas.getBoundingClientRect().top;
  if (jugador1.turno){
    levantaRaton(x,y,ctx,jugador1);
  }
  if (jugador2.turno){
    levantaRaton(x,y,ctx,jugador2);
  }

});

//tablero.dibujarGrilla();
