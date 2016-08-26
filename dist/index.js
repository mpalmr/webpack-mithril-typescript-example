"use strict";
require("./test.scss");
const m = require("mithril");
const Header = require("containers/Header");
document.addEventListener("DOMContentLoaded", function (event) {
    m.mount(document.getElementById("header"), Header);
});
