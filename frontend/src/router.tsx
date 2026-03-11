import {
  createRouter,
  createRootRoute,
  createRoute,
  redirect
} from "@tanstack/react-router";

import Root from "./routes/__root";
import Home from "./routes/index";
import Login from "./routes/login";
import Register from "./routes/register";
import Dashboard from "./routes/dashboard";

const rootRoute = createRootRoute({
  component: Root,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",

  beforeLoad: () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw redirect({
        to: "/login",
      });
    }
  },

  component: Dashboard,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  dashboardRoute,
]);

export const router = createRouter({
  routeTree,
});