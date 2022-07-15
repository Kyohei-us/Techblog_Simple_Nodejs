import {Post, PrismaClient, Tag} from '@prisma/client';

const prisma = new PrismaClient();
/**
 * @return {Promise}
 */
export async function getAllPosts(): Promise<Post[]> {
  const all = await prisma.post.findMany({
    include: {
      postInfo: {
        include: {
          tags: true
        }
      }
    },
  });
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
    include: {
      postInfo: true,
    },
  });
  return post;
}

/**
 * @param  {{id:number, title: string?, body: string?}} args
 * @return {Promise}
 */
export async function updatePost(
    args: {
    id: number,
    title?: string,
    body?: string
  },
): Promise<Post> {
  // Use destruction to extract
  // id field and the rest.
  // Note: updateData does not have id field.
  const {id, ...updateData} = args;
  // Question: if update data for
  // title field is not given,
  // what will happen?
  // -> updateData won't have title field,
  // so title field won't get updated in any way.
  console.log('updateData:', updateData);
  const updated = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      ...updateData,
    },
    include: {
      postInfo: true,
    },
  });
  return updated;
}

export async function getAllTags(): Promise<Tag[]> {
  const allTags = await prisma.tag.findMany({
    include: {
      postInfos: {
        include: {
          tags: true
        }
      }
    }
  });
  return allTags;
}

export async function addTags(
  args: {
    postId: number,
    tags: string[]
  }
): Promise<Post> {
  const {postId, tags} = args;
  tags.forEach(async (tag)=>{
    await prisma.tag.upsert({
      where: {
        name: tag
      },
      update: {},
      create: {
        name: tag
      },
    });
  })
  const upserted = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      updatedAt: new Date(),
      postInfo: {
        upsert: {
          create: {
            tags: {
              connect: tags.map((tag) => {
                return {"name": tag}
              })
            }  
          },
          update: {
            tags: {
              connect: tags.map((tag) => {
                return {"name": tag}
              })
            } 
          }
        }
      }
    },
    include: {
      postInfo: {
        include: {
          tags: true
        }
      }
    }
  });
  return upserted;
}
