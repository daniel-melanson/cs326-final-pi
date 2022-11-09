/// <reference lib="DOM" />
declare namespace JSX {
  type Element = HTMLElement;

  type IntrinsicElements = IntrinsicElementMap;

  type IntrinsicElementMap = {
    [K in keyof HTMLElementTagNameMap]: {
      [k: string]: any;
    };
  };

  type Tag = keyof IntrinsicElementMap;

  interface Component {
    (properties?: { [key: string]: any }, children?: Node[]): Node;
  }
}
