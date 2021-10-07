import _ from 'lodash';

export function paginate(items, currentPage, pageSize) {
  const startingIndex = (currentPage - 1) * pageSize;
  return _(items).slice(startingIndex).take(pageSize).value();
}
