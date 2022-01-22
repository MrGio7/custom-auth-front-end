import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode, { JwtPayload } from "jwt-decode";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WS_LINK!,
  options: {
    reconnect: true,
  },
});

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_HTTP_LINK!,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");

  return {
    headers: {
      ...headers,
      authorization: token ? "Bearer " + token : "",
    },
    credentials: "include",
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = localStorage.getItem("accessToken");

        if (!token) return true;

        try {
          const { exp } = jwtDecode<JwtPayload>(token);
          if (exp && Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch(
          process.env.REACT_APP_REFRESH_TOKEN_LINK!,
          {
            method: "POST",
            credentials: "include",
          }
        );
      },
      handleFetch: (accessToken) => {
        localStorage.setItem("accessToken", accessToken);
      },
      handleError: (err) => {
        // full control over handling token fetch Error
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);

        // your custom action here
      },
    }),
    authLink,
    splitLink,
  ]),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
