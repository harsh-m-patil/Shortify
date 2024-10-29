import app from "./app";
import { connectDB } from "./utils/db";

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGOURI || "mongodb://localhost:27017/shortify";

connectDB(mongoURI);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
