# Communities Page Sequence Diagram

## Description:

The user can search for friends, and join/create Communities by name on the search bar for each section. After that "Success" page or "Fail" page will appear based on searching result. Otherwise, they can click on the "Home" button to return to the home page.

## Diagram

```mermaid
sequenceDiagram
    participant User
    participant Communities Page
    participant AppController

    User->>Communities Page: Click on "Home" button
    Communities Page->>AppController: Publish event SwitchPage("home")
    AppController->>User: Load and render HomePage on User's screen

    User->>Communities Page: Click on the "Searching for friend" search bar and type name
    User->>Communities Page: Click on the "Add Friend" button
    Communities Page->>AppController: Publish event SwitchPage("Success") if it match someone else UserID
    AppController->>User: Load and render "Success" page on User's screen
    Communities Page->>AppController: Publish event SwitchPage("Fail") if it doesn't match someone else UserID
    AppController->>User: Load and render "Fail" page on User's screen

    User->>Communities Page: Click on the "Community Name" search bar
    User->>Communities Page: Click on the "Create Community" button
    Communities Page->>AppController: Publish event SwitchPage("Success") and add new community to Database
    AppController->>User: Load and render "Success" page on User's screen
    Communities Page->>AppController: Publish event SwitchPage("Fail") if it doesn't match someone else UserID
    AppController->>User: Load and render "Fail" page on User's screen

    User->>Communities Page: Click on the "Searching for a community" search bar and type community name
    User->>Communities Page: Click on the "Add Community" button
    Communities Page->>AppController: Publish event SwitchPage("Success") if it match a community
    AppController->>User: Load and render "Success" page on User's screen
    Communities Page->>AppController: Publish event SwitchPage("Fail") if it doesn't match any community
    AppController->>User: Load and render "Fail" page on User's screen
```
