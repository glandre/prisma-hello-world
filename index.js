const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
  Query: {
    pusblishedPosts(root, args, context) {
      return context.prisma.posts({ where: { published: true } })
    },
    post(root, args, context) {
      return context.prisma.posts({ id: args.postId })
    },
    postsByUser(root, args, context) {
      return context.prisma.users({ id: args.userId }).posts()
    },
    users(root, args, context) {
      return context.prisma.users()
    }
  },
  Mutation: {
    createDraft(root, args, context) {
      return context.prisma.createPost({
        title: args.title,
        body: args.body,
        author: {
          connect: { id: args.userId }
        }
      })
    },
    publish(root, args, context) {
      return context.prisma.updatePost({
        data: { published: true },
        where: { id: args.postId }
      })
    },
    createUser(root, args, context) {
      return context.prisma.createUser({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email
      })
    }
  },
  User: {
    posts(root, args, context) {
      return context.prisma.user({ id: root.id }).posts()
    }
  },
  Post: {
    author(root, args, context) {
      return context.prisma.post({ id: root.id }).author()
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: { prisma }
})

server.start(() => console.log('Server is running on http://localhost:4000'))
