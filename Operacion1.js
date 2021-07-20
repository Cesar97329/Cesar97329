const database = firebase.database();
var dbRef = firebase.database();

btnArranque.addEventListener('click', (e) => {
    e.preventDefault();
    var modo = document.getElementById('cmbModos');
    var tiempo = document.getElementById('segundos');
    var giro = document.getElementById('cmbGiro');
    var vel = document.getElementById('cmbVelocidad');

    database.ref('Arranque/').set({
        Arranque: 1
    });
    database.ref('Modo/').set({
        Modo: modo.value
    });
    database.ref('Tiempo/').set({
        Tiempo: tiempo.value
    });
    database.ref('Giro/').set({
        Giro: giro.value
    });
    database.ref('Velocidad/').set({
        Velocidad: vel.value
    });
});

var mov = dbRef.ref('lectura2')
var paro= dbRef.ref('PEmergencia/PEmergencia')

mov.on('value', function(snap) {
    if(snap.val()>0)
    {
        var led = document.getElementById('led_1');
        led.src = "ledverde.png";
        var led = document.getElementById('led_2');
        led.src = "ledblanco.png";
    }
    else
    {
        var led = document.getElementById('led_1');
        led.src = "ledblanco.png";
        var led = document.getElementById('led_2');
        led.src = "ledamarillo.png";
    }
})

paro.on('value', function(snap) {
    if(snap.val()>0)
    {
        var led = document.getElementById('led_3');
        led.src = "ledrojo.png";
    }
    else
    {
        var led = document.getElementById('led_3');
        led.src = "ledblanco.png";
    }
})

let temporizador = document.getElementById('temporizador');
let iniciar = document.getElementById('iniciarS');
let resetear = document.getElementById('resetear');
let grabar = document.getElementById('grabar');
let almacenarTiempos = document.getElementById('almacenarTiempos');

let tiempo = 0, intervalo = 0;
let verificador = false;

init();

function init() {
    iniciar.addEventListener('click', iniciarContador);
    resetear.addEventListener('click', resetearContador);
    grabar.addEventListener('click', grabarContador);
}

function iniciarContador() {
    if (verificador == false) {
        intervalo = setInterval(function () {
            tiempo += 0.01;
            temporizador.innerHTML = tiempo.toFixed(2);
        }, 10);
        verificador = true;
    } else {
        verificador = false;
        clearInterval(intervalo);
    }
}

function resetearContador() {
    verificador = false;
    tiempo = 0;
    temporizador.innerHTML = tiempo + '.00';
    clearInterval(intervalo);
    while(almacenarTiempos.firstChild){
        almacenarTiempos.removeChild(almacenarTiempos.firstChild);
    }
}

function grabarContador() {
    if (temporizador.textContent === '0.00') {
        console.log('click en el botón iniciar')
    }
    else {
        let p = document.createElement('ul');
        p.innerHTML = `
        <li>Tiempo : ${tiempo.toFixed(2)}</li>
    `;
        almacenarTiempos.appendChild(p);
    }

}