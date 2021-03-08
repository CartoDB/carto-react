/**
 * This script merges the coverage reports from different packages into a single one,
 * inside the "coverage" folder
 *
 * Adapted from: https://github.com/rafaelalmeidatk/TIL/issues/2
 */

const { execSync } = require("child_process");
const fs = require("fs-extra");

const REPORTS_FOLDER = "reports";
const FINAL_OUTPUT_FOLDER = "coverage";

const run = commands => {
  commands.forEach(command => execSync(command, { stdio: "inherit" }));
};

// Create the reports folder and move the reports from cypress and jest inside it
fs.emptyDirSync(REPORTS_FOLDER);

const packages = ['react-api', 'react-auth', 'react-basemaps', 'react-core', 'react-redux', 'react-ui', 'react-widgets'];

packages.forEach((packageName) =>
  fs.copyFileSync(
    `packages/${packageName}/coverage/coverage-final.json`,
    `${REPORTS_FOLDER}/${packageName}-coverage.json`
  )
);

fs.emptyDirSync(".nyc_output");
fs.emptyDirSync(FINAL_OUTPUT_FOLDER);

// Run "nyc merge" inside the reports folder, merging the different coverage files into one,
// then generate the final report on the coverage folder
run([
  // "nyc merge" will create a "coverage.json" file on the root, we move it to .nyc_output
  `npx nyc merge ${REPORTS_FOLDER} && mv coverage.json .nyc_output/out.json`,
  `npx nyc report --reporter lcov --reporter html --report-dir ${FINAL_OUTPUT_FOLDER}`
]);
