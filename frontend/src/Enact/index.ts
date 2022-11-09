function createElement(tag: JSX.Tag | JSX.Component, attributes: { [key: string]: any } | null, ...children: Node[]) {
  if (typeof tag === "function") {
    return tag(attributes ?? {}, children);
  }
  type Tag = typeof tag;
  const element: HTMLElementTagNameMap[Tag] = document.createElement(tag);

  // Assign attributes:
  const map = attributes ?? {};
  let prop: keyof typeof map;
  for (prop of Object.keys(map) as any) {
    // Extract values:
    prop = prop.toString();
    const value = map[prop] as any;
    const anyReference = element as any;
    if (typeof anyReference[prop] === "undefined") {
      // As a fallback, attempt to set an attribute:
      element.setAttribute(prop, value);
    } else {
      anyReference[prop] = value;
    }
  }

  // append children
  for (const child of children) {
    if (typeof child === "string") {
      element.innerText += child;
      continue;
    }
    if (Array.isArray(child)) {
      element.append(...child);
      continue;
    }
    element.appendChild(child);
  }
  return element;
}

function useState<T>(def: T): [value: T, updater: (t: T) => void] {
  return [def, (x) => 1];
}

function useEffect<T>(f: () => void, deps: T[]) {
  return;
}

export default { createElement, useState, useEffect };
