

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

var listaPalabrasSeleccionadasCo = [];
var listaPalabrasSeleccionadasIn = [];


var listaLetrasSeleccionadas = [];

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





    matriz = new Matriz(this,14,14,0,50, 1);    

    matriz.crearMatriz();
   


    this.data.set("Marcador", txtPuntosVida);


    this.input.on('gameobjectdown', function (pointer, gameObject) {
    
       matriz.validarSeleccion(gameObject);

       if(gameObject.data.list["Correcto"]){

            txtPuntosVida.text = Number(txtPuntosVida.text) + 100;

       }else{


            txtPuntosVida.text = Number(txtPuntosVida.text) - 100;

            if(txtPuntosVida.text <= 0){

                alert("Te has quedado sin puntos \n Has perdido!");

            }
       }


    });
    
}

function update ()
{

    txtContador.setText(contador.getElapsedSeconds().toString().substr(0, 2).split('.').join(""));


    if(txtContador.text == 60){


        alert("Se acabo la partida \n Has perdido!")
    }

    //tacharPalabrasSeleccionadas();
    
}



function eventoTiempo(){

    



}



