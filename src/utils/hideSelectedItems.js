const hideItems = (items) => {
  if (items !== null && items.length !== 0) {
    items.map((item) =>
      document.querySelector(`[data-row-key= "${item}"]`).classList.add('hidden'),
    );
  }
};
const viewItems = (items) => {
  if (items && items.length !== 0) {
    items.map((item) =>
      document.querySelector(`[data-row-key= "${item}"]`).classList.remove('hidden'),
    );
  }
};
export { hideItems, viewItems };
