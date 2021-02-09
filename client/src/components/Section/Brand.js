import React from "react";
import { withRouter, Route } from "react-router-dom";
import BrandList from "./BrandList";
import Brands from "./Brands";
const Brand = ({ match }) => {
  return (
    <div>
      <Route exact path={match.path} render={() => <Brands />} />
      <Route
        path={`${match.path}/:id`}
        render={({ match }) => <BrandList match={match} />}
      />
    </div>
  );
};

export default withRouter(Brand);
