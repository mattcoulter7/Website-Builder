import * as CRUD from './CRUD.js';

class FileDAO {
    constructor(table) {
        this.table = table;
    }

    select(fileName){
        return new CRUD.GetRequest([this.table,fileName]).execute()
            .then((response) => {
                return response.json()
            })
    }

    insert(file){
        var formData = new FormData();
        formData.set('file',file)
        return new CRUD.PostRequest([this.table],formData,{}).execute()
            .then((response) => {
                return response.text()
            })
    }

    delete(fileName){
        return new CRUD.DeleteRequest([this.table,fileName]).execute()
            .then((response) => {
                return response.json()
            })
    }
}

const fileDAO = new FileDAO('file');

Window.FileDAO = fileDAO;

export default fileDAO;