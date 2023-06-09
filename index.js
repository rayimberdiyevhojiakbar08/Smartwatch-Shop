import express from 'express'
import middleware from './src/middleware/middleware.js';
const app = new express();

middleware(app);

const port = 3000;
app.listen(port, "0.0.0.0",  () => console.log(`Listening on port ${port}...`));