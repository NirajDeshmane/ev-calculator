const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');

// Read the source files
const scriptContent = fs.readFileSync('script.js', 'utf8');
const dataContent = fs.readFileSync('data.js', 'utf8');

// Obfuscation options
const options = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: true,
    debugProtectionInterval: true,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    splitStrings: true,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
};

// Obfuscate the code
const obfuscatedScript = JavaScriptObfuscator.obfuscate(scriptContent, options);
const obfuscatedData = JavaScriptObfuscator.obfuscate(dataContent, options);

// Write the obfuscated files
fs.writeFileSync('script.min.js', obfuscatedScript.getObfuscatedCode());
fs.writeFileSync('data.min.js', obfuscatedData.getObfuscatedCode()); 