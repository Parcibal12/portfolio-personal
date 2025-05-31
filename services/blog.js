import LocalStorage from './LocalStorage.js';
import { blogApi } from './api.js';
import '../blocks/blog/blog-post-card.js';
import { savedItems } from './SavedItems.js';

export function initBlogPage() {
    blogApi.addObserver(LocalStorage.updateBlogs.bind(LocalStorage));
    renderBlogCards();

    savedItems.addObserver(() => {
        document.querySelectorAll('blog-post-card').forEach(card => {
            card.updateButtonStates();
        });
    });
}

async function renderBlogCards() {
    const blogContainer = document.querySelector('#blogGrid');
    if (!blogContainer) {
        console.error('Blog container not found');
        return;
    }

    const blogs = await blogApi.cargarEntradasBlog();
    blogContainer.innerHTML = '';

    blogs.forEach(blogData => {
        const blogPostCard = document.createElement('blog-post-card');
        blogPostCard.setAttribute('date', blogData.publish_date);
        blogPostCard.setAttribute('title', blogData.title);
        blogPostCard.setAttribute('description', blogData.overview);
        blogPostCard.setAttribute('technologies', blogData.technologies.join(', '));
        blogPostCard.setAttribute('image-url', blogData.imageURL);
        blogPostCard.blogData = blogData;
        blogContainer.appendChild(blogPostCard);
    });
}
