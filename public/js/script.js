//header sticky
window.onscroll = () => {
  let headerS = document.querySelector('.header');
  headerS.classList.toggle('sticky', window.scrollY > 100)
//remove navbar responsive
  menuIcon.classList.remove('fa-x');
  navbar.classList.remove('active');
}
//HEADER Y FOOTER DINAMICOS

//Header general
//icon responsive
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('fa-x');
    navbar.classList.toggle('active');
}
//scroll
//Recargar pagina hacia arriba
/*window.onload = function() {
  window.scrollTo(0, 0);
}
*/
/*
//cambiar paginas
// Obtener todos los elementos de enlace
const links = document.querySelectorAll('a');

// Agregar un controlador de eventos de clic a cada enlace
links.forEach(link => {
  link.addEventListener('click', e => {
    // Prevenir el comportamiento predeterminado de la etiqueta a
    e.preventDefault();

    // Obtener la dirección URL del enlace
    const href = link.getAttribute('href');

    // Cambiar la ubicación actual de la página a la dirección URL del enlace
    window.location.href = href;
    
  });
});

*/