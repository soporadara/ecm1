const fs = require('fs');
const path = require('path');

const localesDir = '/Applications/XAMPP/xamppfiles/htdocs/eco1/resources/js/locales';
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
    const filePath = path.join(localesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const lines = content.split('\n');
    
    const rootBlocks = {};
    let currentRoot = null;
    let blockLevel = 0;
    
    for (let i = 1; i < lines.length - 1; i++) {
        const line = lines[i];
        
        if (blockLevel === 0) {
            const match = line.match(/^  "([^"]+)":\s*\{\s*$/);
            if (match) {
                currentRoot = match[1];
                blockLevel = 1;
                if (!rootBlocks[currentRoot]) {
                    rootBlocks[currentRoot] = [];
                }
            } else if (line.trim() !== '') {
                // Ignore unexpected root stuff or just push to a generic block
            }
        } else {
            // Check for closing brace at exactly 2 spaces
            if (line.match(/^  \},\s*$/) || line.match(/^  \}\s*$/)) {
                blockLevel = 0;
                currentRoot = null;
            } else {
                rootBlocks[currentRoot].push(line);
            }
        }
    }
    
    const newLines = ['{'];
    const keys = Object.keys(rootBlocks);
    
    keys.forEach((key, index) => {
        newLines.push(`  "${key}": {`);
        const innerLines = rootBlocks[key];
        
        // Clean trailing commas from every line
        const cleanedLines = innerLines.map(l => l.replace(/,\s*$/, ''));
        
        for (let j = 0; j < cleanedLines.length; j++) {
            let line = cleanedLines[j];
            let nextLine = j < cleanedLines.length - 1 ? cleanedLines[j+1] : null;
            let addComma = true;
            
            if (nextLine === null) {
                addComma = false;
            } else if (nextLine.trim().startsWith('}')) {
                addComma = false;
            } else if (line.trim().endsWith('{') || line.trim().endsWith('[')) {
                addComma = false;
            }
            
            if (addComma) {
                line += ',';
            }
            newLines.push(line);
        }
        
        if (index < keys.length - 1) {
            newLines.push(`  },`);
        } else {
            newLines.push(`  }`);
        }
    });
    
    newLines.push('}');
    
    const finalContent = newLines.join('\n');
    try {
        JSON.parse(finalContent); // Verify it's valid JSON
        fs.writeFileSync(filePath, finalContent);
        console.log(`Successfully merged ${file}`);
    } catch (e) {
        console.error(`Failed to parse merged JSON for ${file}`);
        console.error(e.message);
    }
});
