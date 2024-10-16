import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
import path from 'path';

// Import the routes
import routes from './routes/index.js';
import { fileURLToPath } from 'url';

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
//AM: this contains path to current modile
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.static(path.join(__dirname, '../client/dist')));

// TODO: Implement middleware to connect the routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
