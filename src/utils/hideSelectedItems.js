const hideSelectedItems = (items = []) => {
  if (items.length) {
    items.map((item) =>
      document.querySelector(`[data-row-key= "${item}"]`).classList.add('hidden'),
    );
  }
};
const showSelectedItems = (items = []) => {
  if (items.length) {
    items.map((item) =>
      document.querySelector(`[data-row-key= "${item}"]`).classList.remove('hidden'),
    );
  }
};
export { hideSelectedItems, showSelectedItems };
