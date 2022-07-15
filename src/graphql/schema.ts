import gql from 'graphql-tag';

export const schemaString = gql`
type Query {
    allPosts: [Post],
    allTags: [Tag],
}
type Mutation {
    createPost(title: String!, body: String!): Post,
    updatePost(id: Int!, title: String, body: String): Post,
    addTags(postId: Int!, tags: [String!]!): Post,
}
scalar GraphQLDateTime
type Post {
    id: Int
    title: String
    body: String
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    postInfo: PostInfo
}
type PostInfo {
    id: Int
    postId: Int
    post: Post
    tags: [Tag]
}
type Tag {
    id: Int
    name: String
    postInfos: [PostInfo]
}
`;
