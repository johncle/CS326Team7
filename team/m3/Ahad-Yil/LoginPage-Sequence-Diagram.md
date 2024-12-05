## Description:

The Login Page, once backend logic is implemented, is intended for users to be able to login via their spotify accounts. The Login Page is implemented in LoginPage.js, but uses events (observer) to signal the app controller to switch views. The LoginPage is the default view and utilizes a link to the HomePage to allow for easy traversal. 

## Diagram

```mermaid
sequenceDiagram
    User->>+LoginPage: Render Login Page On Startup
    User->>+LoginPage: Render Homepage After User Interacts w/"Go to Homepage"
    LoginPage->>+ EventHub: Publish SwitchPage("home")
    EventHub->>+ AppController: SwitchPage Event
    EventHub->>+ AppController: Update The Current View
    EventHub->AppController: Render The Home Page
```
