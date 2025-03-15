import { rootNodeFromAnchor } from '@codama/nodes-from-anchor';
import { renderVisitor } from '@codama/renderers-js';
import {
  addPdasVisitor,
  constantPdaSeedNodeFromString,
  createFromRoot,
  pdaValueNode,
  publicKeyTypeNode,
  publicKeyValueNode,
  setInstructionAccountDefaultValuesVisitor,
  updateInstructionsVisitor,
  variablePdaSeedNode,
} from 'codama';
import { readFileSync } from 'node:fs';
import path from 'path';

// Predefined constants
// const SPL_TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
// const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
// const MPL_TOKEN_METADATA_PROGRAM_ID = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';

// Read the content of IDL file.
const anchorIdlPath = path.join(import.meta.dirname, 'pump-idl.json');
const anchorIdl = JSON.parse(readFileSync(anchorIdlPath, 'utf-8'));

// Parse it into a Codama IDL.
const codama = createFromRoot(rootNodeFromAnchor(anchorIdl));

// Apply any transformations to the IDL here.
// codama.update(
//   addPdasVisitor({
//     pump: [
//       {
//         name: 'bondingCurve',
//         seeds: [
//           constantPdaSeedNodeFromString('utf8', 'bonding-curve'),
//           variablePdaSeedNode('mint', publicKeyTypeNode()),
//         ],
//       },
//     ],
//   }),
// );

// codama.update(
//   setInstructionAccountDefaultValuesVisitor([
//     {
//       account: 'global',
//       defaultValue: publicKeyValueNode('4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf'),
//     },
//     {
//       account: 'feeRecipient',
//       defaultValue: publicKeyValueNode('CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM'),
//     },
//     {
//       account: 'eventAuthority',
//       defaultValue: publicKeyValueNode('Ce6TQqeHC9p8KetsN6JsjHK7UTZk7nasjjnr7XxXp9F1'),
//     },
//     {
//       account: 'program',
//       defaultValue: publicKeyValueNode('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P'),
//     },
//     {
//       account: 'mintAuthority',
//       defaultValue: publicKeyValueNode('TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM'),
//     },
//     {
//       account: 'tokenProgram',
//       defaultValue: publicKeyValueNode(SPL_TOKEN_PROGRAM_ID),
//     },
//     {
//       account: 'associatedTokenProgram',
//       defaultValue: publicKeyValueNode(SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID),
//     },
//     {
//       account: 'mplTokenMetadata',
//       defaultValue: publicKeyValueNode(MPL_TOKEN_METADATA_PROGRAM_ID),
//     },
//     {
//       account: 'bondingCurve',
//       defaultValue: pdaValueNode('bondingCurve'),
//     },
//   ]),
// );

codama.update(
  updateInstructionsVisitor({
    initialize: {
      delete: true,
    },
    setParams: {
      delete: true,
    },
    withdraw: {
      delete: true,
    },
  }),
);

// Render the IDL to JavaScript.
const pathToGeneratedFolder = path.join(import.meta.dirname, '..', 'src', 'generated');
const options = {};
codama.accept(renderVisitor(pathToGeneratedFolder, options));
