import { Hono } from 'hono'
import { cors} from 'hono/cors'
import { createClient } from "@libsql/client/web";
import career from './career/infrastructure/routes';
import teacher from './teacher/infrastructure/routes';
import course from './course/infrastructure/routes';
import section from './section/infrastructure/routes';
import faculty from './faculty/infrastructure/routes';
import user from './user/infrastructure/routes';
import courseVote from './courseVote/infrastructure/routes';
import comment from './courseComment/infrastructure/routes';
const app = new Hono<{ Bindings: Bindings}>()
app.use("*", cors())
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
app.route("/courses", course)
app.route("/sections", section)
app.route("/faculties", faculty)
app.route("/user", user)
app.route("/courseVote", courseVote)
app.route("/courseComment", comment)
export default app
