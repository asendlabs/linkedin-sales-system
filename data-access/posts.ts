import { db } from "@/database";
import { posts } from "@/database/schema";
import { type Post } from "@/database/types";
import { eq } from "drizzle-orm";
import "server-only";
import { ulid } from "ulid";

export async function getPosts(userId: string): Promise<Post[]> {
  return await db.query.posts.findMany({
    where: eq(posts.userId, userId),
  });
}

export async function getCompetitorPosts(
  competitorId: string,
): Promise<Post[]> {
  return await db.query.posts.findMany({
    where: eq(posts.competitorId, competitorId),
  });
}

export async function addPost({
  userId,
  competitorId,
  postText,
  postLikes,
  postComments,
  postShares,
  postLink,
  postedAt,
}: {
  userId: string;
  competitorId: string;
  postText: string;
  postLikes: number;
  postComments: number;
  postShares: number;
  postLink: string;
  postedAt: Date;
}): Promise<Post> {
  const id = ulid();
  const [created] = await db
    .insert(posts)
    .values({
      id,
      userId,
      competitorId,
      postText,
      postLink,
      postLikes,
      postComments,
      postShares,
      postedAt,
      createdAt: new Date(),
    })
    .returning();
  return created;
}

export async function deletePost(postId: string): Promise<void> {
  await db.delete(posts).where(eq(posts.id, postId));
}
