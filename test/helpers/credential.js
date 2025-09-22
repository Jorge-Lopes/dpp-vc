export const getCredential = (controller) => {
  return {
    "@context": ["https://www.w3.org/ns/credentials/v2", "https://schema.org/"],
    type: ["VerifiableCredential", "ProductCredential"],
    issuer: controller,
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: "did:example:product-1",
      name: "cotton T-Shirt",
      brand: "GreenCloth",
      category: "Clothing",
    },
  };
};

export const getSchema = async () => {
  const schemaURL = "https://schema.org/";

  const schemaContext = {
    "@context": {
      "@vocab": "https://schema.org/",
    },
  };

  return { schemaURL, schemaContext };
};
