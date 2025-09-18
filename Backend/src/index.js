const app = require('./config/server');
require('./app/rutas/usuarios')(app);
require('./app/rutas/tareas')(app); 
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});