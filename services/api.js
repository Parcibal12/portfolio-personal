export async function cargarEntradasBlog() {
    try {
        const response = await fetch('../data/blogs.json');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error al cargar las entradas del blog:', error);
        return [];
    }
}

export async function darLike(id) {
    try {
        const blogs = await cargarEntradasBlog();
        const blog = blogs.find(blog => blog.id === id);
        
        if (blog) {
            blog.likes_count += 1;
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error al dar like:', error);
        return false;
    }
}

export async function toggleGuardar(id) {
    try {
        const blogs = await cargarEntradasBlog();
        const blog = blogs.find(blog => blog.id === id);
        
        if (blog) {
            blog.saved = !blog.saved;
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error al guardar/desguardar:', error);
        return false;
    }
}

export async function obtenerEntrada(id) {
    try {
        const blogs = await cargarEntradasBlog();
        return blogs.find(blog => blog.id === id);
    } catch (error) {
        console.error('Error al obtener la entrada:', error);
        return null;
    }
}