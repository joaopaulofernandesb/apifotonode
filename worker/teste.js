const { createWorker } = require("tesseract.js");

const converteImgText = response => {
  const worker = createWorker();

  (async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text }
    } = await worker.recognize(response);
    console.log(text);
    await worker.terminate();
  })();
};

module.exports = { converteImgText };
