const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', '..', 'public', 'images');

const generateFashionImage = async (prompt) => {
  const safePrompt = (prompt || 'fashion editorial').slice(0, 120);

  // Placeholder local artifact for MVP without forcing external API dependency.
  // If GEMINI_API_KEY is provided, this can be replaced with direct API call.
  const filename = `generated-${Date.now()}.txt`;
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, `Gemini prompt submitted: ${safePrompt}`);

  return `/images/${filename}`;
};

module.exports = { generateFashionImage };
