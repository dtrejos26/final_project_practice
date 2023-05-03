
var Contenedor = new Phaser.Class({

    

    initialize:

    function Contenedor (pPantalla){

        this.listaPalabras = [];
        
        
        this.contexto = pPantalla;
        

        
        this.contenedorPalabras = [];
    


    },

    llenarLista(pLista1, pLista2){


        for (var x = 0; x < pLista1.length; x++){    
                           
            this.listaPalabras.push(pLista1[x]);

        }

        for (var x = 0; x < pLista2.length; x++){    
                           
            this.listaPalabras.push(pLista2[x]);           

        }


    },

    colocarPalabras(){


        var instrucciones = this.contexto.add.text(10, 100, '', { font: '25px Arial Black', fill: '#996633' });
        instrucciones.setText([

                "Busca las palabras!"
                
            ]);


        var contenedorJuego = this.contexto.add.container(50, 50);

        var graficoPalabra = this.contexto.add.graphics({ fillStyle: { color: 0x0000ff } });
        var graficoContenedor = this.contexto.add.graphics({ fillStyle: { color: 0x0000ff } });
            

        graficoContenedor.lineStyle(1);
        

        var distancia = 40;
        for (var x = 0; x < this.listaPalabras.length; x++){    
                           
            
            var palabra = this.contexto.add.text(50, distancia*x+200, '', { font: '20px Arial Black', fill: '#996633' });
            palabra.setText([

                this.listaPalabras[x]
                
            ]);

            palabra.setData("Grafico", graficoPalabra);
                     
           // graficoPalabra.strokeRectShape(palabra.getBounds());

           contenedorJuego.add(palabra);
            
        }


        this.contenedorPalabras = contenedorJuego.list;

     // graficoContenedor.strokeRectShape(contenedorPalabras.getBounds());

        
        

    },

    tacharPalabra(){

        
        console.log(this.contenedorPalabras.length);

    }

});




    




