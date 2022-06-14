export function getObjectDepth(obj,...args) {
    if (args.length > 0) {
        return args.reduce((prev,curr,i,self)=>(prev[curr] || ((i == self.length - 1) ? null : {})), obj);
    }
    return JSON.parse(obj || `{}`);
}
export function setObjectDepth(obj,...args) {
    args.reduce((prev,curr,i,self)=>{
        if (i == self.length - 1)
            return prev;
        if (i == self.length - 2)
            return prev[curr] = self[i + 1];
        return prev[curr] = (prev[curr] || {})
    }, obj);
}