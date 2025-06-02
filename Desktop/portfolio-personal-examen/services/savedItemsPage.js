import { savedItems } from './SavedItems.js';

export function initSavedItemsPage() {
    const savedArticlesContainer = document.getElementById('saved-items-container');
    const noSavedItemsMessage = document.getElementById('no-saved-items-message');
    const searchBar = document.querySelector('search-bar');

    let items = savedItems.getSavedItems();

    const renderFilteredItems = (filterText = '') => {
        const filteredItems = items.filter(blog => 
            blog.title.toLowerCase().includes(filterText.toLowerCase()) ||
            blog.overview.toLowerCase().includes(filterText.toLowerCase()) ||
            blog.technologies.some(tech => tech.toLowerCase().includes(filterText.toLowerCase()))
        );

        savedArticlesContainer.innerHTML = '';

        if (filteredItems.length === 0) {
            noSavedItemsMessage.style.display = 'block';
            savedArticlesContainer.style.display = 'none';
        } else {
            noSavedItemsMessage.style.display = 'none';
            savedArticlesContainer.style.display = 'grid';

            filteredItems.forEach(blog => {
                const card = document.createElement('blog-post-card');
                card.setAttribute('date', new Date(blog.publish_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }));
                card.setAttribute('title', blog.title);
                card.setAttribute('description', blog.overview);
                card.setAttribute('technologies', blog.technologies.join(', '));
                savedArticlesContainer.appendChild(card);


            });
        }
    };


    if (searchBar) {
        setTimeout(() => {
            if (searchBar.input) {
                searchBar.input.addEventListener('input', (event) => {
                    renderFilteredItems(event.target.value);
                });
            } else {
                console.warn('searchBar.input no está disponible. El Custom Element podría no haberse inicializado completamente.');
            }
        }, 0);
    }


    renderFilteredItems();

    savedItems.addObserver(() => {

        items = savedItems.getSavedItems();
        renderFilteredItems(searchBar && searchBar.input ? searchBar.input.value : '');
    });
}