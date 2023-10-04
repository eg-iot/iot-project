import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import {
  ApolloClientOptions,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
const uri: string = 'http://54.81.146.232:3000/graphql'; // <-- add the URL of the GraphQL server here
const link = createHttpLink({ uri });
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: authLink.concat(link),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
