const { prisma } = require('./generated/prisma-client')

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

  allUsers = await prisma.users()
  console.log('\n-----\nAll Users:', allUsers)
  // console.log('\n-----\nDeleted Users:', deletedUsers)
}

main().catch(err => console.error(err))
