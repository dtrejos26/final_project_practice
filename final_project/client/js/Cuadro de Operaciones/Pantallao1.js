
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
var grid = [];

var marcadorJuego;
var tiempoJuego;

var contadorTiempo;
var txtMarcador;
var txtTiempo;

var operaciones = [];


var filasMat;
var columnasMat;
var acumulador = 0;

var listaNumeros = [];
var listaOperaciones = [];
var stringOperacion = "";


function preload ()
{
    this.cameras.main.backgroundColor.setTo(255,255,255); ﻿ 

    
    
}

function create ()
{
    var Matriz = new Phaser.Class({

        
       
        initialize:

        function Matriz (pantalla)
        {
            

            filasMat = 4;
            columnasMat = 4;
            
            operaciones = ["+", "-", "*", "/"];


            iniNumero = 1;
            finNumero = 10;

            tiempoJuego = 1000;    // segundos
            marcadorJuego = 1000;

            marcadorPantalla = pantalla.add.text(innerWidth/2 -150 , innerHeight-100,'', { font: '40px Arial', fill: '#ffcc66' });
            marcadorPantalla.setText([

                    "Marcador: " + marcadorJuego
                
                ]);




            
            txtTiempo = pantalla.add.text(innerWidth/2-20 , 20, '', { font: '40px Arial', fill: '#00aaff' });
            txtTiempo.setText([
    
                tiempoJuego 
                    
            ]);


           

            contadorTiempo = pantalla.time.addEvent({ delay: 10});
           
            
            
            var distancia = 100;

             
                           
            
            var listaCorrectas = pantalla.add.text(5, 5, '', { font: '15px Arial', fill: '#00ff00' });
            listaCorrectas.setText([

                "Busca los numeros correctos para llegar a tu destino!"+ "\n" + "Los numeros van de 1 en 1" 
                
            ]);
                            
            contenedor = pantalla.add.container(5, 5, [ listaCorrectas]);
            
            


            crearMatriz(pantalla);            
            crearOperacionesColumnas(); 
            crearOperacionesFilas();    
            limpiarMatriz(pantalla);
            
            

            pantalla.input.on('gameobjectdown', function (pointer, gameObject) {

                                
                
                

                gameObject.setStroke('#669900', 5)
               
                    
            });

        }         
            
              

                

    });
/*
    var marcador = new Phaser.Class({

        initialize:

        function marcador (scene, x, y)
        {
            
        },

    }); 
    
    var contenedor = new Phaser.Class({

        initialize:

        function contenedor (scene, x, y)
        {
            
        },

    });  
*/


     matriz = new Matriz(this, filasMat, columnasMat);
}

function update ()
{
    
    if(txtTiempo.text > 0){

        txtTiempo.text -= contadorTiempo.getElapsedSeconds();

    }else{

        txtTiempo.text = "0";
        alert("SE ACABO EL TIEMPO. /n PERDISTES LA PARTIDA!");
    }

    


}



function crearMatriz(parPantalla){



    for (var x = 0; x < filasMat; x++){
            
        grid[x] = [];

        for (var y = 0; y < columnasMat; y++){

            var sx = innerWidth/2 - (36*7) + (x * 36*2);
            var sy = innerHeight/2 - (36*7) + (y * 36*2);
            var numero = Phaser.Math.Between(iniNumero, finNumero);
           
            
            var configTexto = {
                x: sx,
                y: sy,
                text: numero,
                padding: {
                    x: 5,
                    y: 5
                },
                style: {
                    fontSize: '16px',
                    fontFamily: 'Arial Black',
                    color: '#88cc00',
                    align: 'center',                   
                    shadow: {
                        color: '#cc6600',
                        fill: true,
                        offsetX: 1,
                        offsetY: 1
                        
                    },
                    stroke: {

                        color: "e69900",
                        thickness: "2px",
                        fill: true,
                        
                    }
                }
            };

            var texto = parPantalla.make.text(configTexto);

           

            texto.setInteractive();
            texto.setData('Numero', numero);
            texto.setData('x', x);  
            texto.setData('y', y);

                        
            grid[x][y] = texto;


          

            acomodarOperaciones(texto, sx, sy, parPantalla);
           
            
        }

    }



    grid[filasMat-1][columnasMat-1].text = "";

    
   

}

function crearOperacion(x, y, pantalla){


    var operacionAzar = Phaser.Math.Between(0, 3);
    var tipoOperacion = pantalla.add.text(x, y, operaciones[operacionAzar], { fontFamily: "Arial Black", fontSize: 20, color: "#ffcc66", align: 'center' });
        tipoOperacion.setStroke('#e69900', 1).setShadow(1, 1, "#b37700", 2, true, true);


    return tipoOperacion;
}

function crearIgualad(x, y, pantalla){


    var tipoOperacion = pantalla.add.text(x, y, "=" ,{ fontFamily: "Arial Black", fontSize: 20, color: "#ffcc66", align: 'center' });
            tipoOperacion.setStroke('#e69900', 1).setShadow(1, 1, "#b37700", 2, true, true);


}


