"use strict";
require("./test.scss");
const m = require("mithril");
const containers_1 = require("containers");
document.addEventListener("DOMContentLoaded", (event) => {
    m.route.mode = "pathname";
    m.route(document.getElementById("main"), "/", {
        "/": containers_1.default.Home,
    });
    m.mount(document.getElementById("header"), containers_1.default.Header);
});
if (COMPILE_CONSTANTS.env === "test") {
    window.TESTREF = { containers: containers_1.default };
}
