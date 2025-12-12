
const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,40}$/;
const regexTelefono = /^[0-9]{7,10}$/;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,40}$/;
const regexUsuario = /^[A-Za-z0-9]{3,20}$/;
const regexPassword = /^.{3,20}$/;


var sesionActiva = false;

var dueños = [];
var mascotas = [];
var agenda = [];
var catalogo = [
    {nombre:"Baño", precio:30},
    {nombre:"Corte de Pelo", precio:40},
    {nombre:"Shampoo", precio:25},
    {nombre:"Juguete", precio:15}
];
var carrito = [];


function login() {
    var u = document.getElementById("usuario").value;
    var p = document.getElementById("password").value;
    var msg = document.getElementById("loginError");

    if (!regexUsuario.test(u)) { msg.innerHTML = "Usuario inválido"; return false; }
    if (!regexPassword.test(p)) { msg.innerHTML = "Contraseña inválida"; return false; }

    if (u === "admin" && p === "123") {
        sesionActiva = true;
        window.location = "registro.html";
    } else {
        msg.innerHTML = "Credenciales incorrectas";
    }

    return false; // evita recargar la página
}

// REGISTRO
function registrar() {
    var dn = document.getElementById("duenioNombre").value;
    var dt = document.getElementById("duenioTel").value;
    var dc = document.getElementById("duenioCorreo").value;

    var mn = document.getElementById("mascotaNombre").value;
    var me = document.getElementById("mascotaEspecie").value;
    var mr = document.getElementById("mascotaRaza").value;

    var msg = document.getElementById("registroMsg");

    if (!regexNombre.test(dn)) { msg.innerHTML = "Nombre de dueño inválido."; return false; }
    if (!regexTelefono.test(dt)) { msg.innerHTML = "Teléfono inválido (7-10 dígitos)."; return false; }
    if (!regexCorreo.test(dc)) { msg.innerHTML = "Correo inválido."; return false; }
    if (!regexTexto.test(mn)) { msg.innerHTML = "Nombre de mascota inválido."; return false; }
    if (!regexTexto.test(me)) { msg.innerHTML = "Especie inválida."; return false; }
    if (!regexTexto.test(mr)) { msg.innerHTML = "Raza inválida."; return false; }

    // Guardar en vectores/objetos
    dueños[dueños.length] = {nombre: dn, telefono: dt, correo: dc};
    mascotas[mascotas.length] = {nombre: mn, especie: me, raza: mr};

    msg.innerHTML = "Registro guardado correctamente.";
    return false;
}

// AGENDA
function agendar() {
    var fecha = document.getElementById("fecha").value;
    var hora = document.getElementById("hora").value;
    var masc = document.getElementById("mascotaAgenda").value;
    var serv = document.getElementById("servicio").value;

    var msg = document.getElementById("agendaMsg");

    if (!fecha) { msg.innerHTML = "Debe seleccionar una fecha."; return false; }
    if (!hora) { msg.innerHTML = "Debe seleccionar una hora."; return false; }
    if (!regexTexto.test(masc)) { msg.innerHTML = "Nombre de mascota inválido."; return false; }

    agenda[agenda.length] = {fecha: fecha, hora: hora, mascota: masc, servicio: serv};

    msg.innerHTML = "Servicio agendado correctamente.";
    return false;
}


function cargarCatalogo() {
    var cont = document.getElementById("catalogo");
    if (!cont) return;

    var html = "";
    for (var i = 0; i < catalogo.length; i++) {
        html += "<div>" +
                    "<p>" + catalogo[i].nombre + " - " + catalogo[i].precio + " Bs</p>" +
                    "<button onclick='comprar(" + i + ")'>Comprar</button>" +
                 "<hr></div>";
    }
    cont.innerHTML = html;
}


function limpiarCatalogo() {
    var cont = document.getElementById("catalogo");
    if (!cont) return;
    cont.innerHTML = "";
}


function comprar(i) {
    carrito[carrito.length] = {nombre: catalogo[i].nombre, precio: catalogo[i].precio, subtotal: catalogo[i].precio};
    mostrarCarrito();
}


function mostrarCarrito() {
    var lista = document.getElementById("carritoLista");
    var total = document.getElementById("total");

    var html = "";
    var suma = 0;

    for (var i = 0; i < carrito.length; i++) {
        html += carrito[i].nombre + " - Precio: " + carrito[i].precio + " Bs<br>Subtotal: " + carrito[i].subtotal + " Bs<hr>";
        suma += carrito[i].subtotal;
    }

    lista.innerHTML = html;
    total.innerHTML = "Total: " + suma + " Bs";
}


function cerrarSesion() {
    sesionActiva = false;
    window.location = "index.html";
}


window.onload = function() {
    cargarCatalogo();
    mostrarCarrito();
}

