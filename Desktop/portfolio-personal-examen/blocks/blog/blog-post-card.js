import { savedItems } from '../../services/SavedItems.js';
import LocalStorage from '../../services/LocalStorage.js';

class BlogPostCard extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = `
            @import url('/blocks/blog/blog.css');
            .blog-card__actions {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
            }
            .blog-card__button {
                background: none;
                border: 1px solid #ccc;
                padding: 5px 10px;
                cursor: pointer;
                border-radius: 5px;
            }
            .blog-card__button.active {
                background-color: #007bff;
                color: white;
            }
        `;

        const template = document.createElement('template');
        template.innerHTML = `
            <article class="blog-card">
                <img class="blog-card__image" src="" alt="">
                <div class="blog-card__date"></div>
                <h3 class="blog-card__title"></h3>
                <p class="blog-card__description"></p>
                <div class="blog-card__technologies"></div>
                <div class="blog-card__actions">
                    <button class="blog-card__button blog-card__save-button"><i class="far fa-bookmark"></i> <span class="button-text">Guardar</span></button>
                    <button class="blog-card__button blog-card__like-button"><i class="far fa-heart"></i> <span class="button-text">Like</span></button>
                </div>
            </article>
        `;
        shadowRoot.appendChild(style);
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.saveButton = this.shadowRoot.querySelector('.blog-card__save-button');
        this.likeButton = this.shadowRoot.querySelector('.blog-card__like-button');
        this.saveButtonText = this.saveButton.querySelector('.button-text');
        this.likeButtonText = this.likeButton.querySelector('.button-text');

        this.saveButton.addEventListener('click', this.handleSaveInteraction.bind(this));
        this.likeButton.addEventListener('click', this.handleLikeInteraction.bind(this));
    }

    set blogData(data) {
        this._blogData = data;
        this.updateButtonStates();
    }

    get blogData() {
        return this._blogData;
    }

    updateButtonStates() {
        if (!this._blogData) return;
        const saveIcon = this.saveButton.querySelector('i');
        if (savedItems.isItemSaved(this._blogData.id)) {
            if (saveIcon) saveIcon.className = 'fas fa-bookmark';
            this.saveButtonText.textContent = ' Guardado';
            this.saveButton.classList.add('active');
        } else {
            if (saveIcon) saveIcon.className = 'far fa-bookmark';
            this.saveButtonText.textContent = ' Guardar';
            this.saveButton.classList.remove('active');
        }

        const likeIcon = this.likeButton.querySelector('i');
        const likedBlogs = LocalStorage.load('likedBlogs') || [];
        if (likedBlogs.includes(this._blogData.id)) {
            if (likeIcon) likeIcon.className = 'fas fa-heart';
            this.likeButtonText.textContent = ' Me gusta';
            this.likeButton.classList.add('active');
        } else {
            if (likeIcon) likeIcon.className = 'far fa-heart';
            this.likeButtonText.textContent = ' Like';
            this.likeButton.classList.remove('active');
        }
    }

    handleSaveInteraction() {
        if (!this._blogData) return;

        if (savedItems.isItemSaved(this._blogData.id)) {
            savedItems.removeItem(this._blogData.id);
        } else {
            savedItems.addItem(this._blogData);
        }
        this.updateButtonStates();
    }

    handleLikeInteraction() {
        if (!this._blogData) return;

        let likedBlogs = LocalStorage.load('likedBlogs') || [];
        const blogId = this._blogData.id;

        if (likedBlogs.includes(blogId)) {
            likedBlogs = likedBlogs.filter(id => id !== blogId);
        } else {
            likedBlogs.push(blogId);
        }
        LocalStorage.save('likedBlogs', likedBlogs);
        this.updateButtonStates();
    }

    static get observedAttributes() {
        return ['date', 'title', 'description', 'technologies', 'image-url'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const article = this.shadowRoot.querySelector('.blog-card');
        if (!article) return;

        switch (name) {
            case 'date':
                article.querySelector('.blog-card__date').textContent = newValue;
                article.querySelector('.blog-card__date').setAttribute('datetime', newValue);
                break;
            case 'title':
                article.querySelector('.blog-card__title').textContent = newValue;
                break;
            case 'description':
                article.querySelector('.blog-card__description').textContent = newValue;
                break;
            case 'technologies':
                article.querySelector('.blog-card__technologies').textContent = 'Tecnologías: ' + newValue;
                break;
            case 'image-url':
                article.querySelector('.blog-card__image').src = newValue;
                article.querySelector('.blog-card__image').alt = article.querySelector('.blog-card__title').textContent;
                break;
        }
    }
}
customElements.define('blog-post-card', BlogPostCard);