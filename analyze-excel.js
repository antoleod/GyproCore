import XLSX from 'xlsx';
import fs from 'fs';

const file = 'Copie de Levantamento de Forro.xlsx';
const workbook = XLSX.readFile(file);

const analysis = {
  fileName: file,
  sheets: [],
  totalRows: 0,
  totalColumns: 0,
};

workbook.SheetNames.forEach((sheetName) => {
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  const sheetAnalysis = {
    name: sheetName,
    rowCount: data.length,
    columns: data.length > 0 ? Object.keys(data[0]) : [],
    columnCount: data.length > 0 ? Object.keys(data[0]).length : 0,
    sampleRows: data.slice(0, 3),
    dataTypes: {},
  };

  // Analizar tipos de datos
  if (data.length > 0) {
    Object.keys(data[0]).forEach((col) => {
      const values = data.map(row => row[col]).filter(v => v !== null && v !== undefined);
      const types = new Set(values.map(v => typeof v));
      sheetAnalysis.dataTypes[col] = Array.from(types);
    });
  }

  analysis.sheets.push(sheetAnalysis);
  analysis.totalRows += data.length;
});

console.log(JSON.stringify(analysis, null, 2));
