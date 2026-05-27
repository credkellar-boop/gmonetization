const fs = require('fs');
const path = require('path');

// Grab the variables passed in from the GitHub Action
const username = process.argv[2] || 'Student';
const score = process.argv[3] || '100';

// Format today's date
const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
});

// Set up file paths
const templatePath = path.join(__dirname, 'certificate-template.svg');
const outputDir = path.join(__dirname, '../certificates');
const outputPath = path.join(outputDir, `${username}-certificate.svg`);

try {
    // 1. Read the raw SVG template
    let svgData = fs.readFileSync(templatePath, 'utf8');

    // 2. Replace the placeholders with the actual user's info
    svgData = svgData.replace(/\{\{USERNAME\}\}/g, username);
    svgData = svgData.replace(/\{\{DATE\}\}/g, date);
    svgData = svgData.replace(/\{\{SCORE\}\}/g, score);

    // 3. Create the certificates folder if it doesn't exist yet
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }

    // 4. Save the new custom SVG
    fs.writeFileSync(outputPath, svgData);
    console.log(`✅ Success: Certificate generated for ${username} at ${outputPath}`);

} catch (err) {
    console.error("❌ Error generating certificate:", err);
    process.exit(1);
}
