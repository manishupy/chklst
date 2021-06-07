@IsTest(SeeAllData=false)
public class ClassToBeRenamedTest {

    @isTest
    public static void shoulGetOKStatus(){
        Test.startTest();
        String status = ClassToBeRenamed.getSomeStatus();
        Test.stopTest();
        System.assertEquals('All OK', status, 'Should be OK');
    }
}