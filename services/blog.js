import { cargarEntradasBlog, darLike, toggleGuardar, blogApi } from './api.js';
import LocalStorage from './LocalStorage.js';


blogApi.addObserver(LocalStorage.updateBlogs.bind(LocalStorage));

export async function initBlogPage(blogGridContainer) {
    if (!blogGridContainer) {
        console.error('Contenedor para blog no proporcionado o no encontrado.');
        return;
    }
    blogGridContainer.innerHTML = ''; 

    try {
        const blogs = await cargarEntradasBlog();

        if (!blogs || blogs.length === 0) {
            blogGridContainer.innerHTML = '<p>No hay artículos para mostrar.</p>';
            return;
        }
        
        blogs.forEach(blog => {
            const article = document.createElement('article');
            article.className = 'blog-card';
            article.innerHTML = `
                <img class="blog-card__image" src="${blog.imageURL}" alt="${blog.title}">
                <time class="blog-card__date" datetime="${blog.publish_date}">
                    ${new Date(blog.publish_date).toLocaleDateString('es-ES', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    })}
                </time>
                <h3 class="blog-card__title">${blog.title}</h3>
                <p class="blog-card__description">${blog.overview}</p>
                <p class="blog-card__technologies">Tecnologías: ${blog.technologies.join(', ')}</p>
                <div class="blog-card__actions">
                    <button class="blog-card__button blog-card__button--like ${blog.likes_count > 0 ? 'active' : ''}" title="Me gusta">
                        <i class="fas fa-heart"></i> 
                        <span>${blog.likes_count}</span>
                    </button>
                    <button class="blog-card__button blog-card__button--save ${blog.saved ? 'active' : ''}" title="Guardar">
                        <i class="fas fa-bookmark"></i>
                    </button>
                </div>
            `;
            
            const likeButton = article.querySelector('.blog-card__button--like');
            likeButton.addEventListener('click', () => handleLikeInteraction(blog.id, likeButton));

            const saveButton = article.querySelector('.blog-card__button--save');
            saveButton.addEventListener('click', () => handleSaveInteraction(blog.id, saveButton));
            
            blogGridContainer.appendChild(article);
        });
    } catch (error) {
        console.error('Error al cargar los blogs en initBlogPage:', error);
        if (blogGridContainer) {
            blogGridContainer.innerHTML = '<p>Error al cargar los artículos. Intente más tarde.</p>';
        }
    }
}

async function handleLikeInteraction(blogId, button) {
    try {
        const success = await darLike(blogId);
        if (success) {
            const span = button.querySelector('span');
            if (span) {
                const currentLikes = parseInt(span.textContent);
                span.textContent = currentLikes + 1;
            }
            button.classList.add('active');
        } else {
            console.warn(`No se pudo dar like al blog ${blogId} vía API.`);
        }
    } catch (error) {
        console.error('Error en handleLikeInteraction:', error);
    }
}

async function handleSaveInteraction(blogId, button) {
    try {
        const success = await toggleGuardar(blogId)
        if (success) {
            button.classList.toggle('active');
            button.setAttribute('title', button.classList.contains('active') ? 'Guardado' : 'Guardar');
        } else {
            console.warn(`No se pudo guardar/desguardar el blog ${blogId} vía API.`);
        }
    } catch (error) {
        console.error('Error en handleSaveInteraction:', error);
    }
}