document.addEventListener('DOMContentLoaded', () => {
  // ====== DATOS DEL JUGADOR (SE GUARDAN SI NO EXISTE) ======
  try {
    if (!localStorage.getItem('jugador')) {
      const jugadorInicial = {
        nombre: 'Invitado',
        password: '1234',
        saldo: 2500,
        partidas: 0,
        ganadas: 0,
        perdidas: 0,
        logeado: true
      };
      localStorage.setItem('jugador', JSON.stringify(jugadorInicial));
    }
  } catch (err) {
    console.error('Error accediendo a localStorage:', err);
  }

  // ====== OBTENER JUGADOR ======
  let jugador = null;
  try {
    jugador = JSON.parse(localStorage.getItem('jugador'));
  } catch (err) {
    console.error('Error parseando jugador desde localStorage:', err);
    // Forzar crear jugador por si acaso
    jugador = {
      nombre: 'Invitado',
      saldo: 2500,
      logeado: true
    };
    localStorage.setItem('jugador', JSON.stringify(jugador));
  }

  // ====== PROTECCIÓN DE LOGIN ======
  if (!jugador || !jugador.logeado) {
    // Si no está logeado, redirigir
    window.location.href = 'login.html';
    return; // detener ejecución adicional en esta página
  }

  // ====== MOSTRAR SALDO Y NOMBRE EN HEADER (si existen los elementos) ======
  const saldoHeader = document.getElementById('saldo-header');
  if (saldoHeader) saldoHeader.textContent = jugador.saldo;

  const nombreUsuario = document.getElementById('nombre-usuario');
  if (nombreUsuario) nombreUsuario.textContent = jugador.nombre;

  // ====== MENÚ SUPERIOR (nav links) ======
 
      const seccion = link.textContent.trim();
      if (seccion === 'Casino.') window.location.href = 'index.html';
      else if (seccion === 'Deportes.') window.location.href = 'deportes.html';
      else if (seccion === 'En Vivo.') window.location.href = 'envivo.html';
      else if (seccion === 'Promociones.') window.location.href = 'promociones.html';
      // puedes añadir más rutas aquí
    });
  

  // ====== BOTÓN DEPOSITAR ======
  const btnDepositar = document.querySelector('.depositar');
  if (btnDepositar) {
    btnDepositar.addEventListener('click', () => {
      window.location.href = 'depositar.html';
    });
  }

  // ====== BOTÓN RECLAMAR BONO ======
  const btnBono = document.getElementById('reclamar-bono');
  if (btnBono) {
    btnBono.addEventListener('click', () => {
      window.location.href = 'bono.html';
    });
  }

  // ====== CATEGORÍAS ======
  document.querySelectorAll('.categorias button').forEach(btn => {
    btn.addEventListener('click', () => {
      const categoria = btn.textContent.trim();
      if (categoria === 'Populares') window.location.href = 'populares.html';
      else if (categoria === 'Slots') window.location.href = 'slots.html';
      else if (categoria === 'Mesa') window.location.href = 'mesa.html';
      else if (categoria === 'Dados') window.location.href = 'dados.html';
      else if (categoria === 'Deportes') window.location.href = 'deportes.html';
      else if (categoria === 'Nuevos') window.location.href = 'nuevos.html';
    });
  });

  // ====== MESAS EN VIVO ======
  document.querySelectorAll('.mesa button').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const h3 = parent ? parent.querySelector('h3') : null;
      const juego = h3 ? h3.textContent : '';
      if (juego.includes('Ruleta')) window.location.href = 'ruleta.html';
      else if (juego.includes('Blackjack')) window.location.href = 'blackjack.html';
      else if (juego.includes('Poker')) window.location.href = 'poker.html';
    });
  });

  // ====== BOTÓN PERFIL ======
  const btnPerfil = document.querySelector('.usuario');
  if (btnPerfil) {
    btnPerfil.addEventListener('click', () => {
      window.location.href = 'perfil.html';
    });
  }

  // ====== CERRAR SESIÓN ======
  function cerrarSesion() {
    try {
      const stored = localStorage.getItem('jugador');
      if (stored) {
        const j = JSON.parse(stored);
        j.logeado = false;
        localStorage.setItem('jugador', JSON.stringify(j));
      }
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
    window.location.href = 'login.html';
  }
  // Exponer la función si la necesitas desde HTML: onclick="cerrarSesion()"
  window.cerrarSesion = cerrarSesion;

  // ====== MENÚ HAMBURGUESA FUNCIONAL ======
  const hamburguesaEl = document.getElementById('hamburguesa');
  const menuEl = document.getElementById('menu');
  if (hamburguesaEl && menuEl) {
    hamburguesaEl.addEventListener('click', () => {
      menuEl.classList.toggle('activo');
    });
  }

  // Si tienes otro botón para el menú, fíjate que no re-declaramos la variable "menu"
  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn && menuEl) {
    menuBtn.addEventListener('click', () => {
      menuEl.classList.toggle('active');
    });
  }

  // ====== SLIDER AUTOMÁTICO + BOTONES (protegido si faltan elementos) ======
  const slides = document.querySelectorAll('.slide');
  const btnPrev = document.getElementById('prev');
  const btnNext = document.getElementById('next');
  let index = 0;
  let sliderInterval = null;

  function mostrarSlide(i) {
    if (!slides || slides.length === 0) return;
    slides.forEach(slide => slide.classList.remove('active'));
    const safeIndex = ((i % slides.length) + slides.length) % slides.length;
    slides[safeIndex].classList.add('active');
    index = safeIndex;
  }

  // Inicializar slider solo si hay slides
  if (slides && slides.length > 0) {
    mostrarSlide(index);

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        mostrarSlide(index + 1);
        restartInterval();
      });
    }
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        mostrarSlide(index - 1);
        restartInterval();
      });
    }

    // Automático cada 3 segundos
    function startInterval() {
      if (sliderInterval) clearInterval(sliderInterval);
      sliderInterval = setInterval(() => {
        mostrarSlide(index + 1);
      }, 3000);
    }
    function restartInterval() {
      startInterval();
    }

    startInterval();
  }



