const LocalStorage = {
    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    load(key) {
        const data = localStorage.getItem(key);
        try {
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },



    updateBlogs(blogs) {
        this.save('blogEntries', blogs);
    }
};

export default LocalStorage;