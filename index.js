const express = require('express'); // import modul express js
const { v4: uuidv4 } = require('uuid'); // import library uuid sebagai security pengamanan id
const path = require('path'); // import path, untuk menggunakan path
const app = express(); // gunakan modul express js
const methodOverride = require('method-override') // express js tidak support method patch, delete, dan put perlu library method overide dan instal terlebih dahulu


app.use(express.json()) // untuk menggunakan format data json
app.use(express.urlencoded({extended: true})) 
app.set('view engine', 'ejs'); // set view menggunakan tamplate engine
app.use(methodOverride('_method')) // menggunakan method overide di dalam method pada form
app.set('views', path.join(__dirname, 'views')) // ini setting untuk menggunakan views folder


// data example schema database
let comments = [
    {
        id : uuidv4(),
        username : "randi",
        text : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia nobis dolores aliquam delectus hic repellendus in explicabo reiciendis, ipsum assumenda?"
    },
    {
        id : uuidv4(),
        username : "budiono",
        text : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia nobis dolores aliquam delectus hic repellendus in explicabo reiciendis, ipsum assumenda?"
    },
    {
        id : uuidv4(),
        username : "siregar",
        text : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia nobis dolores aliquam delectus hic repellendus in explicabo reiciendis, ipsum assumenda?"
    },
    {
        id : uuidv4(),
        username : "aktul",
        text : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia nobis dolores aliquam delectus hic repellendus in explicabo reiciendis, ipsum assumenda?"
    },
    {
        id : uuidv4(),
        username : "mujib",
        text : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia nobis dolores aliquam delectus hic repellendus in explicabo reiciendis, ipsum assumenda?"
    },
    {
        id : uuidv4(),
        username : "lala",
        text : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia nobis dolores aliquam delectus hic repellendus in explicabo reiciendis, ipsum assumenda?"
    },
    {
        id : uuidv4(),
        username : "lili",
        text : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia nobis dolores aliquam delectus hic repellendus in explicabo reiciendis, ipsum assumenda?"
    }
];


// Route menampilkan data dari DB
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

// Route untuk menampilkan form tambah data
app.get('/comments/create', (req, res) => {
    res.render('comments/create');
});

// Route menambahkan data. 
// variable mendefinisikan atribut field dari DB
// req.body mengambil data data dari form dan memasukkan ke dalam variable.
// push.({var}) mendorong data ke dalam field DB
// res.send, res.render sebagai konfirmasi
// res.redirect mengalihkan ke halaman lain
app.post('/comments', (req, res) => {
    const { username, text, id } = req.body
    comments.push({username, text, id: uuidv4() })
    res.redirect('/comments')
});

// Route untuk mengambil suatu data berdasarkan id
// amankan id agar tidak mudah di akses melaui url dengan library uuid
app.get('/comments/:id', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/details', {comment});
});

// mengambil data berdasarkan id dan menampilkan nilai di dalam form update
app.get('/comments/:id/update', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/update', {comment});
});

// melakukan update data dengan method patch, dan ini hanya mengubah pada 
// data field text.
app.patch('/comments/:id', (req, res) => {
    const {id} = req.params
    const newComment = req.body.text
    const foundComments = comments.find(c => c.id === id)
    foundComments.text = newComment
    res.redirect('/comments');
});


app.delete('/comments/:id', (req, res) =>{
    const {id} = req.params
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments');

});

app.listen(8000, () => {
    console.log('This App Run On Server http://localhost:8000');
});