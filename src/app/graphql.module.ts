import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS,APOLLO_NAMED_OPTIONS,NamedOptions} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';


const uri = 'http://172.29.31.123:5777/apiV2'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink){
  return {
      
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };

  
}

@NgModule({
  exports: [ApolloModule],
  providers: [
      {
            provide: APOLLO_NAMED_OPTIONS, // <-- Different from standard initialization
            useFactory(httpLink: HttpLink): NamedOptions {
              return {
                addwafariz: {
                  // <-- this settings will be saved by name: newClientName
                  cache: new InMemoryCache({ addTypename: false, resultCaching : false}),
                  link: httpLink.create({
                    uri: uri,
                  },
                  ),
                },
                
              };
            },
            deps: [HttpLink],
          },
  ],
})
export class GraphQLModule {}





