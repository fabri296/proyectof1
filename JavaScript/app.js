
const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,40}$/;
const regexTelefono = /^[0-9]{7,10}$/;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,40}$/;
const regexUsuario = /^[A-Za-z0-9]{3,20}$/;
const regexPassword = /^.{3,20}$/;

let sesionActiva = false;

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", e => {
            e.preventDefault();

            let u = document.getElementById("usuario").value;
            let p = document.getElementById("password").value;

            if (!regexUsuario.test(u)) {
                document.getElementById("loginError").textContent = "Usuario inválido";
                return;
            }

            if (!regexPassword.test(p)) {
                document.getElementById("loginError").textContent = "Contraseña inválida";
                return;
            }

            // login simulado
            if (u === "admin" && p === "123") {
                sesionActiva = true;
                location.assign("registro.html");
            } else {
                document.getElementById("loginError").textContent = "Credenciales incorrectas";
            }
        });
    }

    cargarCatalogo();
});


let dueños = [];
let mascotas = [];

function registrar() {
    let dn = document.getElementById("duenioNombre").value;
    let dt = document.getElementById("duenioTel").value;
    let dc = document.getElementById("duenioCorreo").value;

    let mn = document.getElementById("mascotaNombre").value;
    let me = document.getElementById("mascotaEspecie").value;
    let mr = document.getElementById("mascotaRaza").value;

    let msg = document.getElementById("registroMsg");


    if (!regexNombre.test(dn)) {
        msg.textContent = "Nombre de dueño inválido.";
        return;
    }

    if (!regexTelefono.test(dt)) {
        msg.textContent = "Teléfono inválido (7-10 dígitos).";
        return;
    }

    if (!regexCorreo.test(dc)) {
        msg.textContent = "Correo inválido.";
        return;
    }

    
    if (!regexTexto.test(mn)) {
        msg.textContent = "Nombre de mascota inválido.";
        return;
    }

    if (!regexTexto.test(me)) {
        msg.textContent = "Especie inválida.";
        return;
    }

    if (!regexTexto.test(mr)) {
        msg.textContent = "Raza inválida.";
        return;
    }

    
    dueños.push([dn, dt, dc]);
    mascotas.push([mn, me, mr]);

    msg.textContent = "Registro guardado correctamente.";
}

let agenda = [];

function agendar() {
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let masc = document.getElementById("mascotaAgenda").value;
    let serv = document.getElementById("servicio").value;

    let msg = document.getElementById("agendaMsg");

    if (!fecha) {
        msg.textContent = "Debe seleccionar una fecha.";
        return;
    }

    if (!hora) {
        msg.textContent = "Debe seleccionar una hora.";
        return;
    }

    if (!regexTexto.test(masc)) {
        msg.textContent = "Nombre de mascota inválido.";
        return;
    }

    agenda.push([fecha, hora, masc, serv]);

    msg.textContent = "Servicio agendado correctamente.";
}


let catalogo = [
    ["Baño", 30],
    ["Corte de Pelo", 40],
    ["Shampoo", 25],
    ["Juguete", 15]
];

let carrito = [];

function cargarCatalogo() {
    let cont = document.getElementById("catalogo");
    if (!cont) return;

    cont.innerHTML = "";

    for (let i = 0; i < catalogo.length; i++) {
        let item = document.createElement("div");
        item.innerHTML = `
            <p>${catalogo[i][0]} - ${catalogo[i][1]} Bs</p>
            <button onclick="comprar(${i})">Comprar</button>
            <hr>
        `;
        cont.appendChild(item);
    }
}

function comprar(i) {

    carrito.push({ 
        nombre: catalogo[i][0], 
        precio: catalogo[i][1], 
        subtotal: catalogo[i][1]  
    });

    mostrarCarrito();
}

function mostrarCarrito() {
    let lista = document.getElementById("carritoLista");
    let total = document.getElementById("total");

    lista.innerHTML = "";
    let suma = 0;

    
    for (let i = 0; i < carrito.length; i++) {
        let item = carrito[i];

        let li = document.createElement("li");
        li.innerHTML = `
            ${item.nombre} - Precio: ${item.precio} Bs  
            <br> Subtotal: ${item.subtotal} Bs
            <hr>
        `;

        lista.appendChild(li);
        suma += item.subtotal;
    }

    total.textContent = "Total: " + suma + " Bs";
}


function cerrarSesion() {
    sesionActiva = false;
    location.assign("index.html");
}
