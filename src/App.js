import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Items from "./pages/Items";
import ManageItems from "./pages/admin/ManageItems";
import CreateItem from "./pages/admin/CreateItem";
import UpdateItem from "./pages/admin/UpdateItem";
import Item from "./pages/Item";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Items} />
        <Route path="/admin/ManageItems" exact component={ManageItems} />
        <Route path="/admin/CreateItem" exact component={CreateItem} />
        <Route path="/Item/:id" exact component={Item} />
        <Route path="/UpdateItem/:id" component={UpdateItem} />
        <Items />
      </Switch>
    </Router>
  );
}

export default App;
