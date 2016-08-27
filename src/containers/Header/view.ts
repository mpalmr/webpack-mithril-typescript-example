import "./style.scss";
import * as m from "mithril";

export default function view(ctrl: any): Mithril.VirtualElement {
    return m("h1.bg-example", "Example App!");
}
