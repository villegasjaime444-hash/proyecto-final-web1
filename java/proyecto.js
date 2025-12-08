// DATOS DEL JUGADOR (SE GUARDAN)

if (!localStorage.getItem("jugador")) {
    const jugadorInicial = {
        nombre: "Invitado",
        password: "1234",
        saldo: 2500,
        partidas: 0,
        ganadas: 0,
        perdidas: 0,
        logeado: true
    };
    localStorage.setItem("jugador", JSON.stringify(jugadorInicial));
}

// OBTENER JUGADOR

const jugador = JSON.parse(localStorage.getItem("jugador"));

// PROTECCIÓN DE LOGIN

if (!jugador || !jugador.logeado) {
    window.location.href = "login.html";
}

// MOSTRAR SALDO EN HEADER

const saldoHeader = document.getElementById("saldo-header");
if (saldoHeader) {
    saldoHeader.textContent = jugador.saldo;
}

// MOSTRAR NOMBRE EN HEADER

const nombreUsuario = document.getElementById("nombre-usuario");
if (nombreUsuario) {
    nombreUsuario.textContent = jugador.nombre;
}

// MENÚ SUPERIOR

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const seccion = link.textContent.trim();

        if (seccion === "Casino") window.location.href = "index.html";
        if (seccion === "Deportes") window.location.href = "deportes.html";
        if (seccion === "En Vivo") window.location.href = "envivo.html";
        if (seccion === "Promociones") window.location.href = "promociones.html";
    });
});

// BOTÓN DEPOSITAR

const btnDepositar = document.querySelector(".depositar");
if (btnDepositar) {
    btnDepositar.addEventListener("click", () => {
        window.location.href = "depositar.html";
    });
}

// BOTÓN RECLAMAR BONO

const btnBono = document.getElementById("reclamar-bono");
if (btnBono) {
    btnBono.addEventListener("click", () => {
        window.location.href = "bono.html";
    });
}

// CATEGORÍAS

document.querySelectorAll(".categorias button").forEach(btn => {
    btn.addEventListener("click", () => {
        const categoria = btn.textContent.trim();

        if (categoria === "Populares") window.location.href = "populares.html";
        if (categoria === "Slots") window.location.href = "slots.html";
        if (categoria === "Mesa") window.location.href = "mesa.html";
        if (categoria === "Dados") window.location.href = "dados.html";
        if (categoria === "Deportes") window.location.href = "deportes.html";
        if (categoria === "Nuevos") window.location.href = "nuevos.html";
    });
});

// MESAS EN VIVO

document.querySelectorAll(".mesa button").forEach(btn => {
    btn.addEventListener("click", () => {
        const juego = btn.parentElement.querySelector("h3").textContent;

        if (juego.includes("Ruleta")) window.location.href = "ruleta.html";
        if (juego.includes("Blackjack")) window.location.href = "blackjack.html";
        if (juego.includes("Poker")) window.location.href = "poker.html";
    });
});

// BOTÓN PERFIL

const btnPerfil = document.querySelector(".usuario");
if (btnPerfil) {
    btnPerfil.addEventListener("click", () => {
        window.location.href = "perfil.html";
    });
}

// CERRAR SESIÓN

function cerrarSesion() {
    const jugador = JSON.parse(localStorage.getItem("jugador"));
    jugador.logeado = false;
    localStorage.setItem("jugador", JSON.stringify(jugador));
    window.location.href = "login.html";
}

// MENÚ HAMBURGUESA FUNCIONAL

const hamburguesa = document.getElementById("hamburguesa");
const menu = document.getElementById("menu");

if (hamburguesa && menu) {
    hamburguesa.addEventListener("click", () => {
        menu.classList.toggle("activo");
    });
}
