import { connect } from "mongoose";

export const connectDB = (mongoURI: string) => {
  connect(mongoURI, {})
    .then(() => console.log("DB connected"))
    .catch((err) => {
      console.log(err);
    });
};
