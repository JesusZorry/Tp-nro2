var tablero = new Tablero();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var offsetY = (1/2)*canvas.height;
var offsetX = 20;
var pf = -1;
var offsetX2 = (5/6)*canvas.width;
var jugando = false;
var jugador1 = new Jugador(1,"Jugador1",offsetY,offsetX,"#FF0000");
var jugador2 = new Jugador(2,"Jugador2",offsetY,offsetX2,"#0000FF");
function empate(){
  document.getElementById("main").className = "row d-none";
  document.getElementById('intro').className = "container d-all";
  document.getElementById('gz').innerHTML = "¡¡¡¡BUUUUUU EMPAATEEEEEE !!!!";
  document.getElementById('comenzar').innerHTML = "Revancha!";

}
function ganador(jugador) {
  document.getElementById("main").className = "row d-none";
  document.getElementById('intro').className = "container d-all";
  document.getElementById('gz').innerHTML = "¡¡¡¡Felicitaciones " + jugador.nombre + "!!!!";
  document.getElementById('comenzar').innerHTML = "Revancha!";
}
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
  if (jugando){
    if (jugador1.turno){
        mueveRaton(x,y,jugador1,ctx);
    }
    if (jugador2.turno){
        mueveRaton(x,y,jugador2,ctx);
    }
  }

});
canvas.addEventListener("mousedown", function(event){
    var x = event.clientX - canvas.getBoundingClientRect().left -1.5;
    var y = event.clientY - canvas.getBoundingClientRect().top;
    if((jugador1.misFichas(x,y)>= 0)&& (jugador1.turno)){
      pf=jugador1.misFichas(x,y);
      jugando = true;
    }else{
    if ((jugador2.misFichas(x,y)>= 0)&& (jugador2.turno)){

      pf=jugador2.misFichas(x,y);
      jugando = true;
    }}
    pf=0;
});
function levantaRaton(x,y,ctx,jugador){
   if ((tablero.queColumnaAmeo(x,y,ctx)>=0)&&(tablero.getPosi(tablero.queColumnaAmeo(x,y,ctx)) >= 0)){
     jugador.turno=false;
     if (jugador.jugar()){
       tablero.setValor(tablero.queColumnaAmeo(x,y,ctx),tablero.getPosi(tablero.queColumnaAmeo(x,y,ctx)), (jugador.numero));
       ctx.clearRect(0,0,canvas.width,canvas.height);
       tablero.dibujarGrilla();
       jugador1.dibFichaP();
       jugador2.dibFichaP();
       tablero.verificarDiagonales(jugador.numero);
       if (tablero.verificarVictoria(jugador.numero)){
         jugador1.turno=false;
         jugador2.turno=false;
         ganador(jugador);
       };
     }
      if (jugador.numero == 1){
        jugador2.turno=true;
      }else{
          jugador1.turno=true;
      }
  }
  else {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    tablero.dibujarGrilla();
    jugador1.dibFichaP();
    jugador2.dibFichaP();
  }
  jugando = false;
  if ((jugador1.fichas.length <= 0) && (jugador2.fichas.length <=0)){
    empate();
  }

}
canvas.addEventListener('mouseup', function(event){
  var x = event.clientX - canvas.getBoundingClientRect().left -1.5;
  var y = event.clientY - canvas.getBoundingClientRect().top;
  if (jugando){
    if (jugador1.turno){
      levantaRaton(x,y,ctx,jugador1);
    }else{
    if (jugador2.turno){
      levantaRaton(x,y,ctx,jugador2);
    }}
  }


});
function mostrar(){
    document.getElementById("main").className = "row d-all";
    document.getElementById('intro').className = "container d-none";
    jugador1.turno=true;
    if ( document.getElementById('comenzar').innerHTML == "Revancha!"){
      tablero.reiniciar();
      tablero.dibujarGrilla();
      jugador1 = new Jugador(1,"Jugador1",offsetY,offsetX,"#FF0000");
      jugador2 = new Jugador(2,"Jugador2",offsetY,offsetX2,"#0000FF");
      jugador1.turno=true;
      document.getElementById('gz').innerHTML = "";
    }

}
var visible = document.getElementById("test");
visible.addEventListener("click",mostrar);
tablero.dibujarGrilla();
