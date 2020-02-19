const db = require("../db/connection");
var moment = require("moment");
moment.locale("pt-br");
const insertdados = response => {
  return new Promise((resolve, reject) => {
    creat_at = moment().format("L");
    db.query(
      'INSERT INTO comprovante (fieldname,originalname,encoding,mimetype,destination,filename,path,size,creat_at) values ("' +
        response.fieldname +
        '","' +
        response.originalname +
        '","' +
        response.encoding +
        '","' +
        response.mimetype +
        '","' +
        response.destination +
        '","' +
        response.filename +
        '","' +
        response.path +
        '","' +
        response.size +
        '","' +
        creat_at +
        '")',
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
    console.log(creat_at);
  });
};

module.exports = { insertdados };
