import * as vc from "@digitalbazaar/vc";
import jsigs from "jsonld-signatures";
import { suiteContext } from "@digitalbazaar/ed25519-signature-2018";
import { klona } from 'klona';

export const getCustomDocumentLoader = async () => {
    const remoteDocuments = new Map()

    remoteDocuments.set(suiteContext.CONTEXT_URL, suiteContext.CONTEXT)

    const { extendContextLoader } = jsigs;
    const { defaultDocumentLoader } = vc;

    const documentLoader = extendContextLoader(async url => {
        const doc = remoteDocuments.get(url)
        if (doc) {
            return {
                contextUrl: null,
                document: klona(doc),
                documentUrl: url
            };
        }

        return defaultDocumentLoader(url);
    });

    return { documentLoader, remoteDocuments }
}