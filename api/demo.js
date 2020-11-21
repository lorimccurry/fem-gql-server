const gql = require('graphql-tag');
const {ApolloServer} = require('apollo-server');

const typeDefs = gql`
  """
  do things here that will show up in tools
  """
  # union Footwear = Sneaker | Boot

  enum ShoeType {
    JORDAN
    NIKE
    ADIDDAS
    TIMBERLAND
  }

  type User {
    email: String!
    avatar: String!
    shoes: [Shoe]!
  }

  interface Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
  }

  type Sneaker implements Shoe {
    brand: ShoeType!
    size: Int!
    sport: String
    user: User!
  }

  type Boot implements Shoe {
    brand: ShoeType!
    size: Int!
    isWaterproof: Boolean!
    user: User!
  }

  input ShoesInput {
    brand: ShoeType
    size: Int
  }

  input NewShoeInput {
    brand: ShoeType!
    size: String!
  }

  type Query {
    me: User!
    shoes(input: ShoesInput): [Shoe]!
  }

  type Mutation {
    createShoe(input: NewShoeInput!): Shoe!
  }
`

const user = {
  id: 1,
  email: 'yoda@masters.com',
  avatar: 'http://yoda.png',
  shoes: []
}

const shoes = [
  {brand: 'NIKE', size: 12, sport: 'baseketball', user: 1},
  {brand: 'TIMBERLAND', size: 14, isWaterproof: false, user: 1}
]

const resolvers = {
  Query: {
    shoes(_, {input}, ctx) {
      return shoes;
    },
    me() {
      return user;
    }
  },
  Mutation: {
    createShoe(_, {input}, ctx) {
      return input;
    }
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return 'Sneaker';
      return 'Boot';
    }
  },
  Sneaker: {
    user(shoe) {
      return user;
    }
  },
  Boot: {
    user(shoe) {
      return user;
    }
  },
  User: {
    shoes(user) {
      return shoes;
    }
  }
  // Footwear: {
  //   __resolveType(shoe) {
  //     if (shoe.sport) return 'Sneaker';
  //     return 'Boot';
  //   }
  // }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(4000)
  .then(() => console.log('ON PORT 4000'))