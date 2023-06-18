import React from "react";

import { Icon } from "@chakra-ui/react";
import { MdHome, MdLock } from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Lines from "views/admin/lines";
import Stations from "views/admin/stations";
import TicketsTypes from "views/admin/ticketsTypes";
import Terminals from "views/admin/terminals";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import SignUpCentered from "views/auth/signUp";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Lines",
    layout: "/admin",
    path: "/lines",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Lines,
  },
  {
    name: "Stations",
    layout: "/admin",
    path: "/stations",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Stations,
  },
  {
    name: "Tickets Types",
    layout: "/admin",
    path: "/tickets-types",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: TicketsTypes,
  },
  {
    name: "Terminals",
    layout: "/admin",
    path: "/terminals",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: Terminals,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "/sign-up",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignUpCentered,
  },
];

export default routes;
