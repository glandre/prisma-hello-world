const { prisma } = require('./generated/prisma-client')

const testCreateUsersWithNestedPosts = async () => {
  const createdUser = await prisma.createUser({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@doe.me',
    posts: {
      create: [
        {
          title: 'How to Setup Prisma',
          body: 'Work In Progress...'
        },
        {
          title: 'How to Update Prisma Datamodel',
          body: 'Also WIP...'
        }
      ]
    }
  })

  return createdUser
}

const main = async () => {
  // const newUser = await prisma.createUser({
  //   firstName: 'Fulano',
  //   lastName: 'de Tal',
  //   email: 'fulano@detal.me'
  // })

  // console.log(`Created new user: ${newUser.firstName} (ID: ${newUser.id})`)

  let allUsers = await prisma.users()
  console.log('\n-----\nAll Users:', allUsers)

  const user = await prisma.user({ id: 'cjuutovll001k0743278v59c0' })
  console.log('\n-----\nGeraldo:', user)

  const fulanos = await prisma.users({
    where: {
      firstName: 'Fulano'
    }
  })
  console.log('\n-----\nfound fulanos:', fulanos)

  // const updatedUser = await prisma.updateUser({
  //   where: { id: 'cjuutq7j2001q07430e94rupk' },
  //   data: {
  //     firstName: 'John',
  //     lastName: 'Doe'
  //   }
  // })

  // const deletedUsers = await prisma.deleteManyUsers({
  //   firstName: 'John'
  // })

  // const createdUser = await testCreateUsersWithNestedPosts()
  // console.log('\n-----Created User:', createdUser)

  // allUsers = await prisma.users()
  // console.log('\n-----\nAll Users:', allUsers)
  // // console.log('\n-----\nDeleted Posts:', deletedPosts)

  // allPosts = await prisma.posts()
  // console.log('\n-----\nAll Posts:', allPosts)

  // const geraldo = await prisma.user({ id: 'cjuutovll001k0743278v59c0' })
  console.log('Trying to create post via updating a user...')
  // await prisma.createPost({
  //   title: 'How to play chess',
  //   body: 'WIP...',
  //   author: {
  //     connect: { id: 'cjuutovll001k0743278v59c0' }
  //   }
  // })

  // await prisma.createPost({
  //   title: 'How to prepare for a game',
  //   body: 'WIP... (2)',
  //   author: {
  //     connect: { id: 'cjuutovll001k0743278v59c0' }
  //   }
  // })

  const result = await prisma.users({ where: { firstName: 'Geraldo' } }).posts()
  const myPosts = result[0].posts
  console.log('\n-----\nMy Posts:', myPosts)
}

main().catch(err => console.error(err))
