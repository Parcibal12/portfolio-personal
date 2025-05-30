const LocalStorage = {
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`Error al guardar en LocalStorage para la clave '${key}':`, error);
        }
    },

    load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Error al cargar de LocalStorage para la clave '${key}':`, error);
            return null;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error al eliminar de LocalStorage para la clave '${key}':`, error);
        }
    },



    updateBlogs(blogs) {
        this.save('blogEntries', blogs);
        console.log('Blogs actualizados y guardados en LocalStorage por el observador.');
    }
};

export default LocalStorage;