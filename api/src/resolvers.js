/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  // TOP level default resolver
  // they come first, nothing happens before them
  Query: {
    pets(_, {input}, ctx) {
      return ctx.models.Pet.findMany(input);
    },
    pet(_, {input}, ctx) {
      console.log('Query => pet');
      return ctx.models.Pet.findOne(input);
    }
  },
  Mutation: {
    createPet(_, {input}, ctx) {
      return ctx.models.Pet.create(input);
    }
  },

  // field level resolver that will override any top level resolver
  // if you are writing in a type that isnt a Query/Mutation, you are wrting a field level resolver
  Pet: {
    owner(pet, __, ctx) {
      console.log('Query => owner');
      // real world example
      // ctx.models.User.findById(pet.user);

      // if you did modify the server.js file
      return ctx.models.User.findOne();
    }
  //   img(pet) {
  //     return pet.type === 'DOG'
  //       ? 'https://placedog.net/300/300'
  //       : 'http://placekitten.com/300/300'
  //   }
  },
  User: {
    pets(user, {input}, ctx) {
      return ctx.models.Pet.findMany();
    }
  }
}
