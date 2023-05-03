var Matriz = new Phaser.Class({

        
       
    initialize:

    function Matriz (pPantalla, pFilas, pColumnas, pIni, pFin, pMecanica)
    {
        



        this.iniNumero = pIni;
        this.finNumero = pFin;

        this.filasMat = pFilas;
        this.columnasMat = pColumnas;
        
        this.contexto = pPantalla;
        this.matriz = [];

        this.listaNumeros = [];
        this.primero = true;
        this.anterior;


        this.mecanica = pMecanica;

    },   

    crearMatriz(){

    for (var x = 0; x < this.filasMat; x++){
            
        this.matriz[x] = [];

        for (var y = 0; y < this.columnasMat; y++){

            var posX = innerWidth/2 - (36*7) + (x * 36);
            var posY = innerHeight/2 - (36*7) + (y * 36);
            var numeroAzar = Phaser.Math.Between(this.iniNumero, this.finNumero);
        
                    
            var texto = this.contexto.add.text(posX, posY, numeroAzar, { fontFamily: "Arial Black", fontSize: 20, color: "#ffcc66", align: 'center' });
            texto.setStroke('#e69900', 10).setShadow(4, 4, "#b37700", 2, true, true);

        

            texto.setInteractive();
            texto.setData('Numero', numeroAzar);
            texto.setData('x', x);  
            texto.setData('y', y);
            texto.setData('Seleccionado', false);
            texto.setData('Listado', false);
            texto.setData('Correcto', false);
            
            this.matriz[x][y] = texto;

            
        }

    }


        var numeroPrimero = Phaser.Math.Between(0, this.filasMat-1);

        this.listaNumeros.push(this.matriz[0][numeroPrimero]); 
        this.colocarCamino(this.mecanica);


    },


    validarSeleccion(numero){

    if( this.primero && numero.data.list["x"] == 0 ){

        this.primero = false;
        this.anterior = numero;

        
        this.anterior.data.list["Seleccionado"] = true;
        if(numero.data.list["Correcto"]){

            numero.setStroke('#7E9A43', 8);
        }else{


            numero.setStroke('#ff1a1a', 8);
        }


    }else{


        if(numero.data.list["Seleccionado"] == false && numero.data.list["x"]+1 == this.anterior.data.list["x"] && numero.data.list["y"] == 
        this.anterior.data.list["y"] || numero.data.list["x"] == this.anterior.data.list["x"] && numero.data.list["y"] == this.anterior.data.list["y"]-1 ||
        numero.data.list["x"]-1 == this.anterior.data.list["x"] && numero.data.list["y"] == this.anterior.data.list["y"] || 
        numero.data.list["x"] == this.anterior.data.list["x"] && numero.data.list["y"]+1 == this.anterior.data.list["y"] ||
        numero.data.list["x"] == this.anterior.data.list["x"] && numero.data.list["y"]-1 == this.anterior.data.list["y"]){

            
            numero.data.list["Seleccionado"] = true;
            

            if(numero.data.list["Correcto"]){

                numero.setStroke('#7E9A43', 8);
            }else{


                numero.setStroke('#ff1a1a', 8);
            }
            this.anterior = numero;

        }


    }






    },




    colocarCamino(numero){

    var direcciones = ["ARRIBA", "ABAJO", "DERECHA"]
    var direccionAzar = Phaser.Math.Between(0, 2);


    try {
        

        switch(direcciones[direccionAzar]){

            case "ARRIBA":

                var numeroAnteriorArriba = this.listaNumeros[this.listaNumeros.length-1];
                var numeroNuevoArriba = this.matriz[numeroAnteriorArriba.data.list["x"]][numeroAnteriorArriba.data.list["y"]-1];

                if(numeroAnteriorArriba.data.list["y"] -1> 0 && numeroNuevoArriba.data.list["Listado"] == false ){


                    numeroNuevoArriba.text = Number(numeroAnteriorArriba.text) + numero;

                    this.listaNumeros[this.listaNumeros.length-1].data.list["Correcto"] = true;

                    this.listaNumeros.push(numeroNuevoArriba);

                    this.listaNumeros[this.listaNumeros.length-1].data.list["Listado"] = true;
                    this.listaNumeros[this.listaNumeros.length-1].data.list["Correcto"] = true;

                    //this.listaNumeros[this.listaNumeros.length-1].setStroke('white', 8);

                    if(Number(this.listaNumeros[this.listaNumeros.length-1].data.list["y"]) > 0){

                        this.colocarCamino(numero);

                    }
                    
                    console.log("ARRIBA" + this.listaNumeros[this.listaNumeros.length-1].text);
                }else{

                        this.colocarCamino(numero);

                }

            break;


            case "ABAJO":

                var numeroAnteriorAbajo = this.listaNumeros[this.listaNumeros.length-1];
                var numeroNuevoAbajo =  this.matriz[numeroAnteriorAbajo.data.list["x"]][numeroAnteriorAbajo.data.list["y"]+1];    

                if(numeroAnteriorAbajo.data.list["y"] +1 < this.filasMat-1 && numeroNuevoAbajo.data.list["Listado"] == false){


                    numeroNuevoAbajo.text = Number(this.listaNumeros[this.listaNumeros.length-1].text) + numero;

                    this.listaNumeros[this.listaNumeros.length-1].data.list["Correcto"] = true;
                    this.listaNumeros.push(numeroNuevoAbajo);

                    this.listaNumeros[this.listaNumeros.length-1].data.list["Listado"] = true;
                    this.listaNumeros[this.listaNumeros.length-1].data.list["Correcto"] = true
                    
                    //this.listaNumeros[this.listaNumeros.length-1].setStroke('gray', 8);
        
                    
                    if(Number(this.listaNumeros[this.listaNumeros.length-1].data.list["y"]) < this.filasMat-1){

                        this.colocarCamino(numero);

                    }
                    
                    console.log("ABAJO" + this.listaNumeros[this.listaNumeros.length-1].text);

                }else{

                    this.colocarCamino(numero);

                }


            break;



            case "DERECHA":


                var numeroAnteriorDerecha = this.listaNumeros[this.listaNumeros.length-1];
                var numeroNuevoDerecha = this.matriz[numeroAnteriorDerecha.data.list["x"]+1][numeroAnteriorDerecha.data.list["y"]];

                if(numeroAnteriorDerecha.data.list["x"]-1 < this.columnasMat-1 && numeroNuevoDerecha.data.list["Listado"] == false){


                    numeroNuevoDerecha.text = Number(numeroAnteriorDerecha.text) + numero;

                    this.listaNumeros[this.listaNumeros.length-1].data.list["Correcto"] = true;
                    this.listaNumeros.push(numeroNuevoDerecha);

                    this.listaNumeros[this.listaNumeros.length-1].data.list["Listado"] = true;
                    this.listaNumeros[this.listaNumeros.length-1].data.list["Correcto"] = true

                    //this.listaNumeros[this.listaNumeros.length-1].setStroke('green', 8);
                    
                    if(Number(this.listaNumeros[this.listaNumeros.length-1].data.list["x"]) < this.columnasMat-1){

                        this.colocarCamino(numero);

                    }else{

                        console.log("MAXIMO DERECHA" + this.listaNumeros[this.listaNumeros.length-1].text);
                        break;
                    }
                    
                    

                }else{

                    this.colocarCamino(numero);

                }



            break;



        }


    } catch (error) {
        

        console.log(error);
        

    }



    }



   

});