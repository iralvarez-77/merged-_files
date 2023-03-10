const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

const contractBuffer = fs.readFileSync('contrato.pdf');
const form1Buffer = fs.readFileSync('Form_1.pdf'); 
const form2Buffer = fs.readFileSync('Form_2.pdf'); 
const form3Buffer = fs.readFileSync('file_3.pdf'); 


// console.log(contractBuffer);
// console.log(anexosBuffer);

( async () => {
  const filesToMerge = [ contractBuffer,form1Buffer, form2Buffer, form3Buffer];
  // console.log(filesToMerge);
  
  const mergedPdf = await PDFDocument.create();
  // console.log(mergedPdf);
  
  for ( const fileBuffer of filesToMerge  ) {
    
    const pdf =  await PDFDocument.load(fileBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    
    copiedPages.forEach(( page ) => {
      mergedPdf.addPage(page);
    });
  
  };
  
  const buffer = await mergedPdf.save();
  // console.log(buffer);
  
  const path = 'mergedFile.pdf'
  
  fs.open(path, 'w', (error, fd) => {
    fs.write(fd, buffer, 0, buffer.length, null, (error) => {
      fs.close(fd, () => {
        console.log('wrote the file successfully');
      });
    });
  });

})()



// const PDFMerger = require('pdf-merger-js');

// var merger = new PDFMerger();
// console.log('merger', merger);

// (async () => {
//   await merger.add('contratos.pdf');  //merge all pages. parameter is the path to file and filename.
//   const result = await merger.add('anexos.pdf'); // merge only page 2
//   console.log('result', result);

//   const merged = await merger.save('merged.pdf'); //save under given name and reset the internal document
//   console.log('merged', merged);
// })();