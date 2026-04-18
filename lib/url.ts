import qs from "query-string"
interface UrlQueryPrams {
    params: string;
    key: string;
    value: string;
}
interface RemoveUrlQueryPrams {
    params: string;
    keysToRemove: string[];
}
export const formUrlQuery = ({params, key, value}: UrlQueryPrams) => {
    const queryString = qs.parse(params);
    queryString[key] = value;

    return qs.stringifyUrl({
        url: window.location.pathname,
        query: queryString,
    })
};

export const removeKeysFromUrlQuery = ({params, keysToRemove}: RemoveUrlQueryPrams) => {
    const queryString = qs.parse(params);
    keysToRemove.forEach((key) => {
        delete queryString[key];
    });

    return qs.stringifyUrl({
        url: window.location.pathname,
        query: queryString,
    }, {skipNull: true});
};

