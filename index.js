const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

const blogs = require('./src/config/blog.json');


/* Obtengo todos los blogs */
app.get('/api/blogs', (req, res) => {
    console.log('Received request for /api/blogs');
    res.status(200).json(blogs);
})

/* Crear un blog */
app.post('/api/blogs', (req, res) => {
    const body = req.body;
    console.log(body);
    const { titulo, autor, contenido, tags } = req.body;

    if (!titulo || !autor || !contenido) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const id = Math.random().toString(36).substring(2, 9);
    const fechaPublicacion = new Date().toISOString();
    
    const nuevoBlog = {
        id,
        titulo,
        autor,
        contenido,
        fechaPublicacion,
        tags: tags || []
    };

    blogs.push(nuevoBlog);
    console.log('Received request to create a new blog:', nuevoBlog);
    res.status(201).json(nuevoBlog);
})

/* Obtengo un blog buscando por el id */
app.get('/api/blogs/:id', (req, res) => {
    const blogId = req.params.id;
    console.log(`Received request for /api/blogs/${blogId}`);
    const blog = blogs.find(b => b.id === blogId);

    if (blog) {
        res.status(200).json(blog);
    } else {
        res.status(404).json({ message: 'Blog not found' });
    }
})


/* Elimino un blog por su id */
app.delete('/api/blogs/:id', (req, res) => {
    const blogId = req.params.id;
    console.log(`Received request for /api/blos/${blogId}`);

    const index = blogs.findIndex(b => b.id === blogId);
    if (index !== -1) {
        blogs.splice(index, 1); 
        res.status(200).json({ message: `Blog with id ${blogId} deleted` });
    } else {
        res.status(404).json({ message: 'Blog not found' });
    }

})

/* Actualizo un blog por su id */
app.put('/api/blogs/:id', (req, res) => {
    const blogId = req.params.id;
    const { titulo, autor, contenido, tags } = req.body;
    console.log(`Received PUT request for /api/blogs/${blogId}`);

    // 1. VALIDACIÓN BÁSICA: Asegurarse de que al menos un campo sea enviado.
    if (!titulo && !autor && !contenido && !tags) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar.' });
    }
    
    // 2. BUSCAR EL ÍNDICE del blog para saber si existe.
    // Usamos findIndex() si queremos usar splice() después, pero find() es suficiente si solo actualizamos en memoria.
    const blog = blogs.find(b => b.id === blogId); 

    if (!blog) {
        // Si no se encuentra el blog, enviar 404
        return res.status(404).json({ message: 'Blog not found' });
    }

    // 3. ACTUALIZACIÓN PARCIAL: Solo actualiza si el campo viene definido en req.body.
    // Usamos la sintaxis 'campo !== undefined' para permitir enviar un string vacío.
    blog.titulo = titulo !== undefined ? titulo : blog.titulo;
    blog.autor = autor !== undefined ? autor : blog.autor;
    blog.contenido = contenido !== undefined ? contenido : blog.contenido;
    blog.tags = tags !== undefined ? tags : blog.tags;
    
    // 4. RESPUESTA FINAL: Enviar una respuesta exitosa al cliente.
    // Esto es crucial para que la petición no se quede colgada.
    res.status(200).json({ 
        message: `Blog con ID ${blogId} actualizado.`, 
        updatedBlog: blog 
    }); 
    
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})