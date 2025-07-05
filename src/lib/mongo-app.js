const APP_ID = process.env.NEXT_PUBLIC_MONGODB_APP_ID || process.env.MONGODB_APP_ID;
const API_KEY = process.env.NEXT_PUBLIC_MONGODB_API_KEY || process.env.MONGODB_API_KEY;
let cachedToken = null;
let tokenExpiry = null;

export async function getAccessToken(apiKey) {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const res = await fetch(`https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/auth/providers/api-key/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: apiKey }),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(`Failed to authenticate with MongoDB App Services: ${errorBody.error || JSON.stringify(errorBody)}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + 25 * 60 * 1000; // Cache for 25 mins (token is usually valid for 30 mins)

  return cachedToken;  // this is the JWT you can now use
}


export async function callMongoFunction(functionName, args = {}) {
  const accessToken = await getAccessToken(API_KEY);
  if (!accessToken) {
    throw new Error("Failed to retrieve access token for MongoDB App Services");
  }
  const response = await fetch(`https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/functions/call`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
       Authorization: `Bearer ${accessToken}`, // now it's a valid token
    },
    body: JSON.stringify({
      name: functionName,
      arguments: [args],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`Mongo Function '${functionName}' error: ${errorBody.error || response.statusText}`);
  }

  return response.json();
}