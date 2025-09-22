import { Ed25519VerificationKey2020 } from "@digitalbazaar/ed25519-verification-key-2020";
import { Ed25519Signature2020 } from "@digitalbazaar/ed25519-signature-2020";
import { Ed25519VerificationKey2018 } from '@digitalbazaar/ed25519-verification-key-2018';
import { Ed25519Signature2018 } from '@digitalbazaar/ed25519-signature-2018';

export const createDID2018 = async () => {
    const keyPair = await Ed25519VerificationKey2018.generate();

    const fingerprint = keyPair.fingerprint();
    const did = 'did:key:' + fingerprint;

    keyPair.id = did + "#" + fingerprint;
    keyPair.controller = did;

    const suite = new Ed25519Signature2018({
        key: keyPair,
        verificationMethod: keyPair.id
    });

    assertionController = {
        '@context': 'https://w3id.org/security/v2',
        id: keyPair.controller,
        assertionMethod: [keyPair.id],
        authentication: [keyPair.id]
    };

    return { keyPair, suite, assertionController }
}

export const createDID2020 = async () => {
    const keyPair = await Ed25519VerificationKey2020.generate();

    const fingerprint = keyPair.fingerprint();
    const did = 'did:key:' + fingerprint;

    keyPair.id = did + "#" + fingerprint;
    keyPair.controller = did;

    const suite = new Ed25519Signature2020({
        key: keyPair,
        verificationMethod: keyPair.id
    });

    assertionController = {
        '@context': 'https://w3id.org/security/v2',
        id: keyPair.controller,
        assertionMethod: [keyPair.id],
        authentication: [keyPair.id]
    };

    return { keyPair, suite, assertionController }
}