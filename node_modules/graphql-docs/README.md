# GraphQL Documentation Explorer

Dynamically generated documentation explorer for GraphQL schemas. It aims to provide a better overview of a schema than GraphiQL, but without querying features.

## Origin

This is a fork of [Pluriza graphql-docs](https://github.com/pluriza/graphql-docs) and [Magnus Hallin](https://github.com/mhallin)'s awesome 
[GraphQL-Docs](https://github.com/mhallin/graphql-docs).

Pluriza's fork incorporates a nice sidebar and search capabilities. In addition this fork incorporates some style changes.

## Build

Clone and Install dependencies:

```
git clone git@github.com:Platoniq/graphql-docs.git
npm install
```

Compile dist files:

```
npm run prepare
```

## Usage & installation

Just copy the compiled `graphql-docs.js` (or the minimized version) to your project and link it along with the React dependencies following this example:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>GraphQL API Documentation</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.2/react.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.2/react-dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/1.0.0/fetch.min.js"></script>
    <script src="dist/graphql-docs.js"></script>
    <script>
        API_PATH = window.location.origin + '/graphql'

        function fetcher(query) {
            return fetch(API_PATH, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                }),
            }).then(function(r) {
                return r.json();
            })
        }
        const rootElem = document.getElementById('documentation');
        ReactDOM.render(
            React.createElement(
                GraphQLDocs.GraphQLDocs,
                {
                    fetcher: fetcher,
                }),
            rootElem
        );
    </script>

  </head>
  <body>
    <div id="documentation"></div>
  </body>
</html>
```

