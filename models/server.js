const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controllers');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    };

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );
    };

    routes() {
      //  this.app.use( this.paths.uploads, require('../routes/uploads'));
    };

    sockets() {
        this.io.on("connection", socketController);
    };

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    };
};


module.exports = Server;
