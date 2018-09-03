var TJBot = require('tjbot');
var config = require('./config');

// Obtiene las credenciales desde config.js
var credentials = config.credentials;

// El hardware necesario para este ejemplo
var hardware = ['led', 'microphone', 'speaker'];

// Definimos la configuracion para TJ
var tjConfig = {
    log: {
        level: 'verbose'
    }
    // Uncomment to linsten in spanish
    //listen: {
      //  language: 'es-ES'
    //}
};

// instanciamos un nuevo tjbot
var tj = new TJBot(hardware, tjConfig, credentials);


console.log("Instancia de TJbot creada correctamente :)");

// funcion de escuchar a texto
tj.listen(function(msg) {
    var containsHi = msg.indexOf("hi") >= 0;
    var containsHello = msg.indexOf("hello") >= 0;
    var containsHey = msg.indexOf("hey") >= 0;
    var containsTj = msg.indexOf("tjbot") >= 0;
    var containsMaj = msg.indexOf("Mayor") >= 0;
    var containsSantiago = msg.indexOf("Santiago") >= 0;


    if (containsHi || containsHello || containsHey) {
        tj.speak("Hello, Ms Devos").then(function() {
    	return tj.speak(" It is a pleasure to have you here today. I hope you enjoy all the amazing things that we do here at the American Space.");
			});
    }

    if (containsMaj || containsSantiago || containsTj){

    	tj.speak("Hello Mr. Mayor, it is also a pleasure to meet you").then(function() {
    	return tj.speak("They told me that you like robots, I wish I could know your office to show my performances!");
			});

    }
});


