export default class FilterCategory extends HTMLElement {
  connectedCallback() {
    this.outerHTML = `
        <button
          type="button"
          class="col-2 mx-1 btn btn-outline-dark"
          data-bs-container="body"
          data-bs-toggle="popover"
          data-bs-placement="bottom"
          data-bs-content="Bottom popover"
        >
          <div class="row-fluid px-0 text-start">
            <span class="col alight-self-start">
              ${this.innerHTML}
            </span>
            <div class="col align-self-end">
              <img src=".." />
            </div>
          </div>
        </button>`;
  }
}
