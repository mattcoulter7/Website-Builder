export default (func) => {
    var split = func.toString().split(/[{}]/);
    split = split.splice(1, split.length - 2);
    return split.map(line => line.trim()).join("") != "";
}