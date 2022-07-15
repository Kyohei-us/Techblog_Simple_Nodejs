import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
/**
 * @return {Promise}
 */
export async function getAllPosts(): Promise<Post[]> {
  const all = await prisma.post.findMany();
  return all;
}
/**
 * @param  {{title:string, body:string}} args
 * @return {Promise}
 */
 export async function createPost(
    args: {title:string, body:string},
): Promise<Post> {
  const {title, body} = args;
  const post = await prisma.post.create({
    data: {
      title: title,
      body: body,
      createdAt: new Date(),
    },
  });
  return post;
}