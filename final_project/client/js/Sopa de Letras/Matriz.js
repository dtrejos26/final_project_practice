var Matriz = new Phaser.Class({

    

    initialize:

    function Matriz (pPantalla, pFilas, pColumnas, pListaCo, pListaIn){


        this.filasMat = pFilas;
        this.columnasMat = pColumnas;

        this.abecedario = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U",
            "V","W","X","Y","Z"];
        
        this.palabrasCorrectas = pListaCo;
        this.palabrasIncorrectas = pListaIn;
        this.contexto = pPantalla;
        this.matriz = [];
        this.posiblesDirecciones = [];
        this.contDirecciones = 1;

        
  


    },


    crearMatriz(){

        
        for (var x = 0; x < this.filasMat; x++){
                
            this.matriz[x] = [];
    
            for (var y = 0; y < this.columnasMat; y++){
    
                var posX = innerWidth/2 - (36*7) + (x * 36);
                var posY = innerHeight/2 - (36*7) + (y * 36);
                var letra = Phaser.Math.Between(0, 26);
                //abecedario[letra]
                        
                var texto = this.contexto.add.text(posX, posY, "x", { fontFamily: "Arial Black", fontSize: 20, color: "#ffcc66" });
                texto.setStroke('#e69900', 16).setShadow(2, 2, "#b37700", 2, true, true);
                             
                texto.setInteractive();
                texto.setData('Letra', this.abecedario[letra]);  
                        
                this.matriz[x][y] = texto;
    
                
            }
    
        }
    
    
    
        
    
    
    }, // FINAL  CREAR MATRIZ()
    acomodarPalabras(){

              
         
        for (var x = 0; x < this.palabrasCorrectas.length; x++){   
            
           var puntoX = Phaser.Math.Between(0, this.columnasMat-1);       
           var puntoY = Phaser.Math.Between(0, this.filasMat-1);
           console.log("PALABRA NUEVA ****" +puntoX + " " + puntoY);
    
           this.validarCampos(this.palabrasCorrectas[x], puntoX, puntoY);
           this.colocarPalabras(puntoX, puntoY, this.palabrasCorrectas[x]);
    
            //alert(palabrasCorrectas[x] +" en:" +puntoX + " " + puntoY);
    
           console.log("Direcciones:" +  this.posiblesDirecciones)
           this.posiblesDirecciones = [];
        }

        for (var x = 0; x < this.palabrasIncorrectas.length; x++){   
            
            var puntoX = Phaser.Math.Between(0, this.columnasMat-1);       
            var puntoY = Phaser.Math.Between(0, this.filasMat-1);
            console.log("PALABRA NUEVA ****" +puntoX + " " + puntoY);
     
            this.validarCampos(this.palabrasIncorrectas[x], puntoX, puntoY);
            this.colocarPalabras(puntoX, puntoY, this.palabrasIncorrectas[x]);
     
             //alert(palabrasCorrectas[x] +" en:" +puntoX + " " + puntoY);
     
            console.log("Direcciones:" +  this.posiblesDirecciones)
            this.posiblesDirecciones = [];
         }
        
    
        
    }, //  FINAL CLASE ACOMODAR PALABRAS
    
    
    
   validarCampos(pPalabra, pX, pY){   
    
       try {
            
    
           switch(this.contDirecciones){
            
            case 1:
                
                   
                   if( pY - pPalabra.length-1 >= 0 && pX - pPalabra.length-1 >= 0){
    
                       this.posiblesDirecciones.push(this.contDirecciones);                        
                        
                       console.log("caso 1 Direccion metida");
    
                   }
    
                   this.contDirecciones++;
                   this.validarCampos(pPalabra, pX, pY);                        
                        
    
               break;
    
               case 2:
                
                   
                   if( pY - pPalabra.length-1 >= 0){
    
                       this.posiblesDirecciones.push(this.contDirecciones);                        
                        
                       console.log("caso 2 Direccion metida");
    
                   }
    
                   this.contDirecciones++;
                   this.validarCampos(pPalabra, pX, pY);                        
                        
    
               break;
    
               case 3:
                
                    
                   if(pX + pPalabra.length-1 <= this.filasMat-1 && pY - pPalabra.length-1 >= 0){
    
                       this.posiblesDirecciones.push(this.contDirecciones);                   
                        
                       console.log("caso 3 Direccion metida");
    
                   }
                    
                   this.contDirecciones++;
                   this.validarCampos(pPalabra, pX, pY);
                   
                break;    

               case 4:
                
                    
                   if(pX - pPalabra.length-1 >= 0 ){
    
                       this.posiblesDirecciones.push(this.contDirecciones);                   
                        
                       console.log("caso 4 Direccion metida");
    
                   }
                    
                   this.contDirecciones++;
                   this.validarCampos(pPalabra, pX, pY);
                   
                break;
    
    
    
               case 5:
                    
                         
                   if(pX +  pPalabra.length-1 <= this.columnasMat-1){
    
                       this.posiblesDirecciones.push(this.contDirecciones);
                        
                        
                       console.log("caso 5 Direccion metida");
    
    
                   }
    
                   this.contDirecciones++;
                   this.validarCampos(pPalabra, pX, pY);   
    
               break;
    
               case 6:
                    
                         
                    if(pY + pPalabra.length-1 <= this.filasMat-1 && pX - pPalabra.length-1 >= 0){
    
                        this.posiblesDirecciones.push(this.contDirecciones);
                        
                        
                        console.log("caso 6 Direccion metida");
    
    
                    }
    
                    this.contDirecciones++;
                    this.validarCampos(pPalabra, pX, pY);  
                    console.log("caso 6 Direccion metida"); 
 
                break;



               case 7:
                //typeof grid[pX][pY + palabra.length-1] !== 'undefined' || grid[pX][pY + palabra.length-1]  !== null
    
                   if(pY + pPalabra.length-1 <= this.filasMat-1){
    
                       this.posiblesDirecciones.push(this.contDirecciones);                         
                        
                       console.log("caso 7 Direccion metida");
    
    
                   }
                        
                   
                   this.contDirecciones++;
                   this.validarCampos(pPalabra, pX, pY);  
                    
               break;

               case 8:
                //typeof grid[pX][pY + palabra.length-1] !== 'undefined' || grid[pX][pY + palabra.length-1]  !== null
    
                   if(pX + pPalabra.length-1 <= this.filasMat-1 && pY + pPalabra.length-1 <= this.columnasMat-1){
    
                       this.posiblesDirecciones.push(this.contDirecciones);                         
                        
                       console.log("caso 8 Direccion metida");
    
    
                   }
                                             
                   this.contDirecciones++;
                   this.validarCampos(pPalabra, pX, pY);  
               break;
                   
               
        
    
           }
    
    
    
       }catch (error) {
    
           console.log(error);
    
           this.contDirecciones++;
           this.validarCampos(pPalabra, pX, pY);  
            
       }
    
    
       
        
    
   }, // FINAL FUNCTION  VALIDARCAMPOS()
    
   colocarPalabras(pX, pY, pPalabra){
    
       var posicionAzar = Phaser.Math.Between(0, this.posiblesDirecciones.length-1);
        
        console.log(posicionAzar);
        try {             
    
           switch(this.posiblesDirecciones[posicionAzar]){
    
    
               case 1:
                
                   for (var x = 0; x < pPalabra.length; x++){     
                            
                       this.matriz[pX - x][pY -x].text = pPalabra.charAt(x);
                                           
                       this.matriz[pX - x][pY -x].setData('Letra', pPalabra.charAt(x));         
                       
                    
                   } 
    
                   
               break;
    
    
                case 2:
                
                    for (var x = 0; x < pPalabra.length; x++){               
                                          
                                           
                        this.matriz[pX][pY -x].text = pPalabra.charAt(x);
                        this.matriz[pX][pY -x].setData('Letra', pPalabra.charAt(x));  
                        
                    } // SI RECORRE EL CICLO ES PORQUE HAY CAMPO
    
                   
                
    
                break;
    
    
                case 3:
                
                    for (var x = 0; x < pPalabra.length; x++){               
                                            
                                            
                        this.matriz[pX +x][pY -x].text = pPalabra.charAt(x);
                        this.matriz[pX +x][pY -x].setData('Letra', pPalabra.charAt(x));  
                    
                    } // SI RECORRE EL CICLO ES PORQUE HAY CAMPO
    
                   
    
                break;
    
    
                case 4:
                
                    for (var x = 0; x < pPalabra.length; x++){               
                                            
                                            
                        this.matriz[pX -x][pY].text = pPalabra.charAt(x);
                        this.matriz[pX -x][pY].setData('Letra', pPalabra.charAt(x));  
                    
                    } // SI RECORRE EL CICLO ES PORQUE HAY CAMPO
    
                  
                
    
                break;
    
    
    
                case 5:
                
                    for (var x = 0; x < pPalabra.length; x++){               
                                            
                                            
                        this.matriz[pX+x][pY].text = pPalabra.charAt(x);
                        this.matriz[pX+x][pY].setData('Letra', pPalabra.charAt(x));  
                        
                    
                    } // SI RECORRE EL CICLO ES PORQUE HAY CAMPO
    
                        
    
                break;
    
    
    
    
                case 6:
                
                    for (var x = 0; x < pPalabra.length; x++){               
                                            
                                            
                        this.matriz[pX-x][pY +x].text = pPalabra.charAt(x);
                        this.matriz[pX-x][pY +x].setData('Letra', pPalabra.charAt(x));  
                    
                    } // SI RECORRE EL CICLO ES PORQUE HAY CAMPO
    
                    
                     
    
                break;
    
    
    
    
                case 7:
                
                    for (var x = 0; x < pPalabra.length; x++){               
                                            
                                            
                        this.matriz[pX][pY +x].text = pPalabra.charAt(x);
                        this.matriz[pX][pY +x].setData('Letra', pPalabra.charAt(x));  
                        
                    
                    } 
    
                    
                    
    
                break;
    
    
    
    
    
                case 8:
                
                    for (var x = 0; x < pPalabra.length; x++){               
                                            
                                            
                        this.matriz[pX +x][pY +x].text = pPalabra.charAt(x);
                        this.matriz[pX +x][pY +x].setData('Letra', pPalabra.charAt(x)); 
                        
                    
                    } 
    
                      
                    
    
                break;
    
    
            }
    
    
    
        } catch (error) {
    
            console.log(error);
            
            
        }
    
        this.contDirecciones = 1;
        
        
    }
         
        
    
    

});







    




