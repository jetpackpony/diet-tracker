/**
 * Recursively traverses an array or object and calls a provided function for
 * every leaf element. Function's signature is (key, value) => value
 * @param {Function} cb 
 * @param {Object|Array} obj 
 * @param {*} keyName 
 */

type Val = string | number | boolean | null | undefined;
type NestedArray = Array<NestedValue | Val>;
type NestedObject = { [key: string]: (NestedValue | Val) };
type NestedValue = NestedArray | NestedObject | Val;

export function mapObjArray(
  cb: (key: string, value: Val) => Val,
  obj: NestedValue,
  keyName = ""
): NestedValue {
  if (Array.isArray(obj)) {
    return obj.map((item, key) => mapObjArray(cb, item, key.toString()));
  } else if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj).reduce((res, key) => {
      if (obj.hasOwnProperty(key)) {
        res[key] = mapObjArray(cb, obj[key], key);
      }
      return res;
    }, {} as NestedObject);
  } else {
    return cb(keyName, obj);
  }
};
