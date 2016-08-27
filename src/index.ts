import "./test.scss";
import * as m from "mithril";
import * as Header from "containers/Header";
import * as Home from "containers/Home";

document.addEventListener("DOMContentLoaded", function (event: Event) {
    m.route.mode = "pathname";
    m.route(<Element>document.getElementById("main"), "/", {
        "/": Home,
    });
    m.mount(<Element>document.getElementById("header"), Header);
});
