export abstract class IMDAttribute {
    abstract toHTML():Attr[];
}

export class MDEmpty extends IMDAttribute {
    constructor() { super() }
    toHTML = ():Attr[] => [];
}

export class MDAttribute extends IMDAttribute {
    key:string;
    value:string;
    next:IMDAttribute;

    constructor(key:string, value:string, next:IMDAttribute) {
        super();
        this.key = key;
        this.value = value;
        this.next = next;
    }

    toHTML = ():Attr[] => {
        const tama = document.createAttribute(this.key);
        tama.value = this.value;
        return [tama].concat(this.next.toHTML());
    }
}
