//Credenciales si es que falló IBM;

// user = "32527649-6a13-4aa2-a02a-a1747255c6cc"
// pass = "qqHIJalqUWQ2"

var TJBot = require('tjbot');
var config = require('./config');

// Obtiene las credenciales desde config.js
var credentials = config.credentials;

// El hardware necesario para este ejemplo
var hardware = ['led', 'microphone'];

// Definimos la configuracion para TJ
var tjConfig = {
    log: {
        level: 'verbose'
    },
    listen: {
        language: 'es-ES'
    }
};

// instanciamos un nuevo tjbot
var tj = new TJBot(hardware, tjConfig, credentials);

// lista completa de colores que entiende el TJBOT
var tjColors = tj.shineColors();

console.log("Entiendo muchos colores, pero por ahora en español solo entidneo [azul, rojo, verde, purpura] debes decir, poner, cambiar o prender la luz y algun color.");

// uncomment to see the full list of colors TJ understands
console.log("si quieres mas colores, puedes decirlos en ingles, como por ejemplo poner la luz orange:");
//console.log(tjColors.join(", "));

// hash map to easily test if TJ understands a color, e.g. {'red': 1, 'green': 1, 'blue': 1}
var colors = {};
tjColors.forEach(function(color) {
    colors[color] = 1;
});

// funcion de escuchar a texto
tj.listen(function(msg) {
    var containsTurn = msg.indexOf("poner") >= 0;
    var containsChange = msg.indexOf("cambiar") >= 0;
    var containsSet = msg.indexOf("prender") >= 0;
    var containsLight = msg.indexOf("la luz") >= 0;
    var containsDisco = msg.indexOf("fiesta") >= 0;
    var colores = {"rojo": "red", "azul": "blue", "verde": "green", "purpura" : "purple" };

    if ((containsTurn || containsChange || containsSet) && containsLight) {
        // hay algun color para poner?
        var words = msg.split(" ");
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            var wordcolor = colores[word];
            if (colors[wordcolor] != undefined || word == "on" || word == "off") {
                // si!
                tj.shine(wordcolor);
                break;
            }
        }
    } else if (containsDisco) {
         discoParty();
    }
});

// Se armo el mambo
function discoParty() {
    for (i = 0; i < 30; i++) {
        setTimeout(function() {
            var randIdx = Math.floor(Math.random() * tjColors.length);
            var randColor = tjColors[randIdx];
            tj.shine(randColor);
        }, i * 250);
    }
}

