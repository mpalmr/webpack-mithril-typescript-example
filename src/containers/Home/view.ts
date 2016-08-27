import * as m from "mithril";

export default function view(ctrl: any): Mithril.VirtualElement {
    return m("img", {
        src: "/img/kitty.jpg",
        alt: "A kitty!",
    });
}
