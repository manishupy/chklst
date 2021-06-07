import { LightningElement, wire } from 'lwc';
import { APPLICATION_SCOPE, MessageContext, publish, subscribe, unsubscribe} from 'lightning/messageService';
import REQ_MSG_CHANNEL from '@salesforce/messageChannel/Message_Requested__c';
import DATA_MSG_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';
import getOKStatus from "@salesforce/apex/ClassToBeRenamed.getOKStatus";

export default class PocLandingPage extends LightningElement {
    _status;

    @wire(getOKStatus)
    wiredData({ error, data }) {
      if (data) {
        this._status = data;
      } else if (error) {
        console.error('Error:', error);
      }
    }

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.subscription = subscribe(this.messageContext, REQ_MSG_CHANNEL,
            (result) => {
                console.log(result);
                handleMessage(result);
            } ,{ scope: APPLICATION_SCOPE }
        );
    }

    handleMessage(result){
        if(result.channel === ''){
            const payload = { msg: 'values' };
            publish(this.messageContext, DATA_MSG_CHANNEL, payload);    
        }
    }

}