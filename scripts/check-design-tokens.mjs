import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const allowedPrivateTokenFile = path.join(projectRoot, 'src/styles/tokens.css');
const scannedExtensions = new Set(['.astro', '.css', '.vue']);
const ignoredDirectories = new Set(['.astro', '.git', 'dist', 'node_modules']);

const privateTokenDeclaration = /(^|[^\w-])(--_[a-zA-Z0-9_-]+)\s*:/g;
const privateTokenReference = /var\(\s*(--_[a-zA-Z0-9_-]+)/g;

const violations = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      if (ignoredDirectories.has(entry.name)) return;

      const filePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await walk(filePath);
        return;
      }

      if (!entry.isFile() || !scannedExtensions.has(path.extname(entry.name))) {
        return;
      }

      if (filePath === allowedPrivateTokenFile) {
        return;
      }

      await checkFile(filePath);
    }),
  );
}

async function checkFile(filePath) {
  const contents = await readFile(filePath, 'utf8');

  collectMatches(filePath, contents, privateTokenDeclaration, 'Private token declarations are only allowed in src/styles/tokens.css.');
  collectMatches(filePath, contents, privateTokenReference, 'Private token references are only allowed in src/styles/tokens.css.');
}

function collectMatches(filePath, contents, pattern, message) {
  pattern.lastIndex = 0;

  for (const match of contents.matchAll(pattern)) {
    const token = match[2] ?? match[1];
    const matchIndex = match.index + match[0].indexOf(token);
    const { line, column } = getLocation(contents, matchIndex);

    violations.push({
      filePath,
      line,
      column,
      token,
      message,
    });
  }
}

function getLocation(contents, index) {
  let line = 1;
  let column = 1;

  for (let i = 0; i < index; i += 1) {
    if (contents.charCodeAt(i) === 10) {
      line += 1;
      column = 1;
    } else {
      column += 1;
    }
  }

  return { line, column };
}

await walk(projectRoot);

if (violations.length > 0) {
  console.error('Private design tokens leaked outside src/styles/tokens.css:\n');

  for (const violation of violations) {
    const relativePath = path.relative(projectRoot, violation.filePath);
    console.error(`${relativePath}:${violation.line}:${violation.column} ${violation.token}`);
    console.error(`  ${violation.message}`);
  }

  process.exit(1);
}

console.log('Design token check passed.');
