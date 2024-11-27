import { createClient } from "@sanity/client";

export const client: any = createClient({
  projectId: "wz4xhnez",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.REACT_APP_SANITY_TOKEN, // Write token
});
