const path = require('path');
const fs = require('fs');


class Appointment {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio= escritorio;
    };
};


class AppointmentsControl {

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

    siguiente() {
        this.ultimo += 1;
        const appointmet = new Appointment(this.ultimo, null);
        this.turnos.push( appointmet );

        this.guardarDB();
        return 'Turno ' + appointmet.numero
    };

    atenderTurno( escritorio ) {
        // Si no hay turnos
        if ( this.turnos.length === 0){
            return null;
        };

        // Obtengo y borro el primer elemento del array
        const turno = this.turno.shift();

        turno.escritorio = escritorio;

        // Agrego el turno a el array de los ultimos 4 al inicio
        this.ultimos4.unshift( ticket );

        if ( this.ultimos4.length > 4 ) {
            // Borro el ultimo elemento del array
            this.ultimos4.splice( -1, 1 );
        };

        this.guardarDB();
        return turno;
    };
};


module.exports = AppointmentsControl;
