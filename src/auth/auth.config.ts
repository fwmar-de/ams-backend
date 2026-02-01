export const azureAdConfig = {
  tenantId: process.env.AZURE_AD_TENANTID,
  audience: `api://${process.env.AZURE_AD_CLIENTID}`,
  issuer: `https://sts.windows.net/${process.env.AZURE_AD_TENANTID}/`,
  jwksUri: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANTID}/discovery/v2.0/keys`,
};
