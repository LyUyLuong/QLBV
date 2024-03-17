const createTree = (arr, MAKHOA = null) => {
    const tree = [];
    arr.forEach((item) => {
        if (item.KHOA_CHA === MAKHOA) {
            const newItem = item;
            const children = createTree(arr, item.MAKHOA);
            if (children.length > 0) {
                newItem.children = children;
            }
            tree.push(newItem);
        }
    });
    return tree;
};

module.exports = (arr, parentId = "") => {
    const tree = createTree(arr, MAKHOA = null);
    return tree;
}  