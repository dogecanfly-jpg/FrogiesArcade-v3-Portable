
const express = require('express');
const path = require('path');
const { execSync } = require('child_process');

const app = express();

// Automatically build the project if a build script exists
try {
  console.log('Building project assets...');
  execSync('npm run build', { stdio: 'inherit' });
} catch (err) {
  console.log('Build step skipped or failed, attempting to serve files directly.');
}

// Serve static assets from the output directory (dist, build, or root)
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(__dirname));

// Fallback to routing all requests to the generated index page
app.get('*', (req, res) => {
  const distIndex = path.join(__dirname, 'dist', 'index.html');
  const buildIndex = path.join(__dirname, 'build', 'index.html');
  const rootIndex = path.join(__dirname, 'index.html');

  res.sendFile(distIndex, (err) => {
    if (err) {
      res.sendFile(buildIndex, (err2) => {
        if (err2) {
          res.sendFile(rootIndex, (err3) => {
            if (err3) {
              res.status(404).send('Index file not found after build step.');
            }
          });
        }
      });
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
