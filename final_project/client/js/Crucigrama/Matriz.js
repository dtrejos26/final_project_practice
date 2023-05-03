var Matriz = new Phaser.Class({

        
       
    initialize:

    function Matriz (pPantalla, pFilas, pColumnas)
    {
        

        this.filasMat = pFilas;
        this.columnasMat = pColumnas;
        this.contexto = pPantalla;
        this.matriz = [];
        
        this.listaPistas = [];
        this.posiblesDirecciones = [];

        this.contDirecciones = 1;


        this.listaIntersecciones = [];

        this.listaPuntosPalabras = [];
  

    },         
    
    crearMatriz(){

        for (var x = 0; x < this.filasMat; x++){
                
            this.matriz[x] = [];
    
            for (var y = 0; y < this.columnasMat; y++){
    
                var posX = innerWidth/2 - (36*7) + (x * 36);
                var posY = innerHeight/2 - (36*7) + (y * 36);
                var letra = Phaser.Math.Between(0, 26);
                //abecedario[letra]
                        
                var texto = this.contexto.add.text(posX, posY, "_", { fontFamily: "Arial Black", fontSize: 20, color: "#ffcc66" });
                texto.setStroke('#e69900', 16).setShadow(2, 2, "#b37700", 2, true, true);
                
    
                texto.setInteractive();
                //texto.setData('Letra', abecedario[letra]);
                texto.setData('Ocupado', false);  
                        
                this.matriz[x][y] = texto;
    
                
            }
    
        }
    
    
    },



    validarIntersecciones(){



        var cont1 = 0;
        var cont2 = 0;

        try {
            
              
            for (var x = 0; x < this.listaPistas.length; x++){


                for (var y = 0; y < this.listaPistas.length; y++){
        
                    
                    if(this.listaPistas[x].respuesta != this.listaPistas[y].respuesta){

                        for (var z = 0; z < this.listaPistas[x].respuesta.length; z++){   
            


                            for (var i = 0; i < this.listaPistas[y].respuesta.length; i++){   
            
                                if(this.listaPistas[x].respuesta.charAt(z) == this.listaPistas[y].respuesta.charAt(i)){
            
                                    this.guardarIntersecciones(this.listaPistas[x].respuesta, z, this.listaPistas[y].respuesta, i)
                                   // console.log("Palabra : " + this.listaPistas[x].respuesta +" Interseccion en: "+ this.listaPistas[y].respuesta.charAt(i)+ " de palabra: "+ this.listaPistas[y].respuesta)
                
                                }   
                            }


                             
                        }
                        
        
                    }

                    
                }

                
                
            }



        } catch (error) {


            console.log(error);
            console.log(cont2);    
        }
     



    },


    guardarIntersecciones(pPalabra1, pIndice1, pPalabra2, pIndice2){

        

        



        var interseccion = {

            Palabra01:pPalabra1,
            Palabra02:pPalabra2,
            indice1: pIndice1,
            indice2: pIndice2

        }

        this.listaIntersecciones.push(interseccion);

       
     

    },


    reducirListaIntersecciones(){



        

        var listaPuntos = [];
        

        for (var x = 0; x < this.listaIntersecciones.length; x++){   
            
            
            if(this.listaIntersecciones[x].Palabra01 == this.listaIntersecciones[x+1].Palabra01){

               


            }


        }


        var interseccion = {

            Palabra01:pPalabra1,
            Palabra02:pPalabra2,
            indices: listaPuntos

        }


        this.listaIntersecciones

    },


    mostrarPuntos(){


        for (var x = 0; x < this.listaIntersecciones.length; x++){   
            
            console.log("Interseccion de palabra: "+this.listaIntersecciones[x].Palabra01 + " / "+ this.listaIntersecciones[x].Palabra02 + 
            "\n ("+this.listaIntersecciones[x].indice1 + ", "+ this.listaIntersecciones[x].indice2+" )");
        }


    },


    acomodarPalabras(){


        
        this.acomodarVertical(this.listaIntersecciones[0].Palabra02, this.listaIntersecciones[0].indice1, this.listaIntersecciones[0].indice2 );
        this.acomodarHorizontal(this.listaIntersecciones[0].Palabra01, this.listaIntersecciones[0].indice1, this.listaIntersecciones[0].indice2 );

        


    },


    acomodarVertical(pPalabra, pX, pY){

        var puntoX = Phaser.Math.Between(0, (this.columnasMat-pPalabra.length-1));       
        var puntoY = Phaser.Math.Between(0, this.filasMat-pPalabra.length-1);

        console.log(pPalabra + " Vertical: " + (pPalabra.length-1 -pY).toString());
        for (var x = 0; x < pPalabra.length; x++){               
                                            
                                            
            this.matriz[puntoX][puntoY+x].text = pPalabra.charAt(x);
            this.matriz[puntoX][puntoY+x].setData('Letra', pPalabra.charAt(x));  
            this.matriz[puntoX][puntoY+x].data.list["Ocupado"] = true;
        
        }


    },

    acomodarHorizontal(pPalabra, pX, pY){

        console.log(pPalabra + " Horizontal: " + (pPalabra.length-1 -pX).toString());

        var puntoX = Phaser.Math.Between(0, this.columnasMat-pPalabra.length-1);       
        var puntoY = Phaser.Math.Between(0, this.filasMat-pPalabra.length-1);


        for (var x = 0; x < pPalabra.length; x++){               
                                            
                                            
            this.matriz[puntoX+x][puntoY].text = pPalabra.charAt(x);
            this.matriz[puntoX+x][puntoY].setData('Letra', pPalabra.charAt(x)); 
            this.matriz[puntoX+x][puntoY].data.list["Ocupado"] = true;
            
        
        } 



    }







    /*
    acomodarPalabras(){
    
        for (var x = 0; x < this.listaPistas.length; x++){   
            
            var puntoX = Phaser.Math.Between(0, this.columnasMat-1);       
            var puntoY = Phaser.Math.Between(0, this.filasMat-1);
    
            console.log(puntoX + " " + puntoY);
            console.log(" **** PALABRA NUEVA  ***" + this.listaPistas[x].respuesta)
    
            this.validarCampos(this.listaPistas[x].respuesta, puntoX, puntoY);
            this.colocarPalabras(puntoX, puntoY, this.listaPistas[x].respuesta);
    
            
    
            //alert(palabrasCorrectas[x] +" en:" +puntoX + " " + puntoY);
    
            
            this.posiblesDirecciones = [];
        }
    
    
    
    
    },
    
    
  
    validarCampos(palabra, pX, pY){   
    
        try {
            
    
            switch(this.contDirecciones){
    
    
    
                case 1:                    
                    
    
                    if(pX +  palabra.length-1 <= this.columnasMat-1){

                        var ocupadoCaso1 = 0;

                        for (var x = 0; x < palabra.length; x++){               
                                            

                            if(this.matriz[pX+x][pY].data.list["Ocupado"] == false){

                                ocupadoCaso1 += 1;


                                if(palabra.charAt(x) == this.matriz[pX+x][pY].data.list["Letra"]){

                                    this.posiblesDirecciones.push(this.contDirecciones);
                                    
                                }
                                
                            }else{


                                ocupadoCaso1 -= 1;

                            }   
                            
                        
                        } 
    
                       
                        
                        
                        console.log("caso 1 Direccion metida");
    
    
                    }

                    
                    if(ocupadoCaso1 == palabra.length){

                        this.posiblesDirecciones.push(this.contDirecciones);

                    }
    
                    this.contDirecciones++;
                    this.validarCampos(palabra, pX, pY);   
    
                break;
    
    
    
    
    
                case 2:
             
                    
    
                    if(pY + palabra.length-1 <= this.filasMat-1){

                        var ocupadoCaso2 = 0;


                        for (var x = 0; x < palabra.length; x++){               
                                            

                            if(this.matriz[pX][pY +x].data.list["Ocupado"] == false){

                                ocupadoCaso2 += 1;

                                if(palabra.charAt(x) == this.matriz[pX][pY +x].data.list["Letra"]){

                                    this.posiblesDirecciones.push(this.contDirecciones);

                                }
                                
                            }else{


                                ocupadoCaso2 -= 1;
                            }   
                            
                        
                        } 
                        

                        if(ocupadoCaso2 == palabra.length){

                            this.posiblesDirecciones.push(this.contDirecciones);

                        }else{

                            this.contDirecciones = 1;

                            var puntoX = Phaser.Math.Between(0, this.columnasMat-1);       
                            var puntoY = Phaser.Math.Between(0, this.filasMat-1);

                            this.validarCampos(palabra, puntoX, puntoY);
                        }
                        
                        
                        
                        console.log("caso 2 Direccion metida");
    
                        
                    }
                    
                        
                    
                break;
    
    
    
    
            }
    
    
    
        } catch (error) {
    
            console.log(error);
    
            this.contDirecciones++;
            this.validarCampos(palabra, pX, pY);  
            
        }
    
    
    
    
    
    },
    
    
    
    colocarPalabras(pX, pY, palabra){
    
        var posicionAzar = Phaser.Math.Between(0, this.posiblesDirecciones.length-1);
    
    
        try {
            
            console.log("AZAR COGIDO: "+ posicionAzar)
            console.log("CASO ELEGIDO: " + this.posiblesDirecciones[posicionAzar]);
            switch(this.posiblesDirecciones[posicionAzar]){
    
       
    
                case 1:
                
                    for (var x = 0; x < palabra.length; x++){               
                                            
                                            
                        this.matriz[pX+x][pY].text = palabra.charAt(x);
                        this.matriz[pX+x][pY].setData('Letra', palabra.charAt(x)); 
                        this.matriz[pX+x][pY].data.list["Ocupado"] = true
                        
                    
                    } 
    
                        
                    console.log("Palabra colocada en CASO 1")
    
                break;
    
    
                case 2:
                
                    for (var x = 0; x < palabra.length; x++){               
                                            
                                            
                        this.matriz[pX][pY +x].text = palabra.charAt(x);
                        this.matriz[pX][pY +x].setData('Letra', palabra.charAt(x));  
                        this.matriz[pX][pY +x].data.list["Ocupado"] = true
                    
                    } // SI RECORRE EL CICLO ES PORQUE HAY CAMPO
    
                    
                    console.log("Palabra colocada en CASO 2")
    
                break;
    
    
    
    
            }
    
    
    
        } catch (error) {
    
            console.log(error);
            
            
        }
    
        this.contDirecciones = 1;
    
    
    }
    
*/
});


