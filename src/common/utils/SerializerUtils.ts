export function toJSONAnInstance (instance: any) {
    return JSON.parse(JSON.stringify(instance));
}