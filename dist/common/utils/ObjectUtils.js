"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._objectWithoutProperties = exports.toJSONAnInstance = void 0;
function toJSONAnInstance(instance) {
    return JSON.parse(JSON.stringify(instance));
}
exports.toJSONAnInstance = toJSONAnInstance;
function _objectWithoutProperties(obj, keys) {
    const target = {};
    for (var i in obj) {
        if (keys.indexOf(i) >= 0)
            continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
            continue;
        target[i] = obj[i];
    }
    return target;
}
exports._objectWithoutProperties = _objectWithoutProperties;
//# sourceMappingURL=ObjectUtils.js.map