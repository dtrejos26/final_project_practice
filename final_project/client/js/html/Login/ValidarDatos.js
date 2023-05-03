var socket = io();
           



function enviarDatosLogin(){

    
    var usuario = document.getElementById("inputNU").value;
    var pass = document.getElementById("inputPass").value;


    
    socket.emit("datosLogin",{

        User: usuario,
        Pass: pass

    });


    socket.on("resultadoLogin", function(data){

        if(data.valido){

            location.href= "Crucigrama.html"

        }else{

            alert("Datos invalidos");

        }



    });



}