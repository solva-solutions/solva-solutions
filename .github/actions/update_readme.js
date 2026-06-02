const fs = require('fs');
const path = require('path');

const chainsFilePath = path.join(__dirname, '..', '..', 'chains.json');
const readmeFilePath = path.join(__dirname, '..', '..', 'README.md');

// Read chains.json
const chainsData = JSON.parse(fs.readFileSync(chainsFilePath, 'utf8'));
const { chains } = chainsData;
chains.sort((a, b) => a.prettyName.localeCompare(b.prettyName));

// Generate the validators table
let validatorsTable = '| Chain Name         | Chain ID                 | Validator address                                            | Link                  |\n| ----------------- | -------------------------- | ------------------------------------------------------------ | --------------------- |\n';

for (const chain of chains) {
  validatorsTable += `| \`${chain.prettyName}\` | \`${chain.chain_id}\` | \`${chain.address}\` | [delegate ${chain.symbol}](${chain.stake_link}) |\n`;
}

// Read README.md
let readmeContent = fs.readFileSync(readmeFilePath, 'utf8');

// Replace the validators table in README.md
const tableRegex = /(\| Chain Name)(.|\n)*(\n\|)/;
readmeContent = readmeContent.replace(tableRegex, `${validatorsTable}|`);

// Write the updated content to README.md
fs.writeFileSync(readmeFilePath, readmeContent);
console.log('Updated README content:');
console.log(readmeContent);