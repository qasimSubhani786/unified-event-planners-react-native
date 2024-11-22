const winston = require("winston");
const mongoose = require("mongoose");

const uri = "mongodb+srv://qasimsubhani786:devExcel@2023@unified.dpcgvwc.mongodb.net/Unified_Planners?retryWrites=true&w=majority";

const connectionParam = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
module.exports = function (app) {
  mongoose
    .connect(uri, connectionParam)
    .then(() => {
      winston.info("Sucessfully connected to db..");
      const port = process.env.PORT || 3001;
      app.listen(port, () => winston.info(`Example app listening on port ${port}!`));
    })
    .catch(e => {
      console.log("error", e);
      process.exit(1);
    });
};
