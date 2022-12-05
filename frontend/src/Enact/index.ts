function createElement(tag: JSX.Tag | JSX.Component, attributes: { [key: string]: any } | null, ...children: Node[]) {
  // tag is a JSX.Component (user-defined)
  if (typeof tag === "function") {
    return tag(attributes ?? {}, children);
  }

  // tag is a HTML element tag name
  const element = document.createElement(tag);
  if (attributes) {
    for (const key of Object.keys(attributes)) {
      if (key.startsWith("__")) continue;

      if (key.startsWith("on") && "A".charCodeAt(0) <= key.charCodeAt(2)) {
        element.addEventListener(key.substring(2).toLowerCase(), attributes[key]);
      } else if ((element as any)[key] === undefined) {
        // If the key is not an attribute, make it one
        element.setAttribute(key, attributes[key]);
      } else {
        // Otherwise set the attribute
        (element as any)[key] = attributes[key];
      }
    }
  }

  for (const child of children) {
    if (typeof child !== "object") {
      element.innerText += String(child);
    } else if (Array.isArray(child)) {
      element.append(...child);
    } else {
      element.appendChild(child);
    }
  }
  return element;
}

export default { createElement };
