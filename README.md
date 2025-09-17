# Verifiable Credentials Prototype 
**(Work in Progress)**

This project is a prototype implementation demonstrating the issuance, verification, and presentation of Verifiable Credentials, while using modern decentralized identity standards and libraries.

## Overview

The prototype showcases how to:
- Issue a verifiable credential.
- Verify the authenticity of a credential.
- Create and sign a verifiable presentation.
- Use decentralized identifiers (DIDs) and custom document loaders.

## Major Concepts

### Verifiable Credential
A digital statement made by an issuer about a subject, cryptographically signed to ensure authenticity and integrity. In this prototype, credentials are issued for products, including attributes like name, brand, and category.

### Linked Data & JSON-LD
Credentials can use [JSON-LD](https://json-ld.org/) for semantic interoperability, enabling data to be linked and understood across different systems.

### Context
The `@context` property in credentials defines the vocabulary and semantics. This prototype uses:
- `https://www.w3.org/2018/credentials/v1` (W3C VC context)
- `https://schema.org/` (Product schema)

### DocumentLoader
A custom document loader resolves contexts and DIDs locally or remotely, ensuring all necessary schemas and keys are available for credential processing.

### Decentralized Identifiers (DIDs)
DIDs are self-sovereign identifiers that do not require a central registry. This project uses the `did:key` method, which derives a DID directly from a public key.

## Libraries Used

- [`@digitalbazaar/vc`](https://github.com/digitalbazaar/vc-js): Verifiable Credentials library.
- [`jsonld-signatures`](https://github.com/digitalbazaar/jsonld-signatures): JSON-LD signatures.
- [`@digitalbazaar/ed25519-signature-2020`](https://github.com/digitalbazaar/ed25519-signature-2020): Ed25519 signature suite.
- [`@digitalbazaar/ed25519-verification-key-2020`](https://github.com/digitalbazaar/ed25519-verification-key-2020): Ed25519 key suite.
- [`klona`](https://github.com/lukeed/klona): Deep cloning utility.

## Run

Install dependencies:
```sh
npm install
```

Execute tests:
```sh
npm test
```