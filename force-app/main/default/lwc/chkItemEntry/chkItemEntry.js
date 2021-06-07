import { LightningElement, api } from 'lwc';

export default class ChkItemEntry extends LightningElement {
    @api item;

    connectedCallback(){
        console.log('In ChkItemEntry:: '+item);
    }
}