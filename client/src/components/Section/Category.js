import React from "react";
import { withRouter, Route } from "react-router-dom";
import CategoryList from "./CategoryList";
import Categories from "./Categories";
const Category = ({ match }) => {
  return (
    <div>
      <Route exact path={match.path} render={() => <Categories />} />
      <Route
        path={`${match.path}/:id`}
        render={({ match }) => <CategoryList match={match} />}
      />
    </div>
  );
};

export default withRouter(Category);
