import _ from 'lodash';
export function paginate(items,pageNumber,pageSize) {
        // 1 => 0,3
        // 2 => 4,7
        // 3 => 8,11
    const startIndex = (pageNumber - 1)*pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
}