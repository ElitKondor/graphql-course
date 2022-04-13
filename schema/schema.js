const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');
const axios = require('axios');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    company: {
      type: CompanyType,
      resolve: (parentValue, args) => {
        return axios
          .get(
            `https://jsonplaceholder.typicode.com/users/${parentValue.company}`
          )
          .then((res) => res.data);
      },
    },
  }),
});

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    name: { type: GraphQLString },
    catchPhrase: { type: GraphQLString },
    bs: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: (parentValue, args) => {
        return axios
          .get(`https://jsonplaceholder.typicode.com/users/${args.id}`)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
