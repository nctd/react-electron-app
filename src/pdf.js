const { PDFDocument, StandardFonts, rgb, degrees } = require('pdf-lib');

const fs = require('fs');

// This should be a Uint8Array or ArrayBuffer
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) reject('No se encontro el archivo');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (error) => {
      if (error) reject('No se creo el archivo');
      resolve('sucess');
    });
  });
};

exports.createPDF = async () => {
  const pdf = await readFilePro(`${__dirname}/dev-data/informe.pdf`);

  const pdfDoc = await PDFDocument.load(pdf);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Get the width and height of the first page
  const { width, height } = firstPage.getSize();

  // firstPage.drawText('La floresta 3 Pasaje 13 #2683333333', {
  //   x: 76,
  //   y: 603,
  //   maxWidth: 119,
  //   lineHeight: 20,
  //   size: 8,
  //   wordBreaks:
  //   font: helveticaFont,
  //   color: rgb(0.95, 0.1, 0.1),

  //   // rotate: degrees(-45),
  // });
  firstPage.moveTo(76, 603);
  firstPage.drawText('La floresta 3 Pasaje 13 #26833', {
    size: 8,
    font: helveticaFont,
    maxWidth: 118,
  });
  const pdfBytes = await pdfDoc.save();
  await writeFilePro(`${__dirname}/dev-data/test.pdf`, pdfBytes);
  return height;
  //   return w;
};
