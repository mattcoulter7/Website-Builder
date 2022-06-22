import DTO from "./DTO";

export default class ComponentDTO extends DTO {
    #parentId;
    #type;
    #value;
    #src;
    #index;
    #isTemplate;
    #thumbnail;
    constructor(obj) {
        super(obj);
        this.#parentId = obj.parentId;
        this.#type = obj.type;
        this.#value = obj.value;
        this.#src = obj.src;
        this.#index = obj.index;
        this.#isTemplate = obj.isTemplate;
        this.#thumbnail = obj.thumbnail;
    }
    get parentId() {
        return this.#parentId;
    }
    set parentId(value) {
        this.#parentId = value;
    }
    get type() {
        return this.#type;
    }
    set type(value) {
        this.#type = value;
    }
    get value() {
        return this.#value;
    }
    set value(value) {
        this.#value = value;
    }
    get src() {
        return this.#src;
    }
    set src(value) {
        this.#src = value;
    }
    get index() {
        return this.#index;
    }
    set index(value) {
        this.#index = value;
    }
    get isTemplate() {
        return this.#isTemplate;
    }
    set isTemplate(value) {
        this.#isTemplate = value;
    }
    get thumbnail() {
        return this.#thumbnail;
    }
    set thumbnail(value) {
        this.#thumbnail = value;
    }
    toJSON() { // override this
        return {
            _id: this._id,
            parentId: this.parentId,
            type: this.type,
            value: this.value,
            src: this.src,
            index: this.index,
            isTemplate: this.isTemplate,
            thumbnail: this.thumbnail
        }
    }
}