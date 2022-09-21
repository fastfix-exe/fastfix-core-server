export function toJSONAnInstance (instance: any) {
    return JSON.parse(JSON.stringify(instance));
}

export function _objectWithoutProperties(obj: any, keys: string[]) {
    const target: any = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }