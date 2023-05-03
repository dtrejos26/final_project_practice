
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
var listaLetras = [];
var grid = [];
var palabrasCorrectas = [];
var palabrasIncorrectas = [];
var marcadorJuego;
var tiempoJuego;
var abecedario;


var contadorTiempo;
var txtMarcador;
var txtTiempo;

var posiblesDirecciones = [];
var direcciones = 1;

var filasMat;
var columnasMat;


var contenedor;

function preload ()
{
    this.cameras.main.backgroundColor.setTo(255,255,255); ﻿ 

    
    //this.load.glsl('test', 'Animaciones/bacteria.frag');
}

function create ()
{
    var Matriz = new Phaser.Class({

        
       
        initialize:

        function Matriz (pantalla, filas, columnas)
        {
            

            filasMat = 14;
            columnasMat = 14;
            //pantalla.add.shader('test', 400, 300, 800, 600);


            abecedario = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U",
            "V","W","X","Y","Z"];
        
            palabrasCorrectas = ["CORRER", "PEZ", "SALTAR"];
            palabrasIncorrectas = ["GATO", "PERRO","PEZ"]

            tiempoJuego = 500;    // segundos
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
            for (var x = 0; x < palabrasCorrectas.length; x++){    
                           
            
                var listaCorrectas = pantalla.add.text(100, distancia*x+1, '', { font: '64px Courier', fill: '#00ff00' });
                listaCorrectas.setText([

                  
                
                ]);
                            
                
            
            }


            crearMatriz(pantalla);

            acomodarPalabras();
                
                    

            pantalla.input.on('gameobjectmove', function (pointer, gameObject) {

                    
               
            
                    
            });

        },         
            
           
        

                

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

            var sx = innerWidth/2 - (36*7) + (x * 36);
            var sy = innerHeight/2 - (36*7) + (y * 36);
            var letra = Phaser.Math.Between(0, 26);
            //abecedario[letra]
                    
            var texto = parPantalla.add.text(sx, sy, "x", { fontFamily: "Arial Black", fontSize: 20, color: "#ffcc66" });
            texto.setStroke('#e69900', 16).setShadow(2, 2, "#b37700", 2, true, true);

           

            texto.setInteractive();
            texto.setData('Letra', abecedario[letra]);  
                    
            grid[x][y] = texto;

            
        }

    }


}

function acomodarPalabras(){


   
    
    
    for (var x = 0; x < palabrasCorrectas.length; x++){   
        
        var puntoX = Phaser.Math.Between(0, columnasMat-1);       
        var puntoY = Phaser.Math.Between(0, filasMat-1);

        console.log(puntoX + " " + puntoY);
        console.log(" **** PALABRA NUEVA  ***" + x)

        validarCampos(palabrasCorrectas[x], puntoX, puntoY);
        colocarPalabras(puntoX, puntoY, palabrasCorrectas[x]);

        

        //alert(palabrasCorrectas[x] +" en:" +puntoX + " " + puntoY);

        
        posiblesDirecciones = [];
    }
    


   
           
        
    

    
}



function validarCampos(palabra, pX, pY){   

    try {
        

        switch(direcciones){


           

            case 1:
            
                //typeof grid[pX][pY - palabra.length-1] !== 'undefined' || grid[pX][pY - palabra.length-1]  !== null
                if( pY - palabra.length-1 >= 0){

                    posiblesDirecciones.push(direcciones);
                    
                    
                    console.log("caso 1 Direccion metida");

                }

                    direcciones++;
                    validarCampos(palabra, pX, pY);
                    
                    

            break;


         


            case 2:
            
            //typeof grid[pX - palabra.length-1][pY] !== 'undefined' || grid[pX - palabra.length-1][pY]  !== null

                if(pX - palabra.length-1 >= 0 ){

                    posiblesDirecciones.push(direcciones);                   
                    
                    console.log("caso 2 Direccion metida");

                }
                
                direcciones++;
                validarCampos(palabra, pX, pY);
                    
                    

                
            break;



            case 3:
                
                //typeof grid[pX +  palabra.length-1][pY] !== 'undefined' || grid[pX +  palabra.length-1][pY]  !== null

                if(pX +  palabra.length-1 <= columnasMat-1){

                    posiblesDirecciones.push(direcciones);
                    
                    
                    console.log("caso 3 Direccion metida");


                }

                direcciones++;
                validarCampos(palabra, pX, pY);   

            break;





            case 4:
            //typeof grid[pX][pY + palabra.length-1] !== 'undefined' || grid[pX][pY + palabra.length-1]  !== null

                if(pY + palabra.length-1 <= filasMat-1){

                    posiblesDirecciones.push(direcciones);
                    
                    
                    console.log("caso 4 Direccion metida");


                }
                
                     
                
            break;




        }



    } catch (error) {

        console.log(error);

        direcciones++;
        validarCampos(palabra, pX, pY);  
        
    }


   
    

}



function colocarPalabras(pX, pY, palabra){

    var posicionAzar = Phaser.Math.Between(0, posiblesDirecciones.length-1);
    
    
    try {
        
        console.log("AZAR COGIDO: "+ posicionAzar)
        console.log("CASO ELEGIDO: " + posiblesDirecciones[posicionAzar]);
        switch(posiblesDirecciones[posicionAzar]){


            

            case 1:
            
                for (var x = 0; x < palabra.length; x++){               
                                      
                                       
                    grid[pX][pY -x].text = palabra.charAt(x);
                    grid[pX][pY -x].setData('Letra', palabra.charAt(x));  
                    
                } // SI RECORRE EL CICLO ES PORQUE HAY CAMPO

               
                console.log("Palabra colocada en CASO 1")

            break;

          

            case 2:
            
                for (var x = 0; x < palabra.length; x++){               
                                        
                                        
                    grid[pX -x][pY].text = palabra.charAt(x);
                    grid[pX -x][pY].setData('Letra', palabra.charAt(x));  
                
                } // SI RECORRE EL CICLO ES PORQUE HAY CAMPO

              
                console.log("Palabra colocada en CASO 2")

            break;



            case 3:
            
                for (var x = 0; x < palabra.length; x++){               
                                        
                                        
                    grid[pX+x][pY].text = palabra.charAt(x);
                    grid[pX+x][pY].setData('Letra', palabra.charAt(x));  
                    
                
                } // SI RECORRE EL CICLO ES PORQUE HAY CAMPO

                    
                console.log("Palabra colocada en CASO 3")

            break;


            case 4:
            
                for (var x = 0; x < palabra.length; x++){               
                                        
                                        
                    grid[pX][pY +x].text = palabra.charAt(x);
                    grid[pX][pY +x].setData('Letra', palabra.charAt(x));  
                    
                
                } // SI RECORRE EL CICLO ES PORQUE HAY CAMPO

                
                console.log("Palabra colocada en CASO 4")

            break;




        }



    } catch (error) {

        console.log(error);
        
        
    }

    direcciones = 1;
    
   
}





