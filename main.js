import Router from './services/Router.js';

document.addEventListener('DOMContentLoaded', function() {

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
    
    Router.init();

});