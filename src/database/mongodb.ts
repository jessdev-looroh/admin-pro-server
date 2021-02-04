
import mongoose from "mongoose";
import colors from "colors";

export default class MongoDB {
  public connect(url:string|undefined) {
    this.config();
    mongoose.connect(
      `${url}`,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      (err) => {
        if (err) throw err;
        console.log(colors.green("Base de datos ONLINE"));
      }
    );
  }
  private config() {
    mongoose.set("useFindAndModify", false);
  }
  static initMongoDB() {
    return new MongoDB();
  }
}
