document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../data/blogs.json');
        const data = await response.json();
        const blogGrid = document.getElementById('blogGrid');
        
        data.results.forEach(blog => {
            const article = document.createElement('article');
            article.className = 'blog-card';
            article.innerHTML = `
                <img class="blog-card__image" src="${blog.imageURL}" alt="${blog.title}">
                <time class="blog-card__date" datetime="${blog.publish_date}">
                    ${new Date(blog.publish_date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </time>
                <h3 class="blog-card__title">${blog.title}</h3>
                <p class="blog-card__description">${blog.overview}</p>
                <p class="blog-card__technologies">Tecnologías: ${blog.technologies.join(', ')}</p>
                <div class="blog-card__actions">
                    <button class="blog-card__button ${blog.likes_count > 0 ? 'active' : ''}" 
                            title="Me gusta" 
                            onclick="handleLike(${blog.id})">
                        <i class="fas fa-heart"></i> 
                        <span>${blog.likes_count}</span>
                    </button>
                    <button class="blog-card__button ${blog.saved ? 'active' : ''}" 
                            title="Guardar" 
                            onclick="handleSave(${blog.id})">
                        <i class="fas fa-bookmark"></i>
                    </button>
                </div>
            `;
            blogGrid.appendChild(article);
        });
    } catch (error) {
        console.error('Error al cargar los blogs:', error);
    }
});

async function handleLike(blogId) {
    try {
        const button = event.currentTarget;
        const span = button.querySelector('span');
        const currentLikes = parseInt(span.textContent);
        span.textContent = currentLikes + 1;
        button.classList.add('active');
    } catch (error) {
        console.error('Error al actualizar like:', error);
    }
}

async function handleSave(blogId) {
    try {
        const button = event.currentTarget;
        button.classList.toggle('active');
    } catch (error) {
        console.error('Error al guardar:', error);
    }
}