class SearchBar extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = `
            .search-container {
                display: flex;
                justify-content: center;
                margin: 20px 0;
            }
            .search-input {
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                width: 80%;
                max-width: 500px;
                font-size: 1rem;
            }
        `;

        const template = document.createElement('template');
        template.innerHTML = `
            <div class="search-container">
                <input type="text" class="search-input" placeholder="Buscar artículos...">
            </div>
        `;

        shadowRoot.appendChild(style);
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.input = shadowRoot.querySelector('.search-input');
    }

    static get observedAttributes() {
        return ['placeholder'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'placeholder' && this.input) {
            this.input.placeholder = newValue;
        }
    }

    get value() {
        return this.input.value;
    }

    set value(val) {
        this.input.value = val;
    }
}

customElements.define('search-bar', SearchBar);