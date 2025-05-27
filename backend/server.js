const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const connectDB = require("./config/db.js");
const app = require("./app.js");

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`📞 Server is listening to ${PORT}`);
});
