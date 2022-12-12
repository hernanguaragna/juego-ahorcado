var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
var matrizPalabrasAleatorias = ["ARBOL", "MARTILLO","CHAPA","ALFAJOR","NEUTRON",
"ASNO","VIENTO","CIELO","CINTA","ARROZ","CASTILLO","PAYASO","GRILLO","KOALA","ORACLE","ALURA",
"VERANO","MUSICA","FUTBOL","NIEVE","LUNA","CUNA","ESPUMA","YESO","PASTO","PELOTA","ZAPATO",
"CUCHARA","MATE","PLAYA","ARENA","BRILLO","CHACRA","IDIOMA","FLAUTA","PESTAÑA","CANCHA",
"SOGA","IGLESIA","AVION","AUTOBUS","BIROME","QUESO","PEQUEÑO","CODIGO","SENCILLO","HECHIZO",
"RIVER","MADRID","AVENTURA","CENTRAL","CABLE","TIJERA","JIRAFA","BRASIL","CREMA","TERMO",
"CONTROL","REGLA","CASINO","BURBUJA","ALMOHADA","PARLANTE"];
var palabraSecreta = "";
var letraIngresada = "";
let expReg = /[A-Za-z]/;
var letrasErradas = [];
var letrasAcertadas = [];
var contador;
var errada;
var acertada;
var cantidadLetrasErradas = 0;
var cantidadLetrasAcertadas = 0;
var finDelJuego = false;
var botonDesistir = document.querySelector("#btn-desistir");
var botonNuevoJuego = document.querySelector("#btn-nuevo-juego");


