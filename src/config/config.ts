// ==========================================
// Puerto
// ==========================================

process.env.PORT = process.env.PORT || "3005";

// ==========================================
// ENTORNO
// ==========================================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ==========================================
// Base de datos
// ==========================================
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost/hospitaldb";
} else {
  urlDB = process.env.MONGO_DB_URI;
}

process.env.URLDB = urlDB;

// ==========================================
// Vencimiento del token
// ==========================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias

process.env.CADUCIDAD_TOKEN = `72h`;
// ==========================================
// SEED de autenticacion
// ==========================================
process.env.SEED = process.env.SEED || "loorohdev-jess";


process.env.GOOGLE_ID = "350714592245-dkjmldhevouvufdi2sluelvms7uue19k.apps.googleusercontent.com";
process.env.GOOGLE_SECRET = "dong7HMlcjEFzRlzaNejvkC-";
