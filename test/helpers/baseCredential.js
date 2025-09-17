export const getBaseCredential = (controller) => {
    return {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://schema.org/"
        ],
        type: [
            "VerifiableCredential",
            "ProductCredential"
        ],
        issuer: controller,
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
            id: "did:example:product-1",
            name: "cotton T-Shirt",
            brand: "GreenCloth",
            category: "Clothing"
        }
    }
}