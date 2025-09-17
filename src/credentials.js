import * as vc from "@digitalbazaar/vc";

export const issueCredential = async (credential, suite, documentLoader) => {
    return await vc.issue({ credential, suite, documentLoader });
}

export const verifyCredential = async (credential, suite, documentLoader) => {
    return await vc.verifyCredential({ credential, suite, documentLoader });
}

export const createPresentation = (verifiableCredential, id, holder, version = 1.0) => {
  return vc.createPresentation({
    verifiableCredential, id, holder, version
  });
}

export const signPresentation = async (presentation, suite, challenge, documentLoader) => {
  return await vc.signPresentation({
    presentation, suite, challenge, documentLoader
  });
}