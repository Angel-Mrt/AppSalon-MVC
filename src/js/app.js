let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function () {
    inicarApp();
});

function inicarApp() {
    mostrarSeccion(); //Muestra y oculta las secciones
    tabs();  // Cambia la seccion cuando se presionen los tabs
    botonesPaginador(); //Muestra u Oculta el bootn de siguiente o de Atras
    paginaAnterior();
    paginaSiguiente();

    consultarAPI(); // Consulta la bd de datos desde el backend

    idCliente(); // Añade el no,bre del cliente al objeto cita
    nombreCliente(); // Añade el nombre del cliente al objeto de cita
    seleccionarFecha(); // Añade la fecha de la cita en el objeto
    seleccionaHora(); // Añade ls hora de la cita en el objeto

    mostrarResumen(); // Muestra el resumen de la cita
    
}
function mostrarSeccion() {
    // Ocultar la seccion  que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');

    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar');
    }
    //seleccionar la session con el paso...
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');

    //Quita la clase de actual al tab anterior
    const tabAnterior = document.querySelector('.actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }

    //Resalta el tab Actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function tabs() {
    const botones = document.querySelectorAll('.tabs button');
    botones.forEach(boton => {
        boton.addEventListener('click', function (e) {
            paso = parseInt(e.target.dataset.paso);
            botonesPaginador();
            mostrarSeccion(); 
        });
    })
}
function botonesPaginador() {
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if(paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion();
}

function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function () {
        
        if (paso <= pasoInicial) return;
        paso--;
        botonesPaginador();
        console.log(paso);
    })
}
function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function () {
        
        if (paso >= pasoFinal) return  ;
        paso++;
        botonesPaginador();
        //console.log(paso);
        
    })
}

async function consultarAPI() {
    try {
        const url = 'http://localhost:3002/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        
        mostrarServicios(servicios);
    } catch (error) {
        console.log(error);
    }
}
function mostrarServicios(servicios) {
    servicios.forEach(servicio => {
        const { id, nombre, precio } = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function () {
            seleccionarServicio(servicio)
        };

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);
    })
}
function seleccionarServicio(servicio) {
    const { servicios } = cita; // Proviene del la constante de cita
    const { id } = servicio; // Proviene del arreglo que contiene los datos del servicio
    // Identificar el elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio = "${id}"]`);

    // Comprobar si un servicio ya fue agergado 
    if (servicios.some(agregado => agregado.id === id)) {
        // Eliminarlo
        cita.servicios = servicios.filter(agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
    } else {
        // Agregarlo
        cita.servicios = [...servicios, servicio];
        divServicio.classList.add('seleccionado');
    }
//    console.log(cita);
}
function idCliente() {
    cita.id = document.querySelector('#id').value;
    //console.log(cita);
}
function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;
    //console.log(cita);
}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function (e) {

        const dia = new Date(e.target.value).getUTCDay();
        
        if ([6, 0].includes(dia)) {
            e.target.value = '';
            mostrarAlerta('Fines de semana no Abrimos', 'error', '.formulario');
        } else {
            cita.fecha = e.target.value;
        }
        
        
    });
}
function seleccionaHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function (e) {
        //console.log(e.target.value);
        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];
        if (hora < 10 || hora > 18) {
            e.target.value = '';
            mostrarAlerta('Hora No valida', 'error', '.formulario');
        } else {
            cita.hora = e.target.value;
        }

    })
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
    // Previene que se genere mas de una alerta
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    // Scripting para crear la alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    //const formulario1 = document.querySelector('#paso-2 P');
    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if (desaparece) {
           //Eliminar la Alerta
    setTimeout(() => {
        alerta.remove();
    }, 3000);
    }

}

function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen');

    // Limpiar el contenido de Resumen

    while (resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
    }
    
    if (Object.values(cita).includes('') && cita.servicios.length === 0) {
        mostrarAlerta('Es necesario Agregar los servicios, Fecha Y Hora', 'error', '.contenido-resumen', false);
    } else if (Object.values(cita).includes('') ) {
        mostrarAlerta('Debe de Agregar Fecha y Hora de su cita', 'error', '.contenido-resumen', false);
    } else if (cita.servicios.length === 0) {
        mostrarAlerta('Debe de Agregar almenos un servicio', 'error', '.contenido-resumen', false);
    } else {
        // Formatear el div de Resumen
        const { nombre, fecha, hora, servicios } = cita;

        // Heading para servicios en Resumen
        const headingServicios = document.createElement('H3');
        headingServicios.textContent = 'Resumen de Servicios';
        resumen.appendChild(headingServicios);


        servicios.forEach(servicio => {
            const { id, precio, nombre } = servicio
            
            const contenedorServicio = document.createElement('DIV');
            contenedorServicio.classList.add('contenedor-servicio');

            const textoServicio = document.createElement('P');
            textoServicio.textContent = nombre;
            
            const precioServicio = document.createElement('P');
            precioServicio.innerHTML = `<span>Precio: </span> $${precio}`;

            contenedorServicio.appendChild(textoServicio);
            contenedorServicio.appendChild(precioServicio);

            resumen.appendChild(contenedorServicio);
        });

         // Heading para Datos de Usuario en Resumen
        const headingCita = document.createElement('H3');
        headingCita.textContent = 'Resumen de Cita';
        resumen.appendChild(headingCita);

        const nombreCliente = document.createElement('P');
        nombreCliente.innerHTML = `<span>Nombre: </span> ${nombre}`;

        // FOrmatear la fecha en español
        const fechaObj = new Date(fecha);
        const mes = fechaObj.getMonth();
        const dia = fechaObj.getDate() +2 ;
        const year = fechaObj.getFullYear();

        const fechaUTC = new Date(Date.UTC(year, mes, dia));
        const opciones = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}

        const fechaFormateada = fechaUTC.toLocaleDateString('es-MX', opciones);
        //console.log(fechaFormateada);

        const fechaCita = document.createElement('P');
        fechaCita.innerHTML = `<span>Fecha: </span> ${fechaFormateada}`;

        const horaCita = document.createElement('P');
        horaCita.innerHTML = `<span>Hora: </span> ${hora} Horas`;

        // Boton para Crear una cita
        const botonReservar = document.createElement('BUTTON');
        botonReservar.classList.add('boton');
        botonReservar.textContent = 'Reservar Cita';
        botonReservar.onclick = reservarCita;

        resumen.appendChild(nombreCliente);
        resumen.appendChild(fechaCita);
        resumen.appendChild(horaCita);
        resumen.appendChild(botonReservar);
    }
}

async function reservarCita() {
    const {id, nombre, fecha, hora, servicios } = cita;
    const idServicios = servicios.map(servicio => servicio.id);

    const datos = new FormData();
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);
    //console.log([...datos]);

    try {
        // Peticion hasta la API
        const url = 'http://localhost:3002/api/citas';
        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });

        const resultado = await respuesta.json();
        console.log(resultado.resultado);

        if (resultado.resultado) {
            Swal.fire({
            icon: "success",
            title: "Cita Creada",
            text: "Tu cita fue creada correctamente",
            button: 'OK'
            }).then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
        }

    } catch (error) {
        Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al guardar la cita"
        });
    }
    //console.log([...datos]);
}


