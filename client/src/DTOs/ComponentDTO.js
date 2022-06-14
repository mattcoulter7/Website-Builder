import DTO from "./DTO";

export default class ComponentDTO extends DTO {
    #pageId;
    constructor(obj){
        super(obj);
        this.#pageId = obj.pageId;
    }
    get pageId(){
        return this.#pageId;
    }
    toJSON() { // override this
        return {
            _id:this._id,
            pageId:this.pageId,
        }
    }
}