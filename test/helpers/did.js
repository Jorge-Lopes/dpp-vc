import { Ed25519VerificationKey2020 } from "@digitalbazaar/ed25519-verification-key-2020";
import { Ed25519Signature2020 } from "@digitalbazaar/ed25519-signature-2020";

export const createDID = async () => {
    const keyPair = await Ed25519VerificationKey2020.generate();

    const fingerprint = keyPair.fingerprint();
    const did = 'did:key:' + fingerprint;

    keyPair.id = did + "#" + fingerprint;
    keyPair.controller = did;

    const suite = new Ed25519Signature2020({
        key: keyPair,
        verificationMethod: keyPair.id
    });    

    const didDocument = {
        '@context': 'https://www.w3.org/ns/did/v1',
        id: did,
        verificationMethod: [
            {
                id: keyPair.id,
                type: 'Ed25519VerificationKey2020',
                controller: did,
                publicKeyMultibase: keyPair.publicKeyMultibase
            }
        ],
        assertionMethod: [keyPair.id],
        authentication: [keyPair.id]
    };

    return { keyPair, suite, didDocument }
}