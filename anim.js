// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Letras y tiempos aproximados
var lyricsData = [
  { text: "It might not be the right time", time: 75 },
  { text: "I might not be the right one", time: 80 },

  { text: "But there's something about us I want to say", time: 85 },
  { text: "'Cause there's something between us anyway", time: 90 },

  { text: "I might not be the right one", time: 96 },
  { text: "It might not be the right time", time: 100 },

  { text: "But there's something about us I've got to do", time:105 },
  { text: "Some kind of secret I will share with you", time: 110 },


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