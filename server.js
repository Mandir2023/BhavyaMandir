const express = require('express');
const path = require('path');
const docx2pdf = require('docx2pdf-converter');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/convert', async (req, res) => {
  try {
    const { docxFile } = req.body;

    // Convert DOCX to PDF
    const pdfFile = await docx2pdf.convert(docxFile);

    res.json({ success: true, pdfFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
