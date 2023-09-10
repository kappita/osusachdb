import { Hono } from 'hono'
import { cors} from 'hono/cors'
import { createClient } from "@libsql/client/web";
import career from './career/infrastructure/routes';
import teacher from './teacher/infrastructure/routes';
const app = new Hono<{ Bindings: Bindings}>()
app.use(cors())
app.get("/", async (c) => {
  const environment = c.env.ENV;
  if (environment) {
    return c.json({
      success: true,
      payload: `Hono running on ${environment} environment`,
    });
  }
  return c.json({ success: false, payload: "Environment not found" });
});

app.route("/careers", career)
app.route("/teachers", teacher)
export default app
