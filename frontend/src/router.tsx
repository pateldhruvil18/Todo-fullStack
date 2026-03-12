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
import Verify from "./routes/verify";

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

  beforeLoad: () => {
    const token = localStorage.getItem("token");

    if (token) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },

  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",

  beforeLoad: () => {
    const token = localStorage.getItem("token");

    if (token) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },

  component: Register,
});

const verifyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verify",

  beforeLoad: () => {
    const token = localStorage.getItem("token");

    if (token) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },

  component: Verify,
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
  verifyRoute,
  dashboardRoute,
]);

export const router = createRouter({
  routeTree,
});