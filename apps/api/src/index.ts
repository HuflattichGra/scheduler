import "dotenv/config";
import { env } from "./infrastructure/env";
import { createApp } from "./infrastructure/http/createApp";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`api listening on ${env.PORT}`);
});
