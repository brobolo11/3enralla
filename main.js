$(document).ready(function() {
    var jugador1 = prompt("Ingrese el nombre del Jugador 1:");
    var jugador2 = prompt("Ingrese el nombre del Jugador 2:");

    $('.jugador1').prepend('<img src="./imagenes/OGande.png" alt="">').append(jugador1);
    $('.jugador2').prepend('<img src="./imagenes/xgrande.png" alt="">').append(jugador2);

    var jugadorActual = jugador1; // Comienza el juego con el jugador 1
    var ganador = false; // Variable para verificar si hay un ganador

    // Función para alternar entre jugadores
    function alternarJugador() {
        jugadorActual = (jugadorActual === jugador1) ? jugador2 : jugador1;
    }

    // Función para verificar si hay un ganador
    function verificarGanador() {
        // Array que contiene todas las combinaciones ganadoras
        var combinacionesGanadoras = [
            ['.casilla1', '.casilla2', '.casilla3'],
            ['.casilla4', '.casilla5', '.casilla6'],
            ['.casilla7', '.casilla8', '.casilla9'],
            ['.casilla1', '.casilla4', '.casilla7'],
            ['.casilla2', '.casilla5', '.casilla8'],
            ['.casilla3', '.casilla6', '.casilla9'],
            ['.casilla1', '.casilla5', '.casilla9'],
            ['.casilla3', '.casilla5', '.casilla7']
        ];

        // Iterar sobre las combinaciones ganadoras
        combinacionesGanadoras.forEach(function(comb) {
            var casilla1 = $(comb[0]).find('img').attr('src');
            var casilla2 = $(comb[1]).find('img').attr('src');
            var casilla3 = $(comb[2]).find('img').attr('src');

            // Si las tres casillas tienen la misma imagen y no están vacías, hay un ganador
            if (casilla1 !== undefined && casilla1 === casilla2 && casilla1 === casilla3) {
                ganador = true;
                setTimeout(() => {
                    alert("¡" + jugadorActual + " ha ganado!");
                }, 500);
                return;
            }
        });
    }

    // Función para manejar el clic en las casillas
    $('.tablero div').click(function() {
        // Si ya hay un ganador o la casilla ya está marcada, no hacer nada
        if (ganador || $(this).find('img').attr('src') !== undefined) return;

        // Obtener la imagen a colocar en la casilla según el jugador actual
        var foto = (jugadorActual === jugador1) ? './imagenes/OGande.png' : './imagenes/xgrande.png';

        // Colocar la imagen en la casilla y cambiar al siguiente jugador
        $(this).append('<img src="' + foto + '">');
        verificarGanador();
        if (!ganador) alternarJugador();
    });
});
