var nuevaPalabra = document.querySelector("#nueva-palabra");
var botonGuardarEmpezar = document.querySelector("#btn-guardar-empezar");
var error = document.querySelector("#error");
var validar;
let expReg = /[A-Z]/;

nuevaPalabra.addEventListener("input", function(){    
    error.textContent ="";
    if (this.value.length <= 8) {
        for (let i = 0; i < this.value.length; i++) {
            if (expReg.test(this.value[i]) == false && this.value[i] != "Ñ") {
                error.textContent = "Por favor, ingrese solo letras MAYUSCULAS, sin acentos ni caracteres especiales.";
                validar = false;
                break;
            } else validar = true;
        } 
    } else {
        alert("La palabra debe tener como máximo ocho letras.");
        nuevaPalabra.value = "";
        nuevaPalabra.focus();
        validar = false;
        }
})

botonGuardarEmpezar.addEventListener("click", function(evento) {
    evento.preventDefault();
    if (validar == true) {
        var palabraDesafio = nuevaPalabra.value;
        localStorage.setItem("palabraDesafio", palabraDesafio);
        nuevaPalabra.value = "";
        location.href= "../desktops/jugar.html";
    } else {
        alert("Hay caracteres incorrectos en el campo de entrada.");
        nuevaPalabra.focus();
    }
})