//#region Base Request
export class Request {
    constructor(path, options = {}) {
        this.options = options;
        this.path = path;
    }

    get url() {
        return new URL(`${this.path.join("/")}`, "http://localhost:3001"); // ensure it is the database url
    }

    execute() {
        // use promise to be able to call resolve and reject conditionally
        return new Promise((resolve, reject) => {
            try {
                fetch(this.url.toString(), this.options).then((data) => {
                    if (data.ok) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                }).catch(e => {
                    reject(e);
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}
//#endregion

//#region Type Requests
export class GetRequest extends Request {
    constructor(path) {
        super(path, {
            method: "GET"
        });
    }
}

export class PostRequest extends Request {
    constructor(path, body, headers = {
        'Content-Type': 'application/json'
    }) {
        super(path, {
            method: "POST",
            headers: headers,
            body: body
        });
    }
}
export class PutRequest extends Request {
    constructor(path, body, headers = {
        'Content-Type': 'application/json'
    }) {
        super(path, {
            method: "PUT",
            headers: headers,
            body: body
        });
    }
}
export class DeleteRequest extends Request {
    constructor(path) {
        super(path, {
            method: "DELETE"
        });
    }
}

//#endregion

//#region CRUD Requests
export class Select extends GetRequest {
    constructor(table) {
        super(['query', table]);
    }
}

export class SelectId extends GetRequest {
    constructor(table, id) {
        super(['query', table, id]);
    }
}

export class Update extends PutRequest {
    constructor(table, obj) {
        super(['query', table, obj._id], JSON.stringify(obj));
    }
}

export class Insert extends PostRequest {
    constructor(table, obj) {
        super(['query', table], JSON.stringify(obj));
    }
}

export class Delete extends DeleteRequest {
    constructor(table, id) {
        super(['query', table, id]);
    }
}
//#endregion