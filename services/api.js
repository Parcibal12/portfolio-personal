import LocalStorage from './LocalStorage.js';
import { ObservableMixin } from './Mixins.js';

const BLOGS_STORAGE_KEY = 'blogEntries';


class BlogApiBase {}
const ObservableBlogApi = ObservableMixin(BlogApiBase);
const blogApiInstance = new ObservableBlogApi();

async function fetchAndCacheBlogs() {
    try {
        const response = await fetch('/data/blogs.json');
        const data = await response.json();
        LocalStorage.save(BLOGS_STORAGE_KEY, data.results);
        blogApiInstance.notify(data.results);
        return data.results;
    } catch (error) {
        console.error('Error al cargar las entradas del blog desde el archivo JSON:', error);
        return [];
    }
}

export async function cargarEntradasBlog() {
    let blogs = LocalStorage.load(BLOGS_STORAGE_KEY);
    if (!blogs || blogs.length === 0) {
        blogs = await fetchAndCacheBlogs();
    }
    return blogs;
}

function updateAndSaveBlogs(blogs) {
    LocalStorage.save(BLOGS_STORAGE_KEY, blogs);
    blogApiInstance.notify(blogs);
}

export async function darLike(id) {
    let blogs = await cargarEntradasBlog();
    const blog = blogs.find(blog => blog.id === id);
    
    if (blog) {
        blog.likes_count += 1;
        updateAndSaveBlogs(blogs);
        return true;
    }
    return false;
}

export async function toggleGuardar(id) {
    let blogs = await cargarEntradasBlog();
    const blog = blogs.find(blog => blog.id === id);
    
    if (blog) {
        blog.saved = !blog.saved;
        updateAndSaveBlogs(blogs);
        return true;
    }
    return false;
}

export async function obtenerEntrada(id) {
    const blogs = await cargarEntradasBlog();
    return blogs.find(blog => blog.id === id);
}


export const blogApi = blogApiInstance;
blogApi.cargarEntradasBlog = cargarEntradasBlog;