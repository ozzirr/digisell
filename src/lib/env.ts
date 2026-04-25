export function getAppUrl() {
  const url = process.env.NEXT_PUBLIC_APP_URL;
  
  // Se l'URL è mancante o contiene un segnaposto non risolto
  if (!url || url.includes("${VERCEL_URL}")) {
    const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;
    if (vercelUrl) {
      return `https://${vercelUrl}`;
    }
  }

  return url?.replace(/\/$/, "") || "http://localhost:3000";
}

export function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}
