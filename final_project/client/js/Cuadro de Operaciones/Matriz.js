var Matriz = new Phaser.Class({

        
       
    initialize:

    function Matriz (pPantalla, pFilas, pColumnas, pIni, pFin)
    {
        
        this.iniNumero = pIni;
        this.finNumero = pFin;

        this.filasMat = pFilas;
        this.columnasMat = pColumnas;
        
        this.contexto = pPantalla;
        this.matriz = [];

        this.operaciones = ["+", "-", "*", "/"];     

        this.listaNumeros = [];
        this.listaOperaciones = [];
        this.stringOperacion = "";
        

    },   


    crearMatriz(){



        for (var x = 0; x < this.filasMat; x++){
                
            this.matriz[x] = [];

            for (var y = 0; y < this.columnasMat; y++){

                var posX = innerWidth/2 - (36*7) + (x * 36*2);
                var posY = innerHeight/2 - (36*7) + (y * 36*2);
                var numero = Phaser.Math.Between(this.iniNumero, this.finNumero);
            
               

                var texto = this.contexto.add.text(posX, posY, numero, { fontFamily: "Arial Black", fontSize: 20, color: "#ffcc66" });
                texto.setStroke('#e69900', 10).setShadow(2, 2, "#b37700", 2, true, true);

            

                texto.setInteractive();
                texto.setData('Numero', numero);
                texto.setData('x', x);  
                texto.setData('y', y);

                            
                this.matriz[x][y] = texto;


            

                this.acomodarOperaciones(texto, posX, posY);
            
                
            }

        }



        this.matriz[this.filasMat-1][this.columnasMat-1].text = "";




    },

    crearOperacion(x, y){


        var operacionAzar = Phaser.Math.Between(0, 3);

        var tipoOperacion = this.contexto.add.text(x, y, this.operaciones[operacionAzar], { fontFamily: "Arial Black", fontSize: 20, color: "#ffcc66", align: 'center' });
            tipoOperacion.setStroke('#e69900', 1).setShadow(1, 1, "#b37700", 2, true, true);


    return tipoOperacion;
    },

    crearIgualad(x, y){


        var tipoOperacion = this.contexto.add.text(x, y, "=" ,{ fontFamily: "Arial Black", fontSize: 20, color: "#ffcc66", align: 'center' });
            tipoOperacion.setStroke('#e69900', 1).setShadow(1, 1, "#b37700", 2, true, true);


    },


    acomodarOperaciones(texto, x, y){


        try {
            
            if(texto.data.list["x"] == 0 && texto.data.list["y"] == 0){


            
                texto.setData('OperacionDer',this.crearOperacion(x+46, y+10 ));
                texto.setData('OperacionAba',this.crearOperacion(x+10, y+36));
                texto.setData("Primero", true);



            }else if(texto.data.list["y"] == this.columnasMat-1 && texto.data.list["x"] < this.columnasMat-1){

                
                texto.setData('IgualdadArr', this.crearIgualad(x+5, y-20));
                texto.removeInteractive();

            }else if(texto.data.list["x"] == this.columnasMat-1 && texto.data.list["y"] >= 0  && texto.data.list["y"] < this.filasMat-1){


                texto.setData('IgualdadIzq', this.crearIgualad(x-20, y+5));
                texto.removeInteractive();

            }else if(texto.data.list["x"] > 0 && texto.data.list["y"] == 0 && texto.data.list["x"] < this.filasMat-2){


                texto.setData('OperacionAba', this.crearOperacion(x+10, y+36));
                texto.setData('OperacionDer', this.crearOperacion(x+46, y+10));

            }else if(texto.data.list["x"] > 0 && texto.data.list["y"] == this.columnasMat-2 && texto.data.list["x"] < this.filasMat-2){

                texto.setData('OperacionDer', this.crearOperacion(x+46, y+10));

            }else if(texto.data.list["x"] > 0 && texto.data.list["y"] > 0 && texto.data.list["x"] < this.filasMat-2 && texto.data.list["y"] < this.filasMat-2){


                texto.setData('OperacionDer',this.crearOperacion(x+46, y+10));
                texto.setData('OperacionAba',this.crearOperacion(x+10, y+36));

            }else if(texto.data.list["y"] < this.columnasMat-2 && texto.data.list["x"] == 0  && texto.data.list["y"] > 0){

                
                texto.setData('OperacionAba',this.crearOperacion(x+10, y+36));
                texto.setData('OperacionDer',this.crearOperacion(x+46, y+10));

            }else if (texto.data.list["y"] == this.columnasMat-2 && texto.data.list["x"] == 0){

                texto.setData('OperacionDer',this.crearOperacion(x+46, y+10));

            }else if(texto.data.list["y"] < this.columnasMat-2 && texto.data.list["x"] == this.columnasMat-2  && texto.data.list["y"] >= 0){

                texto.setData('OperacionAba',this.crearOperacion(x+10, y+36));


            }



        } catch (error) {


            console.log(error);
            
        }





    },

    crearOperacionesColumnas(){

        for (var x = 0; x < this.filasMat-1; x++){
                
        

            for (var y = 0; y < this.columnasMat-1; y++){


                if(y < this.filasMat-2){                
                    

                    
                    this.listaOperaciones.push(this.matriz[x][y].data.list["OperacionAba"].text);

                    
                // tipoOperacionCampoColumnas(grid[x][y], grid[x][filasMat-1]);

                }       
                    

                    this.listaNumeros.push(this.matriz[x][y].data.list["Numero"]);

                
                
            }


                

            this.validarOperaciones();
            this.matriz[x][this.filasMat-1].text = eval(this.stringOperacion);
            this.matriz[x][this.filasMat-1].text = Math.round(Number(this.matriz[x][this.filasMat-1].text));
                    
            
                
                
                
            
            this.listaNumeros = [];
            this.listaOperaciones = [];
            this.stringOperacion = "";


        
            
        }

        this.listaNumeros = [];
        this.listaOperaciones = [];
        this.stringOperacion = "";

    },

    crearOperacionesFilas(){

        for (var x = 0; x < this.filasMat-1; x++){
                
        

            for (var y = 0; y < this.columnasMat-1; y++){

                console.log(x + " " + y);

                if(this.matriz[y][x].data.list["x"] < this.filasMat-2){                
                    

                    
                    this.listaOperaciones.push(this.matriz[y][x].data.list["OperacionDer"].text);

                    
                // tipoOperacionCampoColumnas(grid[x][y], grid[x][filasMat-1]);

                }       
                    

            this.listaNumeros.push(this.matriz[y][x].data.list["Numero"]);

                
                
            }


                

            this.validarOperaciones();
            this.matriz[this.filasMat-1][x].text = eval(this.stringOperacion);
                    
            this.matriz[this.filasMat-1][x].text = Math.round(Number(this.matriz[this.filasMat-1][x].text));
                
                
                
            
            this.listaNumeros = [];
            this.listaOperaciones = [];
            this.stringOperacion = "";


        
            
        }

        this.listaNumeros = [];
        this.listaOperaciones = [];
        this.stringOperacion = "";

    },

    validarOperaciones(){


        console.log("Tamaño listta: "+ this.listaNumeros.length);
        for (var x = 0; x < this.listaNumeros.length-1; x++){

        

            try {
            
            
                this.stringOperacion += this.listaNumeros[x].toString() + " " + this.listaOperaciones[x].toString() + " ";

                
                


                
            } catch (error) {

                console.log(error);
                
            }

            
            
        }

        this.stringOperacion += this.listaNumeros[this.listaNumeros.length-1].toString(); 


        console.log(this.stringOperacion);


    },

    limpiarMatriz(){

        for (var x = 0; x < this.filasMat-1; x++){
                
        

            for (var y = 0; y < this.columnasMat-1; y++){


                this.matriz[x][y].text = "";

                var posX = innerWidth/2 - (36*7) + (x * 36*2);
                var posY = innerHeight/2 - (36*7) + (y * 36*2);


                var grafico = this.contexto.add.graphics();
                var cuadro = new Phaser.Geom.Rectangle(posX, posY, 36, 36);
                

                grafico.lineStyle(1);
                grafico.strokeRectShape(cuadro);
            

            
            }        
        
    
        }



    }


  
});