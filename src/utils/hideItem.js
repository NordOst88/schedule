const hideItems = (items) => {
  if (items !== []) {
    items.selectedRowKeys.map((item) =>
      document.querySelector(`[data-row-key= "${item}"]`).classList.add('hidden'),
    );
  }
  localStorage.setItem('isHidden', true);
};
const viewItems = (items) => {
  if (items !== []) {
    items.selectedRowKeys.map((item) =>
      document.querySelector(`[data-row-key= "${item}"]`).classList.remove('hidden'),
    );
  }
  localStorage.setItem('isHidden', false);
};
export { hideItems, viewItems };
