import { LightningElement, wire } from 'lwc';
import searchTemplates from '@salesforce/apex/ChecklistTemplateController.searchTemplates';
//import { NavigationMixin } from 'lightning/navigation';

// Import message service features required for publishing and the message channel
import { publish, subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';
import MESSAGE_REQUESTED_CHANNEL from '@salesforce/messageChannel/Message_Requested__c';

export default class ChkTemplateSearch extends LightningElement {
    category = [{label:"Test", value:"Test"},{label:"Test1", value:"Test1"}];
    templates = [];
    _err = null;
    _catg = null; 
    _tmpl = null;
    reqchannel = null;

    @wire(MessageContext)
    messageContext;

    // Respond to UI event by publishing message
    handleTemplateSelect(event) {
        const payload = { recordId: event.target.contact.Id };

        publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload);
    }

    @wire(searchTemplates, {category: '$_catg'})
    loadTemplates({error, data}){
        let comboData = [];
        if(data){
            data.forEach(value=> {
                comboData.push({label:value.Name, value:value.Id});
            });
            this.templates = comboData;
        }
        else if(error && this._catg !== null){
            this._err = 'No templates found for selected category. Please try again.';
        }
    }

    get hasTemplates(){
        return this.templates.length > 0;
    }

    reset(){
        this.templates = [];
        this._err = null;
        this._tmpl = null;
    }

    handleCategoryChange(event){
        this.reset();
        this._catg = event.target.value;
    }

    handleSelectTemplateClick(event){
        let t = this.template.querySelector(".Template");
        if(t===null || t.value === null || t.value.length ===0) return;

        this._tmpl = {Id:t.value, Name:t.label};
        publish(this.messageContext, RECORD_SELECTED_CHANNEL, this._tmpl);
    }

    msg;
    handlePostMessageClick(event){
        this.msg=Math.floor(Math.random() * 50000);
        let msgObj = {Id:this.msg, Name:this.msg};
        publish(this.messageContext, RECORD_SELECTED_CHANNEL, msgObj);
    }

    // Encapsulate logic for LMS subscribe.
    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            MESSAGE_REQUESTED_CHANNEL,
            (message) => this.handleMessage(message),
            { scope: APPLICATION_SCOPE }
        );
    }

    // Handler for message received by component
    handleMessage(message) {
        if( message.channel === 'RECORD_SELECTED_CHANNEL' ){
            this.template.querySelector(".post-msg").click();
        }
    }

    // Standard lifecycle hooks used to sub/unsub to message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
}