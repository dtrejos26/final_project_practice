var express = require('express');
var app = express();
var serv = require('http').Server(app);

var mysql = require('mysql');


var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "TFG2019",
	database: "aprendejugando"
  });
  

	con.connect(function(err) {
		if (err) throw err;
		
		console.log("Conexion a BD Exitosa!");

	});

app.get('/',function(req, res){

	res.sendFile(__dirname + '/client/Login.html');
	

});

app.use(express.static(__dirname + '/client'));


app.use('/js',express.static(__dirname +'/client/js'));
app.use('/img',express.static(__dirname +'/client/img'));
app.use('/css',express.static(__dirname +'/client/css'));

app.get('/Principal.html',function(req, res){

	res.sendFile(__dirname + '/client/Principal.html');
	

});

app.get('/ModMaterias.html',function(req, res){

	res.sendFile(__dirname + '/client/ModMaterias.html');
	

});




//JUEGOS


app.get('/SopaLetras.html',function(req, res){

	res.sendFile(__dirname + '/client/SopaLetras.html');
	

});

app.get('/CuadroOperaciones.html',function(req, res){

	res.sendFile(__dirname + '/client/CuadroOperaciones.html');
	

});


app.get('/LaberintoNumeros.html',function(req, res){

	res.sendFile(__dirname + '/client/LaberintoNumeros.html');
	

});

app.get('/Crucigrama.html',function(req, res){

	res.sendFile(__dirname + '/client/Crucigrama.html');
	

});




serv.listen(3000, function(){
	console.log('Conectado en puerto:3000');
});

var io = require("socket.io")(serv, {});

io.sockets.on('connection', function(socket){

	console.log('Se ha conectado alguien');


	socket.on('datosLogin', function(msg){

		con.query("SELECT 1 FROM Persona P where P.Usuario ="+ msg.User+" AND P.Contraseña ="+msg.Pass, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			//var filas = JSON.parse(JSON.stringify(result[0]));

			if(result > 0){
				
				console.log("Datos validos");

				socket.emit("resultadoLogin",{valido:true});
			}else{

				socket.emit("resultadoLogin",{valido:false});
				
				console.log("Datos invalidos");

			}

			
		});
		
	  
	});
  });
  
