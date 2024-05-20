require('dotenv').config();
const express = require('express');
const dataRoutes = require('./Routes/dataRoutes');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(require('cors')());
app.use(dataRoutes);

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
