import BaseHTMLElement from '../../base/baseHTMLElement.js';

export class SearchBar extends BaseHTMLElement {
    constructor() {
        super();
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
    }

    static get observedAttributes() {
        return ['placeholder'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'placeholder' && this.inputElement) {
            this.inputElement.placeholder = newValue;
        }
    }

    connectedCallback() {
        this.render();
        this.inputElement = this.shadowRoot.querySelector('input');
        this.inputElement.addEventListener('keydown', this._handleKeyDown.bind(this));

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.inputElement.focus();
            }
        });
    }

    render() {
        this.shadowRoot.innerHTML = '';

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'blocks/searchbar/searchbar.css';

        const container = document.createElement('div');
        container.className = 'search-container';

        const input = document.createElement('input');
        input.className = 'search-input';
        input.type = 'text';
        input.placeholder = this.getAttribute('placeholder');

        const icon = document.createElement('span');
        icon.className = 'search-icon';
        icon.innerHTML = '<i class="fa fa-search"></i>';
        container.appendChild(input);
        container.appendChild(icon);

        this.shadowRoot.appendChild(link);
        this.shadowRoot.appendChild(container);
    }

    _handleKeyDown(event) {
    }

    get value() {
        return this.inputElement.value;
    }

    set value(val) {
        this.inputElement.value = val;
    }

    get input() {
        return this.inputElement;
    }
}

if (!customElements.get('search-bar')) {
    customElements.define('search-bar', SearchBar);
}
