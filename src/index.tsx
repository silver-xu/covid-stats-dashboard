import React from "react";
import ReactDOM from "react-dom";
import { GraphQLClient, ClientContext } from "graphql-hooks";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const client = new GraphQLClient({
  url: "https://api.covidstats.com.au/graphql",
});

ReactDOM.render(
  <ClientContext.Provider value={client}>
    <App />,
  </ClientContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
