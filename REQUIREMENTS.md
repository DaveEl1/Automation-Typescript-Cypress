the requirements are for an automation framework built with cypress and typescript

the framework will test http://localhost:5173/

the frameworks purpose is to show a modular design with reusable test code, to show best practices in creating an easy to maintain test framework. the code for each step in the user journey should be independent of any code that performs actions

The code structure will have a separate file for each page or action. 
the locators for a page will have its own file
action's will have their own file
actor's will have their own file for each page
validator's will have their own file for each page
coordinator will have their own file for each page
where functionality is repeated on multiple pages, a base page/actor/validator/locator/coordinator will be used to contain shared functionality, and inherited by child pages
 
definitions:
action: an action performed by cypress, eg, click, wait, scroll, enter text
actor: code that performs and action by the user. eg, populate a text field and click a submit button
validator: code that performs validation after a user action. eg, if a required field is not populated after a submit button is clicked(in an actor), an error message is displayed
coordinator: code combining actor , validator and other coordinator functions to perform a workflow. eg, open a form, populate the data, click submit and validate there are no errors
