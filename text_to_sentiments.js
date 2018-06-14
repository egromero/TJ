

var TJBot = require('tjbot');

// Obtiene las credenciales desde config.js
var credentials = {
    speech_to_text: {
        username: "91ac5cd0-c994-43bc-b6ce-d7835705a2d8",
        password: "q6dalvrcLnKY"
    },
    tone_analyzer: {
        username: "4cb91bb8-5b0b-4188-b35a-9f31c480b511",
        password: "UNzIPDlz1ELP"
    }
};

// El hardware necesario para este ejemplo
var hardware = ['led', 'microphone'];

// Definimos la configuracion para TJ
var tjConfig = {
    log: {
        level: 'verbose'
    }
};

// instanciamos un nuevo tjbot
var tj = new TJBot(hardware, tjConfig, credentials);

// lista completa de colores que entiende el TJBOT
var tjColors = tj.shineColors();


// uncomment to see the full list of colors TJ understands



// hash map to easily test if TJ understands a color, e.g. {'red': 1, 'green': 1, 'blue': 1}
var colors = {};
tjColors.forEach(function(color) {
    colors[color] = 1;
});

CONFIDENCE_THRESHOLD = 0.2;

// funcion de escuchar a texto
tj.listen(function(msg) {
console.log("ESCUHE UN Mensaje")
    if (msg.length > 10) {
    tj.analyzeTone(msg).then(function(tone) {
console.log("Analizado...Verificando tono")

            tone.document_tone.tone_categories.forEach(function(category) {
// console.log("CATEGORIA: " + JSON.stringify(category)) 
                if (category.category_id == "emotion_tone") {
console.log("Analizando emotion tone..." + JSON.stringify(category));

                    // find the emotion with the highest confidence
                    var max = category.tones.reduce(function(a, b) {
                        return (a.score > b.score) ? a : b;
                    });
console.log("SCORE: " + JSON.stringify(max))

                    // make sure we really are confident
                    if (max.score) {
console.log("entrar a la funcion")
                        shineForEmotion(max.tone_id);
                    }
                }
            });
  
});
      } else {
console.log("frase corta")
};

    
function shineForEmotion(emotion) {
    console.log("Current emotion around is " + emotion);

    switch (emotion) {
    case 'anger':
        tj.shine('red');
        break;
    case 'joy':
        tj.shine('yellow');
        break;
    case 'fear':
        tj.shine('magenta');
        break;
    case 'disgust':
        tj.shine('green');
        break;
    case 'sadness':
        tj.shine('blue');
        break;
    default:
tj.shine('orange')
        break;
    }
}
      
});


