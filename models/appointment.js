const path = require('path')
const fs = require('fs')

class Appointment {
  constructor(number, desktop) {
    this.number = number
    this.desktop = desktop
  }
}

class AppointmentsControl {
  constructor() {
    this.last = 0
    this.today = new Date().getDate()
    this.appointments = []
    this.last4 = []

    this.init()
  }

  get toJSON() {
    return {
      last: this.last,
      today: this.today,
      appointments: this.appointments,
      last4: this.last4,
    }
  }

  init() {
    const { last, today, appointments, last4 } = require('../db/data.json')
    if (today === this.today) {
      this.appointments = appointments
      this.last = last
      this.last4 = last4
    } else {
      // It is another day
      this.saveDB()
    }
  }

  saveDB() {
    const dbPath = path.join(__dirname, '../db/data.json')
    fs.writeFileSync(dbPath, JSON.stringify(this.toJSON))
  }

  nextAppointment() {
    this.last += 1
    const appointment = new Appointment(this.last, null)
    this.appointments.push(appointment)

    this.saveDB()
    return 'Appointment ' + appointment.number
  }

  attendAppointment(desktop) {
    // If there are appointments
    if (this.appointments.length === 0) {
      return null
    }

    // I get and delete the first element of the array
    const appointment = this.appointments.shift() // this.appointments[0];

    appointment.desktop = desktop

    // I add the appointment to the array of the last 4 at the beginning
    this.last4.unshift(appointment)

    if (this.last4.length > 4) {
      // I delete the last element of the array
      this.last4.splice(-1, 1)
    }

    this.saveDB()
    return appointment
  }
}

module.exports = AppointmentsControl
