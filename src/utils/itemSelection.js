const selection = (items) => {
  if (items !== []) {
    items.selectedRowKeys.map((item) =>
      document.querySelector(`[data-row-key= "${item}"]`).classList.add('selected'),
    );
  }
};
const unselected = (items) => {
  if (items !== []) {
    items.selectedRowKeys.map((item) =>
      document.querySelector(`[data-row-key= "${item}"]`).classList.remove('selected'),
    );
  }
};
export { selection, unselected };
