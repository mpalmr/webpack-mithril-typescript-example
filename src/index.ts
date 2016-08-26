import "./test.scss";
import * as m from "mithril";
import * as Header from "containers/Header";

document.addEventListener("DOMContentLoaded", function (event: Event) {
    m.mount(<Element>document.getElementById("header"), Header);
});
