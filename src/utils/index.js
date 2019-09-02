/**
 * Recursively traverses an array or object and calls a provided function for
 * every leaf element. Function's signature is (key, value) => value
 * @param {Function} cb 
 * @param {Object|Array} obj 
 * @param {*} keyName 
 */
export function mapObjArray(cb, obj, keyName = null) {
  if (Array.isArray(obj)) {
    return obj.map((item, key) => mapObjArray(cb, item, key));
  } else if (typeof obj === "object") {
    return Object.keys(obj).reduce((res, key) => {
      if (obj.hasOwnProperty(key)) {
        res[key] = mapObjArray(cb, obj[key], key);
      }
      return res;
    }, {});
  } else {
    return cb(keyName, obj);
  }
};
