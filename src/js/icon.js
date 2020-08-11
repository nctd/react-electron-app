export const addIcon = (key) => {
  const tabPane = document.getElementById(`rc-tabs-0-tab-${key}`);
  const markup = `<div class="alert alert--test">test</div>`;
  console.log(tabPane);

  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
};
