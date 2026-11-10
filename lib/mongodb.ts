import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI. Add it to .env.local.");
const options = { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } };
declare global { var _mongoClientPromise: Promise<MongoClient> | undefined; }
let clientPromise: Promise<MongoClient>;
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) global._mongoClientPromise = new MongoClient(uri, options).connect();
  clientPromise = global._mongoClientPromise;
} else clientPromise = new MongoClient(uri, options).connect();
export default clientPromise;
export async function getDb() { const client = await clientPromise; return client.db(process.env.MONGODB_DB || "relaymind_ai"); }
