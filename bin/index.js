#! /usr/bin/env node

const { program } = require("commander");
const figlet = require("figlet");
const fs = require("fs");

const { getCodeFromFile } = require("../bin/utils/getCodeFromFile");
const { getExplanationFromAPI } = require("../bin/utils/getExplanationFromAPI");

program
  .command("explain <file>")
  .description("Explain the code in the terminal")
  .action(async (file) => {
    try {
      const isDirectory = fs.statSync(file).isDirectory();

      if (isDirectory) {
        console.error("Error: Please provide a file, not a directory.");
        return;
      }

      const code = getCodeFromFile(file);

      if (code.trim() === "") {
        console.error("Error: The specified file is empty.");
        return;
      }

      const explanation = await getExplanationFromAPI(code);

      figlet("CODE EXPLANATION", function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(data);
      });

      setTimeout(() => {
        console.log(JSON.stringify(explanation));
      }, 3000);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  });

program.parse(process.argv);