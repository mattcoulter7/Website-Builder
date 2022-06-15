import DTO from "./DTO";

export default class ComponentDTO extends DTO {
    #pageId;
    #type;
    #title;
    #body;
    #imageUrl;
    constructor(obj){
        super(obj);
        this.#pageId = obj.pageId;
        this.#type = obj.type;
        this.#title = obj.title;
        this.#body = obj.body;
        this.#imageUrl = obj.imageUrl;
    }
    get pageId(){
        return this.#pageId;
    }
    get type(){
        return this.#type;
    }
    get title(){
        return this.#title;
    }
    get body(){
        return this.#body;
    }
    get imageUrl(){
        return this.#imageUrl;
    }
    toJSON() { // override this
        return {
            _id:this._id,
            pageId:this.pageId,
            type:this.type,
            title:this.title,
            body:this.body,
            imageUrl:this.imageUrl
        }
    }
}