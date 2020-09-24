const hideItems = (items) => {
  if (items && items.length) {
    items.map((item) =>
      document.querySelector(`[data-row-key= "${item}"]`).classList.add('hidden'),
    );
  }
};
const viewItems = (items) => {
  if (items && items.length) {
    items.map((item) =>
      document.querySelector(`[data-row-key= "${item}"]`).classList.remove('hidden'),
    );
  }
};
export { hideItems, viewItems };
