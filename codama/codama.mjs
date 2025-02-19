import { rootNodeFromAnchor } from '@codama/nodes-from-anchor';
import { renderVisitor } from '@codama/renderers-js';
import { createFromRoot } from 'codama';
import { readFileSync } from 'node:fs';
import path from 'path';

// Read the content of your IDL file.
const anchorIdlPath = path.join(import.meta.dirname, 'pump-idl.json');
const anchorIdl = JSON.parse(readFileSync(anchorIdlPath, 'utf-8'));

// Parse it into a Codama IDL.
const codama = createFromRoot(rootNodeFromAnchor(anchorIdl));

// Apply any transformations to the IDL here.

// Render the IDL to JavaScript.
const pathToGeneratedFolder = path.join(import.meta.dirname, '..', 'src');
const options = {}; // See below.
codama.accept(renderVisitor(pathToGeneratedFolder, options));
