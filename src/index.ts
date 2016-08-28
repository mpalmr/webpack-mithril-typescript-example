import "./test.scss";
import * as m from "mithril";
import containers from "containers";

document.addEventListener("DOMContentLoaded", (event: Event): void => {
    m.route.mode = "pathname";
    m.route(<Element> document.getElementById("main"), "/", {
        "/": containers.Home,
    });
    m.mount(<Element> document.getElementById("header"), containers.Header);
});

// Reference for unit tests
if (COMPILE_CONSTANTS.env === "test") {
    (<any> window).TESTREF = { containers };
}
