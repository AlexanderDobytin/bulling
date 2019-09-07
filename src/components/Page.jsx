import * as React from "react";
import { observer, inject } from "mobx-react";
import { WrappedHorizontalLoginForm } from "./Logpass";
import Search from "./Search";
const Page = ({ store }) => {
  return (
    <div>
      {store.isAuthorized !== undefined ? (
        <Search />
      ) : (
        <WrappedHorizontalLoginForm />
      )}
    </div>
  );
};
export default inject("store")(observer(Page));
