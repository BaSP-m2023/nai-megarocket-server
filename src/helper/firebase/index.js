import * as admin from 'firebase-admin';

require('dotenv').config();

const FIREBASE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDLs3ZCznx3y0if\n3jlrpRT6/vjDSSrUFCk9hfKIa+4Ea4YccXVdkYbygV0qcc4HUxpVsVEwfCh7mId7\n+bR4D3SH7FFKBLErbzql3m66uglC+XTLQZ60R5UdJWB53vRcP5637zmMRwwoRN4g\nBvJJclxRMzGx08FJuYKrWPj4ytpGbNAux4uxDlQcg8ir9ev0a0kiupepPr8lJzkK\nSfn8gSWzgBwxy5F9oVZoQC9vY9zgOj2ou7VlVDuVaBSAYlbQIfM8epGLcxC7JfT6\nAL4o8F6jwEdwCqdakB3zetCnBoUNrBkdeiBIJy9xs2aSujlJHYtm6fON1a+eqc2L\nYpSv2k2ZAgMBAAECggEAFpoYUGPYaDNgYMq3zNOhnxL897At5h/Bjq/G4C+3lnp2\nxD+rkeEEm/JSK9Q6U9I6/RCibVKNbF9Zgx5LEbpHSBCm2WNpZCQgmghy+VmMjwee\nV7I1gZPivfvod0VPkE/H1OlglYnJlctEaUHUDuW3TBQ12qEgFIXWs5v47iQV8ZPN\nHPlFP/ZlHBO/lq2GGHynF9CSEUZoTMAEDPbcI/N49F3X5ZA9wuVWn58neOrkXcKf\nHN4zmmOM9PY1a8vW0bRr5u+xoK0yhbijTGPXEF6XmfGFWcSACkKijG4zjuZ5q2xV\nhuV35JdAvuVLvCKLgi9InsdAkF0JM4TvLlHrfjPv/QKBgQDmfOXEL5cVCT5rMdcl\n36Yinhmfi6M0SqokTrh2p9xZvdlT2j6m106pB5XqELdMzLTdv8CUnkB60xGzuQln\nAGTzQ8e8sCgarMrtpmbuDC9Asb/Ch2MAzWLwGzJGZJZsgbVTMxyykSf/wcAjprMY\nbCJjYFCw0mVjTslJvumfcehMpQKBgQDiP4hDb48hWIqQIWQ7W0SEs1/6A2qI5yIy\nvJMsOSLVPd9P5q3iGVMSl7TtB6KZQmNBxnOgRLVo4z99g679nDUq35pe6GCmKWwg\n7aAdv7zremPAProWSDjLaP4OWlc4pfHmJWdI1faKXFQoaA2VWPq9ooihyijWybK9\n3CcUDzRm5QKBgQC3MF2N6CU0Wvx5Rkuxlmf865uB6wHz9cP0x3xlElVYHkQ1GSji\ngg3K2nSUbGTDbY/zDwyJEp49ALT5GwAWFYImtqBxn7DAQsWmzLLSUGzeBmhavDA7\n2wHfxD3ZJOlJpG3xipYsdqJL7DpCG6QMrSVHxq1bXF2o6F2jd1FHoMj44QKBgQCA\ndsqMX9/Jc1jaFduvyFbTcnZgo2fubC8C2AhI5/hbVFJkL/szkmWU/QcCP3+XvhZV\n1rT4n4rSD5aRUiAeaH/X5DbnBNM8BfEbkVGFEsXWfxv8oKFQ3ZlCBk+bHri/tZnw\nr/RBaxwd2+b9OnfcATX+Tzd9hihCLSyMmWCnBysd8QKBgE71YGYRB2g+5y+tLwkg\n0WGQFTPRzgk4rgpip0qAU5SPi95J3IZfS1ecNrBcUV2C02BGX04i2q2Hy8Rt1hLl\nFn39OOH6EaPNJWGe+YYVRw7y4VljeAPHs7148K24G20WiVPSP/LIJXJ/qMPeifpb\n4zm39Ht7R57eczahNPhfnMcJ\n-----END PRIVATE KEY-----';
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_url: process.env.FIREBASE_AUTH_URI,
    token_url: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  }),
});

export default firebaseApp;