function sortearPalabra() {
    palabraSecreta = seleccionarPalabraSecreta();
    dibujarLineas();
}
function pintarPantalla() {
    pincel.fillStyle = "#FADEFC";
    pincel.fillRect(0,0,800,380);
}
function dibujarHorca() {
    pincel.strokeStyle = "black";
    pincel.lineWidth = 4;
    pincel.beginPath();
    pincel.moveTo(200,90);
    pincel.lineTo(200,60);
    pincel.lineTo(60,60);
    pincel.lineTo(60,300);
    pincel.moveTo(30,300);
    pincel.lineTo(150,300);
    pincel.moveTo(105,60);
    pincel.lineTo(60,105);
    pincel.stroke();
    pincel.closePath();
    pincel.lineWidth = 2;
    pincel.beginPath();
    pincel.moveTo(40,300);
    pincel.lineTo(30,315);
    pincel.moveTo(55,300);
    pincel.lineTo(45,315);
    pincel.moveTo(70,300);
    pincel.lineTo(60,315);
    pincel.moveTo(85,300);
    pincel.lineTo(75,315);
    pincel.moveTo(100,300);
    pincel.lineTo(90,315);
    pincel.moveTo(115,300);
    pincel.lineTo(105,315);
    pincel.moveTo(130,300);
    pincel.lineTo(120,315);
    pincel.moveTo(145,300);
    pincel.lineTo(135,315);
    pincel.stroke();
    pincel.closePath();
}
function seleccionarPalabraSecreta() {
    var index = Math.floor(Math.random() * matrizPalabrasAleatorias.length);
    palabraSecreta = matrizPalabrasAleatorias[index];
    return palabraSecreta;
}
function dibujarLineas() {
    var cantidadLetras = palabraSecreta.length;
    var i = 0;
    while (i < cantidadLetras) {
        pincel.strokeStyle = "black";
        pincel.lineWidth = 1.5;
        pincel.beginPath();
        pincel.moveTo(350 + 50*i,310);
        pincel.lineTo((350 + 50*i)+40,310);
        pincel.stroke();
        i++;
    }
}
function validarLetraIngresada() {
    if ((expReg.test(letraIngresada) == true && letraIngresada.length == 1) || letraIngresada == "Ñ" || letraIngresada == "ñ") {
        letraIngresada = letraIngresada.toUpperCase();
    } else if (expReg.test(letraIngresada) == true && letraIngresada.length > 1) {
        letraIngresada = null;
    } else {
        letraIngresada = null;
        alert("Por favor, ingrese sólo letras y sin acentos!. Tampoco se admiten caracteres especiales."); 
    }
}
function chequearErrada() {
    errada = false;
    letrasErradas.forEach(element => {
        if (letraIngresada == element) {
            errada = true;
        }
    });
}
function chequearAcertada() {
    acertada = false;
    letrasAcertadas.forEach(element => {
        if (letraIngresada == element) {
            acertada = true;
        }
    });
}
function anotarLetra() {
    chequearAcertada();
    if (letraIngresada != null && acertada == false) {
        for (let i = 0; i < palabraSecreta.length; i++) {
            if (letraIngresada == palabraSecreta[i]) {
                    pincel.fillStyle = "black";
                    pincel.font = '50px serif';
                    pincel.fillText(palabraSecreta[i],350 + 50*i,300);
                    letrasAcertadas.push(letraIngresada);
                    cantidadLetrasAcertadas++;
                    if (cantidadLetrasAcertadas == palabraSecreta.length) {
                        setInterval(mostrarResultadoPositivo,300);
                        finDelJuego = true;
                        console.log(finDelJuego);
                    }
            } else {
                contador++;
                if (contador == palabraSecreta.length) {
                    chequearErrada();
                    if (errada == false) { 
                        pincel.fillStyle = "black";
                        pincel.font = '30px serif';
                        pincel.fillText(letraIngresada,360 + 50*cantidadLetrasErradas,365);
                        letrasErradas.push(letraIngresada);
                        cantidadLetrasErradas++;
                        graficar();
                    } else alert("La letra " + letraIngresada + " ya fue ingresada y no forma parte de la palabra secreta. Ingrese un nuevo caracter." );
                }
            }
        }
    } else if(acertada == true) {
        alert("Ingrese nuevas letras para descubrir la palabra secreta. La letra " + letraIngresada + " ya fue elegida anteriormente.");
    }
}
function verificarLetraIngresada(evento) {
    if (finDelJuego == false) {
        contador = 0;
        letraIngresada = evento.key;
        validarLetraIngresada();
        anotarLetra();
    }
}
function mostrarPalabraSecreta() {
    pincel.fillStyle = "black";
    pincel.font = '30px serif';
    pincel.fillText("La palabra era: "+ palabraSecreta,380,100);
}
function mostrarResultadoNegativo() {
    pincel.fillStyle = "red";
    pincel.font = '38px serif';
    pincel.fillText("¡FIN DEL JUEGO!",355,170);
    pincel.fillText("USTED HA PERDIDO",355,220);
}
function mostrarResultadoPositivo() {
    pincel.fillStyle = "green";
    pincel.font = '38px serif';
    pincel.st
    pincel.fillText("¡FELICITACIONES!",355,155);
    pincel.fillText("USTED HA GANADO",345,200);
}
function dibujarCabeza() {
    pincel.strokeStyle = "#0A3871";
    pincel.lineWidth = 3;
    pincel.moveTo(200,110);
    pincel.beginPath();
    pincel.arc(200,110,20,0,2*Math.PI);
    pincel.stroke();
}
function dibujarTronco() {
    pincel.strokeStyle = "#0A3871";
    pincel.lineWidth = 3;
    pincel.beginPath();
    pincel.moveTo(200,130);
    pincel.lineTo(200,210);
    pincel.stroke();
}
function dibujarPiernaIzq() {
    pincel.strokeStyle = "#0A3871";
    pincel.lineWidth = 3;
    pincel.beginPath();
    pincel.moveTo(200,210);
    pincel.lineTo(160,265);
    pincel.stroke();
}
function dibujarPiernaDer() {
    pincel.strokeStyle = "#0A3871";
    pincel.lineWidth = 3;
    pincel.beginPath();
    pincel.moveTo(200,210);
    pincel.lineTo(240,265);
    pincel.stroke();
}
function dibujarBrazoIzq() {
    pincel.strokeStyle = "#0A3871";
    pincel.lineWidth = 3;
    pincel.beginPath();
    pincel.moveTo(200,130);
    pincel.lineTo(160,190);
    pincel.stroke();
}
function dibujarBrazoDer() {
    pincel.strokeStyle = "#0A3871";
    pincel.lineWidth = 3;
    pincel.beginPath();
    pincel.moveTo(200,130);
    pincel.lineTo(240,190);
    pincel.stroke();
}
function dibujarAhorcado() {
    pincel.strokeStyle = "red";
    pincel.lineWidth = 3.5;
    pincel.beginPath();
    pincel.moveTo(135,130);
    pincel.lineTo(265,130);
    pincel.stroke();
}
 function graficar(){
    switch (cantidadLetrasErradas) {
        case 1:
            setTimeout(dibujarCabeza,300);
            break;
        case 2:
            setTimeout(dibujarCabeza,300);
            setTimeout(dibujarTronco,300);
            break;
        case 3:
            setTimeout(dibujarCabeza,300);
            setTimeout(dibujarTronco,300);
            setTimeout(dibujarPiernaDer,300);
            break;
        case 4:
            setTimeout(dibujarCabeza,300);
            setTimeout(dibujarTronco,300);
            setTimeout(dibujarPiernaDer,300);
            setTimeout(dibujarPiernaIzq,300);
            break;
        case 5:
            setTimeout(dibujarCabeza,300);
            setTimeout(dibujarTronco,300);
            setTimeout(dibujarPiernaDer,300);
            setTimeout(dibujarPiernaIzq,300);
            setTimeout(dibujarBrazoDer,300);
            break;
        case 6:
            setTimeout(dibujarCabeza,300);
            setTimeout(dibujarTronco,300);
            setTimeout(dibujarPiernaDer,300);
            setTimeout(dibujarPiernaIzq,300);
            setTimeout(dibujarBrazoDer,300);
            setTimeout(dibujarBrazoIzq,300);
            break;
        case 7:
            setTimeout(dibujarCabeza,300);
            setTimeout(dibujarTronco,300);
            setTimeout(dibujarPiernaDer,300);
            setTimeout(dibujarPiernaIzq,300);
            setTimeout(dibujarBrazoDer,300);
            setTimeout(dibujarBrazoIzq,300);
            setTimeout(dibujarAhorcado,300);
            setTimeout(mostrarPalabraSecreta,300);
            setTimeout(mostrarResultadoNegativo,500);
            finDelJuego = true;
            break;
    } 
}
function palabraDesafio() {
    if (localStorage.getItem("palabraDesafio") != null) {
        palabraSecreta = localStorage.getItem("palabraDesafio");
        dibujarLineas();
        localStorage.removeItem("palabraDesafio");
    } else {
        sortearPalabra();
    }
}

pintarPantalla();
dibujarHorca();
document.onkeydown = verificarLetraIngresada; 

botonDesistir.addEventListener("click", function(){
    if (finDelJuego == false) {
        var opcion = confirm("¿Estás seguro que quieres DESISTIR? La palabra secreta no será revelada!");
        if (opcion == true) {
            dibujarCabeza();
            dibujarTronco();
            dibujarPiernaDer();
            dibujarPiernaIzq();
            dibujarBrazoDer();
            dibujarBrazoIzq();
            dibujarAhorcado();
            mostrarResultadoNegativo();
            finDelJuego = true;
    		}
    }
})
botonNuevoJuego.addEventListener("click", function() {
    location.reload();
})