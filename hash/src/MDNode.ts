import { IMDAttribute } from "./MDAttribute";

export abstract class IMDNode {
    abstract toHTML():Node[];
}

export class MDNone extends IMDNode {
    constructor() { super() }
    toHTML = ():Node[] => [];
}

export class MDTag extends IMDNode {
    name:string;
    at:IMDAttribute;
    chd:IMDNode;
    sib:IMDNode;

    constructor(name:string, at:IMDAttribute, chd:IMDNode, sib:IMDNode) {
        super();
        this.name = name;
        this.at = at;
        this.chd = chd;
        this.sib = sib;
    }

    toHTML = ():Node[] => {
        const tama = document.createElement(this.name);
        this.at.toHTML().forEach((atNode) => tama.setAttributeNode(atNode));
        tama.replaceChildren(...this.chd.toHTML());
        return ([tama] as Node[]).concat(this.sib.toHTML());
    }
}
