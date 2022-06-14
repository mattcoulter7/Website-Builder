import DTO from "./DTO";

export default class PageDTO extends DTO {
    #name;
    #websiteId;
    constructor(obj){
        super(obj);
        this.#name = obj.name;
        this.#websiteId = obj.websiteId;
    }
    get name(){
        return this.#name;
    }
    get websiteId(){
        return this.#websiteId;
    }
    toJSON() { // override this
        return {
            _id:this._id,
            name:this.name,
            websiteId:this.websiteId
        }
    }
}