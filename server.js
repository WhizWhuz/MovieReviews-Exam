const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const db = require("./config/db.js");
const app = require("./app.js");

db();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`📞 Server is listening to ${PORT}`);
});
