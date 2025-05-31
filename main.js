import Router from './services/Router.js';
import { initBlogPage } from './services/blog.js';
import { initSavedItemsPage } from './services/savedItemsPage.js'; // Importar la nueva función

// Cambiar 'DOMContentLoaded' a 'window.onload'
window.onload = function() {

    const backToTopLink = document.querySelector('.footer__link[href="#top"]');
    if (backToTopLink) {
      backToTopLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    
    Router.init({
        '/': 'hero-template',
        '/proyectos': 'proyectos-template',
        '/blog': initBlogPage,
        '/guardados': initSavedItemsPage,
        '/sobre-mi': 'sobre-mi-template',
        '/contacto': 'contacto-template'
    });

    // Asegurarse de que Router.go se llama después de que todo esté cargado
    Router.go(location.pathname);

};