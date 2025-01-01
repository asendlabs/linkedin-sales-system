import * as tables from "./tables";

type Competitor = typeof tables.competitors.$inferSelect;
type Post = typeof tables.posts.$inferSelect;

export { type Competitor, type Post };
