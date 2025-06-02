class BaseHTMLElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async loadCSS(cssPath) {
        const response = await fetch(cssPath);
        const cssText = await response.text();
        const style = document.createElement('style');
        style.textContent = cssText;
        this.shadowRoot.appendChild(style);
    }
}

export default BaseHTMLElement;