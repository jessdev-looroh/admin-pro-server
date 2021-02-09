import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import express = require("express");
import path = require("path");

export default class Server {
  app: express.Application;
  port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
  }

  static init(port: number) {
    console.log("INIT: inicializamos una instancia");
    return new Server(port);
  }

  private publicFolder() {
    const publicPath = path.resolve(__dirname, "../../public");
    this.app.use(express.static(publicPath));
  }
  private config() {
    console.log("Se hacen las configuraciones.");
    this.app.use(urlencoded({ extended: false }));
    this.app.use(json());
    this.app.use(cors({ origin: true }));
  }

  start() {
    // this.app.listen(this.port, callback);
    this.publicFolder();
    this.config();
  }
}
