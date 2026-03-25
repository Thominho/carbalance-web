import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '796a25f6cab32bff810d9b364819f65e7844ab5b', queries,  });
export default client;
  