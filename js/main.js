document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  
    const backToTopLink = document.querySelector('.back-to-top');
    if (backToTopLink) {
      backToTopLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  });

document.addEventListener('DOMContentLoaded', function() {
  const likeButtons = document.querySelectorAll('.blog-card__button[title="Me gusta"]');
  
  const saveButtons = document.querySelectorAll('.blog-card__button[title="Guardar"]');
  
  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('active');
      
      const counter = this.querySelector('span');
      let count = parseInt(counter.textContent);
      
      if (this.classList.contains('active')) {
        counter.textContent = count + 1;
      } else {
        counter.textContent = Math.max(0, count - 1);
      }
    });
  });

  saveButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('active');
      
      if (this.classList.contains('active')) {
        this.setAttribute('title', 'Guardado');
      } else {
        this.setAttribute('title', 'Guardar');
      }
    });
  });
});