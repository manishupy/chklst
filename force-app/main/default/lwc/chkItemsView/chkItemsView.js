import { LightningElement, wire } from 'lwc';
import { publish, subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';
import MESSAGE_REQUESTED_CHANNEL from '@salesforce/messageChannel/Message_Requested__c';

export default class ChkItemsView extends LightningElement {
    recordId;

    @wire(MessageContext)
    messageContext;

    // Encapsulate logic for LMS subscribe.
    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            RECORD_SELECTED_CHANNEL,
            (message) => this.handleMessage(message),
            { scope: APPLICATION_SCOPE }
        );
        console.log(this.recordId);
    }

    // Handler for message received by component
    handleMessage(message) {
        this.recordId = message.Id;
    }

    // Standard lifecycle hooks used to sub/unsub to message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
        let msgObj = {channel: 'RECORD_SELECTED_CHANNEL'};
        publish(this.messageContext, MESSAGE_REQUESTED_CHANNEL, msgObj);
    }
}