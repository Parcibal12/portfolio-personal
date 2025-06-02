import { initBlogPage } from './blog.js';
import { initSavedItemsPage } from './savedItemsPage.js';

const Router = {
    routes: {},
    init: function(routes) {
        this.routes = routes;
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

        window.addEventListener('popstate', () => {
            this.go(location.pathname, false);
        });


    },
    go: function(path, addToHistory = true) {
        let effectiveRoute = path; 



        if (typeof path === 'string' && path.endsWith('/index.html')) {
            effectiveRoute = '/';
        }

        if (addToHistory) {
            history.pushState({ route: effectiveRoute }, "", effectiveRoute);
        }

        const mainContentArea = document.getElementById('app-content');
        if (!mainContentArea) {
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
            case '/guardados':
                templateId = 'saved-items-template';
                sectionInitializer = initSavedItemsPage;
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
            
            if (templateId === 'saved-items-template') {
                console.log(`Diagnóstico Router.go: Intentando encontrar plantilla con ID '${templateId}'. Elemento encontrado:`, template);
            }

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
