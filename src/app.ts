import { module, element, bootstrap, ILogService } from "angular";

import { AppComponent } from "./app-component/app.component";

import "../main.scss";
import "./app.scss";

export let app = module("app", []).component(
  "appPermission",
  new AppComponent()
);

element(document).ready(() => {
  bootstrap(document, ["app"]);
});
