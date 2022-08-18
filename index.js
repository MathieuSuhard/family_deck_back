require('dotenv').config();
const debug = require('debug');
const { createServer } = require('http');

const app = require('./app');

const PORT = process.env.PORT ?? 3000;

const server = createServer(app);

server.listen(PORT, () => {
    debug(`http://localhost:${PORT}`);
});
