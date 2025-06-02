import Router from './services/Router.js';
import { initBlogPage } from './services/blog.js';
import { initSavedItemsPage } from './services/savedItemsPage.js'; 


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

    Router.go(location.pathname);

    window.addEventListener('keydown', (event) => {

        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
            event.preventDefault();
            const searchBar = document.querySelector('search-bar');
            if (searchBar && searchBar.input) {
                searchBar.input.focus();
            }
        }
    });

};