// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Letras y tiempos aproximados
var lyricsData = [
  { text: "It might not be the right time", time: 15 },
  { text: "I might not be the right one", time: 23 },

  { text: "But there's something about us I want to say", time: 30 },
  { text: "'Cause there's something between us anyway", time: 38 },

  { text: "I might not be the right one", time: 45 },
  { text: "It might not be the right time", time: 53 },

  { text: "But there's something about us I've got to do", time: 60 },
  { text: "Some kind of secret I will share with you", time: 68 },

  // Interludio
  { text: "", time: 75 },

  { text: "It might not be the right time", time: 105 },
  { text: "I might not be the right one", time: 113 },

  { text: "But there's something about us I want to say", time: 120 },
  { text: "'Cause there's something between us anyway", time: 128 },

  // Puente instrumental
  { text: "", time: 135 },

  // Outro
  { text: "", time: 165 }
];


// Animar las letras
function updateLyrics() {
  var time = audio.currentTime;

  var currentLine = lyricsData.find(
    (line, index) => {
      var nextLine = lyricsData[index + 1];

      return (
        time >= line.time &&
        (!nextLine || time < nextLine.time)
      );
    }
  );

  if (currentLine && currentLine.text !== "") {

    // Tiempo transcurrido desde que apareció la línea
    var elapsed = time - currentLine.time;

    // Duración del fade-in
    var fadeInDuration = 0.3;

    // Calcular opacidad
    var opacity = Math.min(
      1,
      elapsed / fadeInDuration
    );

    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;

  } else {

    // Ocultar durante los interludios
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}


// Actualizar las letras conforme avanza el audio
audio.addEventListener("timeupdate", updateLyrics);


// Función para ocultar el título
function ocultarTitulo() {

  var titulo = document.querySelector(".titulo");

  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards";

  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000);
}


// Ocultar título aproximadamente al terminar
setTimeout(ocultarTitulo, 230000);