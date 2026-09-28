/*
 * Lets `node --test` import the labs components the way Next.js does: compiles
 * .jsx with the TypeScript compiler the site already has, maps the `@/` alias to
 * the project root, and resolves extensionless relative imports to .js or .jsx.
 */
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

function withExtension(file) {
  if (/\.(m?js|jsx|json)$/.test(file) && existsSync(file)) return file;
  for (const ext of ['.js', '.jsx', '/index.js', '/index.jsx']) {
    if (existsSync(file + ext)) return file + ext;
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  let file = null;
  if (specifier.startsWith('@/')) file = path.join(ROOT, specifier.slice(2));
  else if (specifier.startsWith('.') && context.parentURL?.startsWith('file:')) {
    file = path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier);
  }
  const found = file && withExtension(file);
  return found ? nextResolve(pathToFileURL(found).href, context) : nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (!url.endsWith('.jsx')) return nextLoad(url, context);
  const { source } = await nextLoad(url, { ...context, format: 'module' });
  const out = ts.transpileModule(String(source), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  return { format: 'module', source: out.outputText, shortCircuit: true };
}
