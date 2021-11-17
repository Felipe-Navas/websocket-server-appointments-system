const path = require('path');
const fs = require('fs');


class Appointment {

    constructor() {
        this.ultimo   = 10;
        this.hoy      = new Date().getDate();
        this.turnos   = [];
        this.ultimos4 = [];

        this.init();
    };

    get toJSON() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            turnos: this.turnos,
            ultimos4: this.ultimos4,
        };
    };

    init() {
        const { ultimo, hoy, turnos, ultimos4 } = require('../db/data.json');
        if ( hoy === this.hoy ) {
            this.turnos = turnos;
            this.ultimos = ultimo;
            this.ultimos4 = ultimos4;
        } else {
            // Es otro dia
            this.guardarDB();
        };
    };

    guardarDB() {

        const dbpath = path.join( __dirname, '../db/data.json');
        fs.writeFileSync( dbpath, JSON.stringify( this.toJSON ))
    };
};


module.exports = Appointment;
