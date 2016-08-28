import * as m from "mithril";

export default class Header {
    public title: Mithril.Property<string>;

    constructor() {
        this.title = m.prop("Home");
    }
}
