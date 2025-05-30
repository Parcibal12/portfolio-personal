class BlogPostCard extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = `
            @import url('/blocks/blog/blog.css');
        `;

        const template = document.createElement('template');
        template.innerHTML = `
            <article class="blog-card">
                <div class="blog-card__date"></div>
                <h3 class="blog-card__title"></h3>
                <p class="blog-card__description"></p>
                <div class="blog-card__technologies"></div>
            </article>
        `;

        shadowRoot.appendChild(style);
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['date', 'title', 'description', 'technologies'];
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
        }
    }
}
customElements.define('blog-post-card', BlogPostCard);