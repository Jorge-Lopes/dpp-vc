import { issueCredential, verifyCredential, createPresentation, signPresentation } from "../src/verifiableCredential.js"
import { getCustomDocumentLoader } from "./helpers/documentLoader.js"
import { createDID2018, createDID2020 } from "./helpers/did.js"
import { getCredential, getSchema } from "./helpers/credential.js"
import jsigs from "jsonld-signatures";

describe('verifiable credentials', () => {

    let customDocumentLoader;
    let issuer
    let baseCredential

    beforeAll(async () => {
        issuer = await createDID2018()
        const { keyPair, assertionController } = issuer

        customDocumentLoader = await getCustomDocumentLoader()
        const { remoteDocuments } = customDocumentLoader

        remoteDocuments.set(keyPair.controller, assertionController)
        remoteDocuments.set(keyPair.id, keyPair.export({ publicKey: true }))

        const { schemaURL, schemaContext } = await getSchema()
        remoteDocuments.set(schemaURL, schemaContext)

        baseCredential = getCredential(keyPair.controller)
    })

    test('issue and verify credential', async () => {
        const { suite } = issuer
        const { documentLoader } = customDocumentLoader

        const verifiableCredential = await issueCredential(baseCredential, suite, documentLoader)
        const { verified, results } = await verifyCredential(verifiableCredential, suite, documentLoader)

        expect(verified).toBe(true)
        expect(...results).toHaveProperty('proof')
        expect(...results).toHaveProperty('error', undefined)
    })

    test('create presentation', async () => {
        const { keyPair, suite } = issuer
        const { documentLoader } = customDocumentLoader

        const verifiableCredential = await issueCredential(baseCredential, suite, documentLoader)
        const verifiablePresentation = createPresentation(verifiableCredential, 'test:ebc6f1c2', keyPair.controller)

        expect(verifiablePresentation).toHaveProperty('verifiableCredential')
        expect(verifiablePresentation).toHaveProperty('type', ['VerifiablePresentation'])
    })

    test('sign presentation', async () => {
        const { keyPair, suite } = issuer
        const { documentLoader } = customDocumentLoader

        const verifiableCredential = await issueCredential(baseCredential, suite, documentLoader)
        const verifiablePresentation = createPresentation(verifiableCredential, 'test:ebc6f1c2', keyPair.controller)
        const signedPresentation = await signPresentation(verifiablePresentation, suite, '12ec21', documentLoader)

        expect(signedPresentation).toBeDefined();
    })

    test('create authentication proof', async () => {
        const { keyPair, suite } = issuer
        const { documentLoader } = customDocumentLoader

        const presentation = createPresentation(baseCredential, 'test:ebc6f1c2', keyPair.controller)

        const proofSet = []

        const { AuthenticationProofPurpose } = jsigs.purposes;
        const domain = undefined;
        const challenge = '12ec21'
        const purpose = new AuthenticationProofPurpose({
            domain,
            challenge
        });

        const proof = await suite.createProof({
            document: presentation, purpose, proofSet, documentLoader
        });

        expect(proof).toBeDefined();
    })
})

describe('Ed25519Signature2020', () => {

    let customDocumentLoader;
    let issuer
    let baseCredential

    beforeAll(async () => {
        issuer = await createDID2020()
        const { keyPair, assertionController } = issuer

        customDocumentLoader = await getCustomDocumentLoader()
        const { remoteDocuments } = customDocumentLoader

        remoteDocuments.set(keyPair.controller, assertionController)
        remoteDocuments.set(keyPair.id, keyPair.export({ publicKey: true }))

        const { schemaURL, schemaContext } = await getSchema()
        remoteDocuments.set(schemaURL, schemaContext)

        baseCredential = getCredential(keyPair.controller)
    })

    test('failing to create authentication proof', async () => {
        const { keyPair, suite } = issuer
        const { documentLoader } = customDocumentLoader

        const presentation = createPresentation(baseCredential, 'test:ebc6f1c2', keyPair.controller)

        const proofSet = []

        const { AuthenticationProofPurpose } = jsigs.purposes;
        const domain = undefined;
        const challenge = '12ec21'
        const purpose = new AuthenticationProofPurpose({
            domain,
            challenge
        });

        expect.assertions(1);
        try {
            await suite.createProof({
                document: presentation, purpose, proofSet, documentLoader
            });
        } catch (error) {
            const eventError = error.details.event.message
            expect(eventError).toMatch('Dropping property that did not expand into an absolute IRI or keyword.');
        }
    })
})