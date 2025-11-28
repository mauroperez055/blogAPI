const express = require('express');
const app = express();
const port = 3000;

const blogs = require('./blog.json');

// Middleware para parsear JSON
app.use(express.json());

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
app.put('/api/blogs/:id', (req, ress) => {
    const blogId = req.params.id;
    console.log(`Received request to update /api/blogs/${blogId}`);
    ress.status(200).json({ message: `Blog with id ${blogId} updated` });
})


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})