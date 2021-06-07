public with sharing class ChecklistTemplateController {
    
    @AuraEnabled(cacheable=true)
    public static List<Checklist_Template__c> searchTemplates(String category){
        List<Checklist_Template__c> templates = null;
        AuraHandledException ex;
        try{
            templates = [SELECT Id, Name, Is_Active__c, Category__c FROM Checklist_Template__c WHERE Category__c =: category AND Is_Active__c = true  WITH SECURITY_ENFORCED];
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        if(templates.isEmpty()){
            throw new AuraHandledException('No templates found.');
        } 
        return templates;
    }

    @AuraEnabled(cacheable=true)
    public static Checklist_Template__c getTemplate(Id recId){
        Checklist_Template__c template = null;
        AuraHandledException ex;
        try{
            template = [SELECT Id, Name, 
                            (SELECT Id, Name, Question__c, Section_Header__c, Question_Order__c, Section_Order__c FROM Checklist_Template_Questions__r WHERE Is_Active__c = true) 
                         FROM Checklist_Template__c WHERE Id =: recId AND Is_Active__c = true WITH SECURITY_ENFORCED LIMIT 1];
            //SObjectAccessDecision decision = Security.stripInaccessible(AccessType.READABLE, templates, true);
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        return template;
    }
}
