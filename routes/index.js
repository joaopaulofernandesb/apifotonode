var express = require("express");
var router = express.Router();
var multer = require("multer");
var moment = require("moment");
var fs = require("fs");
const { insertdados } = require("../db/insert");
const { consultaComprovante } = require("../db/consulta");
moment.locale("pt-br");
const { converteImgText } = require("../worker/teste");
const fs = require("fs");
const dir = "public";
const dir2 = "public/images";

//Verifica se não existe
if (!fs.existsSync(dir)) {
  //Efetua a criação do diretório
  fs.mkdirSync(dir);
} else if (!fs.existsSync(dir2)) {
  fs.mkdirSync(dir2);
} else {
  console.log("Existe!!");
}

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, "image-" + Date.now() + "." + filetype);
  }
});
var upload = multer({ storage: storage });

/* GET home page. */
router.get("/img", async function(req, res, next) {
  console.log(await consultaComprovante());
  res.json(await consultaComprovante());
});

router.post("/upload", upload.single("file"), async function(req, res, next) {
  console.log(req.file);
  if (!req.file) {
    res.status(500);
    return next(err);
  }

  await insertdados(req.file);
  converteImgText("https://a688f795.ngrok.io/images/" + req.file.filename);

  res.json(req.file.filename);
});

module.exports = router;
