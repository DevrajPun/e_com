import DataURIParser from "datauri/parser.js";

import path from "path";

export const getDataUri = (file) => {
  const parser = new DataURIParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};


// // utils/Features.js
// import DataURIParser from "datauri/parser.js";
// import path from "path";

// // This function will generate a data URI from the uploaded file
// export const getDataUri = (file) => {
//   const parser = new DataURIParser();

//   // Get the file extension
//   // const extName = path.extname(file.originalname).toString();
//   const extName = path.extname(file.originalname).toString();
  
//   // Generate and return the data URI from the file buffer
//   return parser.format(extName, file.buffer);
// };



// import fs from "fs";
// import path from "path";
// import DataURIParser from "datauri/parser.js";

// export const getDataUri = (file) => {
//   const parser = new DataURIParser();

//   // Use fs.readFileSync to read the file content as a buffer
//   const buffer = fs.readFileSync(file.path);
//   const extName = path.extname(file.originalname).toString();
//   return parser.format(extName, buffer);
// };


