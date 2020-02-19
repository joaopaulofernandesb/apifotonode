const db = require("../db/connection");
var moment = require("moment");
moment.locale("pt-br");

const consultaComprovante = response => {
  return new Promise((resolve, reject) => {
    creat_at = moment().format("L");
    db.query("SELECT * FROM comprovante", (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

module.exports = { consultaComprovante };
