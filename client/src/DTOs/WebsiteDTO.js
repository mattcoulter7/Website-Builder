import DTO from "./DTO";

export default class WebsiteDTO extends DTO {
    #companyName;
    constructor(obj){
        super(obj);
        this.#companyName = obj.companyName;
    }
    get companyName(){
        return this.#companyName;
    }
    toJSON() { // override this
        return {
            _id:this._id,
            companyName:this.companyName,
        }
    }
}