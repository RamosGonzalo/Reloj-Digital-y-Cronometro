const mostrarReloj = () => {
    let fecha = new Date();
    let hr = formatoHora(fecha.getHours());
    let min = formatoHora(fecha.getMinutes());
    let seg = formatoHora(fecha.getSeconds());
    document.getElementById('hora').innerHTML = `${hr}:${min}:${seg}`;
    
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    let diaSemana = dias[fecha.getDay()];
    let dia = fecha.getDate();
    let mes = meses[fecha.getMonth()];
    let año = fecha.getFullYear();
    let fechaTexto = `${diaSemana}, ${dia} de ${mes} de ${año}`;
    document.getElementById('fecha').innerHTML = fechaTexto;
};

const formatoHora = (hora) => {
    if (hora < 10)
    {
        hora = '0' + hora;
    }
    return hora;
};

setInterval(mostrarReloj, 1000);

let cronometroInterval;
let cronometroActivo = false;
let tiempo = { horas: 0, minutos: 0, segundos: 0, centesimas: 0 };

function iniciarCronometro() {
    const boton = document.getElementById('boton-cronometro-iniciar');

    if (!cronometroActivo) {
        cronometroActivo = true;
        boton.textContent = 'Pausar';
        cronometroInterval = setInterval(() => {
            actualizarCronometro();
        }, 10);
    } else {
        cronometroActivo = false;
        boton.textContent = 'Iniciar';
        clearInterval(cronometroInterval);
    }
}

function actualizarCronometro() {
    tiempo.centesimas++;

    if (tiempo.centesimas === 100) {
        tiempo.centesimas = 0;
        tiempo.segundos++;
    }
    if (tiempo.segundos === 60) {
        tiempo.segundos = 0;
        tiempo.minutos++;
    }
    if (tiempo.minutos === 60) {
        tiempo.minutos = 0;
        tiempo.horas++;
    }

    mostrarCronometro();
}

function reiniciarCronometro() {
    cronometroActivo = false;
    clearInterval(cronometroInterval);
    tiempo = { horas: 0, minutos: 0, segundos: 0, centesimas: 0 };
    mostrarCronometro();
    document.getElementById('boton-cronometro-iniciar').textContent = 'Iniciar';
}

function mostrarCronometro() {
    const { horas, minutos, segundos, centesimas } = tiempo;
    const formatoTiempo = (valor) => (valor < 10 ? `0${valor}` : valor);
    document.getElementById('contador').innerHTML = 
        `${formatoTiempo(horas)}:${formatoTiempo(minutos)}:${formatoTiempo(segundos)}<span class="milisegundos">.${formatoTiempo(centesimas)}</span>`;
}