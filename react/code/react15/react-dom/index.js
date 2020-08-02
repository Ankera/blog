import { createDOM } from "../react/vdom";
function render(element, container) {
    let dom = createDOM(element);

    container.appendChild(dom);
}

export default {
    render
}