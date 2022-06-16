export const parse = () => {
    return {
        ...window.location,
        query:window.location.search.substring(1)
    }
}


export const params = () => {
    let queryString = parse().query;
    return Object.fromEntries(queryString.split("&").filter(a => a).map((pair) => pair.split("=")))
}