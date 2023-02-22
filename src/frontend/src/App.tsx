import React from "react";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import urlJoin from "url-join";
import "graphiql/graphiql.css";
import { useExplorerPlugin } from "@graphiql/plugin-explorer";

const EXAMPLE_QUERY = `# Benvenuto sull'explorer GraphQL di Riseact
# Componi le tue query in questa parte dello schemo, per esempio:

{
  organization {
    name
  }
}
`;

function App() {
  const fetcher = createGraphiQLFetcher({
    url: urlJoin(location.origin, "/graphql"),
  });

  const [query, setQuery] = React.useState(EXAMPLE_QUERY);
  const explorerPlugin = useExplorerPlugin({
    query: query,
    onEdit: setQuery,
  });
  return (
    <GraphiQL
      defaultEditorToolsVisibility
      fetcher={fetcher}
      onEditQuery={setQuery}
      query={query}
      plugins={[explorerPlugin]}
    />
  );
}

export default App;
