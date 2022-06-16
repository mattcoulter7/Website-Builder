import DTO from "./DTO";

export default class ComponentDTO extends DTO {
    #parentId;
    #type;
    #value;
    #src;
    #children;
    constructor(obj){
        super(obj);
        this.#parentId = obj.parentId;
        this.#type = obj.type;
        this.#value = obj.value;
        this.#src = obj.src;
        this.#children = []; // needs to be fetched in manually
    }
    get parentId(){
        return this.#parentId;
    }
    get type(){
        return this.#type;
    }
    get value(){
        return this.#value;
    }
    get src(){
        return this.#src;
    }
    get children(){
        return this.#children;
    }
    set children(value){
        this.#children = value;
    }
    toJSON() { // override this
        return {
            _id:this._id,
            parentId:this.parentId,
            type:this.type,
            value:this.value,
            src:this.src
        }
    }
}