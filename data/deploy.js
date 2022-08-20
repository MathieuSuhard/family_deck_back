require('dotenv').config();
const debug = require('debug')('seeding');

const db = require('../app/config/db');

db.queryCount = 0;

faker.locale = 'fr';
const NB_MANAGERS = 50;
const NB_RESTAURANTS = 100;
const NB_TYPES = 20;
const NB_CITIES = 200;

function pgQuoteEscape(row) {
    const newRow = {};
    Object.entries(row).forEach(([prop, value]) => {
        if (typeof value !== 'string') {
            newRow[prop] = value;
            return;
        }
        newRow[prop] = value.replaceAll("'", "''");
    });
    return newRow;
}

function generateManagers(nbManagers) {
    const managers = [];
    for (let iManager = 0; iManager < nbManagers; iManager += 1) {
        const manager = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };
        managers.push(manager);
    }
    return managers;
}

async function insertManagers(managers) {
    await db.query('TRUNCATE TABLE "manager" RESTART IDENTITY CASCADE');
    const managerValues = managers.map((manager) => `(
                  '${manager.firstname}',
                  '${manager.lastname}',
                  '${manager.email}',
                  '${manager.password}'
              )`);

    const queryStr = `
              INSERT INTO "manager"
              (
                  "firstname",
                  "lastname",
                  "email",
                  "password"
              )
              VALUES
              (
                  'Yann',
                  'Guilloux',
                  'yann@oclock.io',
                  '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy'
              ),-- superpass
              (
                  'Nicolas',
                  'Charpin',
                  'nicolas.charpin@oclock.io',
                  '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy'
              ), -- superpass
              (
                  'Benjamin',
                  'Nougadère',
                  'benjamin.nougadere@oclock.io',
                  '$2b$10$h4Dh2fRGAf4YdC.Cqg1yleq41QHmG61B76THHCp03SgMEizvZlscy'
              ), -- superpass
              ${managerValues}
              RETURNING id
      `;
    const result = await db.query(queryStr);
    return result.rows;
}
