({
    handleRecordUpdate: function(component, event, helper) {
        /*var accountFields = component.get("v.accFields");
        var workspaceAPI = component.find("workspace");
        workspaceAPI.getFocusedTabInfo().then(function(response) {
            var focusedTabId = response.tabId;
            workspaceAPI.setTabLabel({
                tabId: focusedTabId,
                label: accountFields.Type + ' - ' + accountFields.Name
            });
            
            workspaceAPI.openSubTab({
                parentTabId: focusedTabId,
                recordId: '0035g000005omT0AAI',
                focus: true
            });
        });*/
    },
    
    handleOpenCaseClick: function(component, event, helper) {
        //var accountFields = component.get("v.accFields");
        var workspaceAPI = component.find("workspace");
        workspaceAPI.openSubtab({
                pageReference: {
                    "type": "standard__component",
                    "attributes": {
                        "componentName": "c__mySubTab"
                    }
                },
                focus: true
            }).then(function(subtabId){
                workspaceAPI.setTabLabel({
                    tabId: subtabId,
                    label: "Clone Case"
                });
                workspaceAPI.setTabIcon({
                    tabId: subtabId,
                    icon: "action:new_case",
                    iconAlt: "Clone Case"
                });
            }).catch(function(error) {
                console.log(error);
            });
    }, 
})