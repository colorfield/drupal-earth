/**
 * Returns a sorted array by value from a flat (key/value) object.
 * 
 * @param {*} object 
 */
export const getSortedArrayByValue = (object) => {
    const result = [];
    for (var item in object) {
      result.push([item, object[item]]);
    }
    result.sort((a, b) => {
      return a[1] - b[1];
    });
    return result;
}

/**
 * Returns a sorted array by item key from a multidimensionnal object.
 * 
 * @param {*} object 
 * @param string sortKey 
 */    
export const getSortedArrayByItemKey = (object, sortKey) => {
    const result = [];
    for (var item in object) {
        result.push([item, object[item]]);
    }
    result.sort((a, b) => {
        if (a[1].hasOwnProperty(sortKey) && b[1].hasOwnProperty(sortKey)) {
        return a[1][sortKey] - b[1][sortKey];
        }
        return true;
    });
    return result;
}

/**
 * Converts a flat key value object to a flat key value array.
 * 
 * @param {*} object 
 */
export const objectToArray = (object) => {
    const result = [];
    if (object !== undefined) {
        for (var item in object) {
            result.push([item, object[item]]);
        }
    }
    return result;
}

/**
 * Set the first letter as capital.
 * 
 * @param {*} string
 */
export const capitalize = (string) => {
    if (typeof string !== 'string') return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
}