function acomodarOperaciones(texto, x, y, pantalla){


    try {
        
        if(texto.data.list["x"] == 0 && texto.data.list["y"] == 0){

    
        
            texto.setData('OperacionDer',crearOperacion(x+46, y+10, pantalla));
            texto.setData('OperacionAba',crearOperacion(x+10, y+36, pantalla));
            texto.setData("Primero", true);
    
    
    
        }else if(texto.data.list["y"] == columnasMat-1 && texto.data.list["x"] < columnasMat-1){

            
            texto.setData('IgualdadArr', crearIgualad(x+5, y-20, pantalla));
            texto.removeInteractive();

        }else if(texto.data.list["x"] == columnasMat-1 && texto.data.list["y"] >= 0  && texto.data.list["y"] < filasMat-1){


            texto.setData('IgualdadIzq', crearIgualad(x-20, y+5, pantalla));
            texto.removeInteractive();

        }else if(texto.data.list["x"] > 0 && texto.data.list["y"] == 0 && texto.data.list["x"] < filasMat-2){


            texto.setData('OperacionAba', crearOperacion(x+10, y+36, pantalla));
            texto.setData('OperacionDer',crearOperacion(x+46, y+10, pantalla));

        }else if(texto.data.list["x"] > 0 && texto.data.list["y"] == columnasMat-2 && texto.data.list["x"] < filasMat-2){

            texto.setData('OperacionDer', crearOperacion(x+46, y+10, pantalla));

        }else if(texto.data.list["x"] > 0 && texto.data.list["y"] > 0 && texto.data.list["x"] < filasMat-2 && texto.data.list["y"] < filasMat-2){


            texto.setData('OperacionDer',crearOperacion(x+46, y+10, pantalla));
            texto.setData('OperacionAba',crearOperacion(x+10, y+36, pantalla));

        }else if(texto.data.list["y"] < columnasMat-2 && texto.data.list["x"] == 0  && texto.data.list["y"] > 0){

            
            texto.setData('OperacionAba',crearOperacion(x+10, y+36, pantalla));
            texto.setData('OperacionDer',crearOperacion(x+46, y+10, pantalla));

        }else if (texto.data.list["y"] == columnasMat-2 && texto.data.list["x"] == 0){

            texto.setData('OperacionDer',crearOperacion(x+46, y+10, pantalla));

        }else if(texto.data.list["y"] < columnasMat-2 && texto.data.list["x"] == columnasMat-2  && texto.data.list["y"] >= 0){

            texto.setData('OperacionAba',crearOperacion(x+10, y+36, pantalla));


        }



    } catch (error) {


        console.log(error);
        
    }

    

    

}




function crearOperacionesColumnas(){

  



    for (var x = 0; x < filasMat-1; x++){
            
      

        for (var y = 0; y < columnasMat-1; y++){


            if(y < filasMat-2){                
                

                
                listaOperaciones.push(grid[x][y].data.list["OperacionAba"].text);

                
               // tipoOperacionCampoColumnas(grid[x][y], grid[x][filasMat-1]);

            }       
                

                listaNumeros.push(grid[x][y].data.list["Numero"]);

               
            
        }


            

            validarOperaciones();
            grid[x][filasMat-1].text = eval(stringOperacion);
                
           
            
            
            
           
            listaNumeros = [];
            listaOperaciones = [];
            stringOperacion = "";


       
        
    }

    listaNumeros = [];
    listaOperaciones = [];
    stringOperacion = "";
    
}



function crearOperacionesFilas(){

  



    for (var x = 0; x < filasMat-1; x++){
            
      

        for (var y = 0; y < columnasMat-1; y++){

            console.log(x + " " + y);

            if(grid[y][x].data.list["x"] < filasMat-2){                
                

                
                listaOperaciones.push(grid[y][x].data.list["OperacionDer"].text);

                
               // tipoOperacionCampoColumnas(grid[x][y], grid[x][filasMat-1]);

            }       
                

                listaNumeros.push(grid[y][x].data.list["Numero"]);

               
            
        }


            

            validarOperaciones();
            grid[filasMat-1][x].text = eval(stringOperacion);
                
           
            
            
            
           
            listaNumeros = [];
            listaOperaciones = [];
            stringOperacion = "";


       
        
    }

    listaNumeros = [];
    listaOperaciones = [];
    stringOperacion = "";
    
}



function validarOperaciones(){

    
    console.log("Tamaño listta: "+ listaNumeros.length);
    for (var x = 0; x < listaNumeros.length-1; x++){

     

        try {
           
           
            stringOperacion += listaNumeros[x].toString() + " " + listaOperaciones[x].toString() + " ";

            
            
    
    
            
        } catch (error) {
    
            console.log(error);
            
        }

        
           
    }

    stringOperacion += listaNumeros[listaNumeros.length-1].toString(); 
    

    console.log(stringOperacion);


}




function limpiarMatriz(parPantalla){

    for (var x = 0; x < filasMat-1; x++){
            
      

        for (var y = 0; y < columnasMat-1; y++){


            grid[x][y].text = "";

            var sx = innerWidth/2 - (36*7) + (x * 36*2);
            var sy = innerHeight/2 - (36*7) + (y * 36*2);


            var grafico = parPantalla.add.graphics();
            var cuadro = new Phaser.Geom.Rectangle(sx, sy, 36, 36);
            

            grafico.lineStyle(1);
            grafico.strokeRectShape(cuadro);
           

           
        }        
      
       
    }


    
}


function colocarCuadros(parPantalla){


    

    for (var x = 0; x < filasMat-1; x++){
            
      

        for (var y = 0; y < columnasMat-1; y++){

            
           

            
            
        }        
      
       
    }


}