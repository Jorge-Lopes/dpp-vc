import { issueCredential, verifyCredential, createPresentation, signPresentation } from "../src/credentials.js"
import { getCustomDocumentLoader } from "./helpers/documentLoader.js"
import { createDID } from "./helpers/did.js"
import { getBaseCredential } from "./helpers/baseCredential.js"
import { promises as fs } from "fs";


describe('verifiable credentials', () => {

    let customDocumentLoader;
    let issuer
    let baseCredential

    beforeAll(async () => {
        customDocumentLoader = await getCustomDocumentLoader()
        issuer = await createDID()

        const { keyPair, didDocument } = issuer
        const { remoteDocuments } = customDocumentLoader

        remoteDocuments.set(keyPair.controller, didDocument)
        remoteDocuments.set(keyPair.id, keyPair.export({ publicKey: true }))

        const subjectSchemaRaw = await fs.readFile("test/helpers/subjectSchema.json", "utf-8")
        const subjectSchema = JSON.parse(subjectSchemaRaw);
        remoteDocuments.set("https://schema.org/", subjectSchema)

        baseCredential = getBaseCredential(keyPair.controller)
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

    test('canonize proof', async () => {
        const { keyPair, suite } = issuer
        const { documentLoader } = customDocumentLoader

        const verifiableCredential = await issueCredential(baseCredential, suite, documentLoader)
        const presentation = createPresentation(verifiableCredential, 'test:ebc6f1c2', keyPair.controller)

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