import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Logon from "./pages/logon";
import Register from "./pages/Register";
import NewDevice from "./pages/newDevice";
import NewSensor from "./pages/newSensor";
import MainMenu from "./pages/main";
import ListSensor from "./pages/listSensor";
import AlterDevice from "./pages/alterDevice";
import AlterSensor from "./pages/alterSensor";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/newDevice" exact component={NewDevice} />
        <Route path="/newSensor" exact component={NewSensor} />
        <Route path="/main" component={MainMenu} />
        <Route path="/listSensor" component={ListSensor} />
        <Route path="/alterDevice" exact component={AlterDevice} />
        <Route path="/alterSensor" exact component={AlterSensor} />
      </Switch>
    </BrowserRouter>
  );
}
