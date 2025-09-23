# Verifiable Credentials Prototype

**(Work in Progress)**

## Project Description

This prototype provides a practical example of how to issue, verify, and present Verifiable Credentials using the [@digitalbazaar/vc](https://github.com/digitalbazaar/vc-js) library and related tools. It leverages Decentralized Identifiers (DIDs) and JSON-LD for semantic interoperability, and demonstrates how to use custom document loaders for local and remote context resolution.

The project is focused on product credentials, but the approach is generalizable to other credential types. It is intended as a learning resource or starting point for building decentralized identity solutions.

## Key Features

- **Issue Verifiable Credentials:**  
  Generate cryptographically signed credentials for products, including attributes like name, brand, and category.

- **Verify Credentials:**  
  Check the authenticity and integrity of credentials using linked data proofs and signature suites.

- **Create and Sign Presentations:**  
  Bundle one or more credentials into a verifiable presentation and sign it for secure sharing.

- **Decentralized Identifiers (DIDs):**  
  Use the `did:key` method to generate self-sovereign identifiers directly from public keys.

- **Custom Document Loader:**  
  Resolve JSON-LD contexts and DIDs locally or remotely, supporting flexible credential processing.

- **Extensive Test Suite:**  
  Includes automated tests for all major flows: issuance, verification, presentation creation, and signing.

## Setup Instructions

Clone the repository and

```sh
git clone https://github.com/Jorge-Lopes/dpp-vc
cd dpp-vc
```

Install dependencies:

```sh
npm install
```

Run unit tests:

```sh
npm test
```
