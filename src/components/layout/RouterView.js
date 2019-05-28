import React from "react";
import { renderRoutes } from "react-router-config";

const RouterView = ({ route }) => <div>{renderRoutes(route.routes)}</div>;

export default RouterView;
