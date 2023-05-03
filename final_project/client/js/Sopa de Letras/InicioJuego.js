

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




    var palabrasCorrectas = ["CORRER", "PEZ", "SALTAR"];
    var palabrasIncorrectas = ["GATO", "PERRO","OSO"];
    matriz = new Matriz(this,14,14,palabrasCorrectas,palabrasIncorrectas);    

    matriz.crearMatriz();
    matriz.acomodarPalabras();

    contenedor = new Contenedor(this);

    

    contenedor.llenarLista(matriz.palabrasCorrectas, matriz.palabrasIncorrectas);
    contenedor.colocarPalabras();
    
   contenedor.tacharPalabra();


    this.data.set("Marcador", txtPuntosVida);


    this.input.on('gameobjectmove', function (pointer, gameObject) {
    
        var arriba = true;
        if(pointer.isDown){  
            
            arriba = false;
            if(listaLetrasSeleccionadas.length == 0){

                listaLetrasSeleccionadas.push(gameObject);
                gameObject.setStroke('#7E9A43', 16);

            }else if(listaLetrasSeleccionadas[listaLetrasSeleccionadas.length-1] != gameObject){


                listaLetrasSeleccionadas.push(gameObject);  
                gameObject.setStroke('#7E9A43', 16);
                

                

            }
            
            
        }else if(pointer.noButtonDown() && listaLetrasSeleccionadas.length > 0){


            validarPalabraSeleccionada();
            listaLetrasSeleccionadas = [];
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



function validarPalabraSeleccionada(){
    

    try {
        

        var palabraFormada = "";


        for (var x = 0; x < listaLetrasSeleccionadas.length; x++){               
                                            
                                            
            palabraFormada += listaLetrasSeleccionadas[x].data.list["Letra"];
            
        
        } 

        console.log(palabraFormada);
        

        for (var x = 0; x < contenedor.contenedorPalabras.length; x++){               
                                            
                                            
            if(matriz.palabrasCorrectas[x] == palabraFormada){

                for (var y = 0; y < contenedor.contenedorPalabras.length; y++){               
                                            
                                            
                    if(contenedor.contenedorPalabras[y].text == matriz.palabrasCorrectas[x]){
            
                        
                        contenedor.contenedorPalabras[y].setColor("#ff0000");
                        txtPuntosVida.text = Number(txtPuntosVida.text) + 100;
                    }
                
                } 

                //txtPuntosVida.text = Number(txtPuntosVida.text) + 100;
            }else if (matriz.palabrasIncorrectas[x] == palabraFormada){

               // txtPuntosVida.text = Number(txtPuntosVida.text) - 100;
               //contenedor.contenedorPalabras[x].setColor("#ff0000");
                //data.list["Grafico"].fillRectShape(pPantalla.children.list[y].list[x].getBounds());
                
                for (var y = 0; y < contenedor.contenedorPalabras.length; y++){               
                                            
                                            
                    if(contenedor.contenedorPalabras[y].text == matriz.palabrasIncorrectas[x]){
            
                        
                        contenedor.contenedorPalabras[y].setColor("#ff0000");
                        txtPuntosVida.text = Number(txtPuntosVida.text) -100;
                    }
                
                } 
                

            }
            
        
        } 
    





    } catch (error) {
    

        
    }

    
    
    

}    





function tacharPalabrasSeleccionadas(){


    for (var x = 0; x < contenedor.contenedorPalabras.length; x++){               
                                            
                                            
        if(contenedor.contenedorPalabras[x].text == listaPalabrasSeleccionadasCo[x]){

            
            contenedor.contenedorPalabras[x].setColor("#ff0000");
            txtPuntosVida.text = Number(txtPuntosVida.text) + 100;
        }
    
    } 



    for (var x = 0; x < contenedor.contenedorPalabras.length; x++){               
                                            
                                            
        if(contenedor.contenedorPalabras[x].text == listaPalabrasSeleccionadasIn[x]){

           
            contenedor.contenedorPalabras[x].setColor("#ff0000");
            txtPuntosVida.text = Number(txtPuntosVida.text) - 100;
        }
    
    } 


}