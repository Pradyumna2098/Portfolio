/* Placeholder Images SVG Data */
const profilePlaceholder = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#7B5CFF" />
  <circle cx="200" cy="150" r="80" fill="#333" />
  <rect x="120" y="250" width="160" height="100" rx="20" fill="#333" />
  <text x="50%" y="50%" text-anchor="middle" fill="white" font-family="Arial" font-size="24">Pradyumna's Profile</text>
</svg>`;

const projectPlaceholder = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#5C7BFF" />
  <rect x="50" y="50" width="300" height="200" rx="10" fill="#333" />
  <rect x="80" y="80" width="240" height="30" rx="5" fill="#555" />
  <rect x="80" y="130" width="240" height="10" rx="5" fill="#555" />
  <rect x="80" y="150" width="240" height="10" rx="5" fill="#555" />
  <rect x="80" y="170" width="180" height="10" rx="5" fill="#555" />
  <text x="50%" y="50%" text-anchor="middle" fill="white" font-family="Arial" font-size="24">Project Preview</text>
</svg>`;

const blogPlaceholder = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#FF5C7B" />
  <rect x="50" y="50" width="300" height="40" rx="5" fill="#333" />
  <rect x="50" y="110" width="300" height="10" rx="5" fill="#555" />
  <rect x="50" y="130" width="300" height="10" rx="5" fill="#555" />
  <rect x="50" y="150" width="300" height="10" rx="5" fill="#555" />
  <rect x="50" y="170" width="200" height="10" rx="5" fill="#555" />
  <text x="50%" y="50%" text-anchor="middle" fill="white" font-family="Arial" font-size="24">Blog Post Preview</text>
</svg>`;

// Create SVG blobs
function createSVGBlob(svgContent, fileName) {
  const blob = new Blob([svgContent], {type: 'image/svg+xml'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// This would be used in a browser context
function generatePlaceholders() {
  createSVGBlob(profilePlaceholder, 'profile-placeholder.svg');
  createSVGBlob(projectPlaceholder, 'project-placeholder.svg');
  createSVGBlob(blogPlaceholder, 'blog-placeholder.svg');
}

// For reference - these SVGs can be saved as files in your project
