// index.js
const app = require("./src/app");

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Servidor ONG escuchando en http://localhost:${PORT}`);
});
