import { initBlogPage } from './blog.js'; 

const Router = {
    init() {
        const links = document.querySelectorAll("a.router-link");
        links.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const route = event.target.getAttribute("href");
                this.go(route, true, false); 
            });
        });

        window.addEventListener("popstate", (event) => {
            const route = event.state && event.state.route ? event.state.route : '/';
            this.go(route, false, false);
        });

        const initialRoute = location.pathname;
        this.go(initialRoute, false, true);
    },

    go(route, saveToHistory = false, isInitialLoad = false) {
        let effectiveRoute = route;

        if (isInitialLoad && typeof route === 'string' && route.endsWith('/index.html')) {
            effectiveRoute = '/';
        }

        if (saveToHistory) {
            history.pushState({ route: route }, "", route);
        }

        const mainContentArea = document.getElementById('app-content');
        if (!mainContentArea) {
            console.error("Router.go -> El área de contenido principal #app-content no fue encontrada.");
            return;
        }
        mainContentArea.innerHTML = "";

        let templateId = null;
        let sectionInitializer = null;

        switch (effectiveRoute) {
            case '/':
                templateId = 'hero-template';
                break;
            case '/proyectos':
                templateId = 'proyectos-template';
                break;
            case '/blog':
                templateId = 'blog-template';
                sectionInitializer = initBlogPage;
                break;
            case '/sobre-mi':
                templateId = 'sobre-mi-template';
                break;
            case '/contacto':
                templateId = 'contacto-template';
                break;
            default:
                mainContentArea.innerHTML = "<h1>404 - Página No Encontrada</h1>";
                return;
        }

        if (templateId) {
            const template = document.getElementById(templateId);
            if (template) {
                const clonedContent = template.content.cloneNode(true);
                mainContentArea.appendChild(clonedContent);

                if (sectionInitializer) {
                    const dynamicContentContainer = mainContentArea.querySelector('#blogGrid') || mainContentArea;
                    sectionInitializer(dynamicContentContainer);
                }
            } else {
                console.error(`Router.go -> Plantilla con id "${templateId}" no encontrada.`);
                mainContentArea.innerHTML = `<h1>Error: Plantilla ${templateId} no encontrada</h1>`;
            }
        }
        mainContentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

export default Router;