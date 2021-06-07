import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getTemplate from '@salesforce/apex/ChecklistTemplateController.getTemplate';
import NAME_FIELD from '@salesforce/schema/Checklist_Template__c.Name';
import CATEGORY_FIELD from '@salesforce/schema/Checklist_Template__c.Category__c';

export default class ChkEntryForm extends LightningElement {
    @api intemplate;
    _checklist;
    _err = null;

    get hasChecklistItems(){
        return this.checklistItems && this.checklistItems.lenth > 0;
    }
    
    get getChecklistItems(){
        console.log('In getChecklistItems (): '+this._checklist);
        if( !this._checklist || !this._checklist[0] || !this._checklist.Checklist_Template_Questions__r) return null;
        return this._checklist.Checklist_Template_Questions__r;
    }

    @wire(getTemplate, {recId: '$intemplate.Id'})
    loadChecklistItems({error,data}){
        if(data){
            this._checklist = data;
        }
        else if(error){
            this._err = 'Selected templates is blank, contact Salesforce Administrator for support.';
        }
    }
}