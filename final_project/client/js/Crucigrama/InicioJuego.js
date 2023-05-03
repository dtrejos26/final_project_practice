

var config = {
    type: Phaser.AUTO,
    width: innerWidth,
    height: innerHeight,    
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var matriz;
var contenedor;
var contador;
var txtTiempo;
var txtContador;
var tiempoJuego;

var puntosVida;

var txtMarcador;
var txtPuntosVida;



function preload ()
{

    this.cameras.main.backgroundColor.setTo(134, 179, 0); ﻿ 
    
}

function create ()
{   

    tiempoJuego = 60

    puntosVida = 1000;

    contador = this.time.delayedCall(60000, eventoTiempo, [], this);
    txtTiempo = this.add.text(innerWidth-200, 100, "Tiempo", { fontFamily: "Arial Black", fontSize: 20, color: "#ffcc66" });
    txtTiempo.setStroke('#e69900', 16).setShadow(2, 2, "#b37700", 2, true, true);
                             
    txtContador = this.add.text(innerWidth-170, 140, tiempoJuego, { fontFamily: "Arial Black", fontSize: 20, color: "#ffcc66" });
    txtContador.setStroke('#e69900', 16).setShadow(2, 2, "#b37700", 2, true, true);
    //************ */



    txtMarcador = this.add.text(innerWidth-300, 400, "Marcador: ", { fontFamily: "Arial Black", fontSize: 20, color: "#ffcc66" });
    txtMarcador.setStroke('#e69900', 16).setShadow(2, 2, "#b37700", 2, true, true);
                             
    txtPuntosVida = this.add.text(innerWidth-150, 400, puntosVida, { fontFamily: "Arial Black", fontSize: 20, color: "#ffcc66" });
    txtPuntosVida.setStroke('#e69900', 16).setShadow(2, 2, "#b37700", 2, true, true);


    var pista01 = {

        id: 1,
        pista: "Pista de correr",
        respuesta: "CORRER"


    }

    var pista02 = {

        id: 2,
        pista: "pista de saltar",
        respuesta: "SALTAR"


    }

    var pista03 = {

        id: 3,
        pista: "pista de comer",
        respuesta: "COMER"


    }

    var pista04 = {

        id: 4,
        pista: "pista de dar",
        respuesta: "DAR"


    }

    var pista05 = {

        id: 5,
        pista: "Pista de sapo",
        respuesta: "SAPO"


    }


    

    matriz = new Matriz(this,7,7);    

    matriz.listaPistas.push(pista01,pista02,pista03,pista04)

    matriz.crearMatriz();

    matriz.validarIntersecciones();
    
    matriz.mostrarPuntos();

    matriz.acomodarPalabras();
   


    //this.data.set("Marcador", txtPuntosVida);


   
    
}

function update ()
{

    txtContador.setText(contador.getElapsedSeconds().toString().substr(0, 2).split('.').join(""));


    if(txtContador.text == 60){


        alert("Se acabo la partida \n Has perdido!")
    }

  
    
}



function eventoTiempo(){

    



}



