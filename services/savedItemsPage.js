import { savedItems } from './SavedItems.js'; // Importación correcta de la exportación nombrada
// import createBlogPostCard from '../blocks/blog/blog-post-card.js'; // Elimina esta línea

export function initSavedItemsPage() {
    const savedArticlesContainer = document.getElementById('saved-items-container'); // Corregido el ID aquí
    const noSavedItemsMessage = document.getElementById('no-saved-items-message');

    // Limpiar el contenedor antes de renderizar
    savedArticlesContainer.innerHTML = '';

    const items = savedItems.getSavedItems(); // Cambiado de getAllItems() a getSavedItems()

    if (items.length === 0) {
        noSavedItemsMessage.style.display = 'block';
        savedArticlesContainer.style.display = 'none';
    } else {
        noSavedItemsMessage.style.display = 'none';
        savedArticlesContainer.style.display = 'grid'; // O el display que uses para tus tarjetas

        items.forEach(blog => {
            const card = document.createElement('blog-post-card');
            card.setAttribute('date', new Date(blog.publish_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }));
            card.setAttribute('title', blog.title);
            card.setAttribute('description', blog.overview);
            card.setAttribute('technologies', blog.technologies.join(', '));
            savedArticlesContainer.appendChild(card);
        });
    }

    // Opcional: Escuchar cambios en savedItems para actualizar la vista dinámicamente
    savedItems.addObserver(() => {
        // Volver a renderizar la página si los elementos guardados cambian
        initSavedItemsPage();
    });
}