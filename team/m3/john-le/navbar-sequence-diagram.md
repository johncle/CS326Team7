# Navbar Sequence Diagram

## Description:

The user can use the navigation bar on the left side of the screen to change between different views: Home, Tags, Communities, Profile, Login/Logout, potentially Search. The navbar is implemented in Navbar.js, but uses events (observer) to signal the app controller to switch views.

## Diagram

```mermaid
sequenceDiagram
    participant User
    participant Navbar
    participant AppController

    User->>Navbar: Click on Sonar icon
    Navbar->>AppController: Publish event SwitchPage("home")
    AppController->>User: Load and render HomePage on User's screen

    User->>Navbar: Click on "Home" navbar button
    Navbar->>AppController: Publish event SwitchPage("home")
    AppController->>User: Load and render HomePage on User's screen

    User->>Navbar: Click on "Search" navbar button
    Navbar->>AppController: Publish event SwitchPage("search")
    AppController->>User: Load and render SearchPage on User's screen

    User->>Navbar: Click on "Communities" navbar button
    Navbar->>AppController: Publish event SwitchPage("communities")
    AppController->>User: Load and render CommunitiesPage on User's screen

    User->>Navbar: Click on "Visualizer" navbar button
    Navbar->>AppController: Publish event SwitchPage("visualizer")
    AppController->>User: Load and render VisualizerPage on User's screen

    User->>Navbar: Click on "Profile" navbar button
    Navbar->>AppController: Publish event SwitchPage("profile")
    AppController->>User: Load and render ProfilePage on User's screen

    User->>Navbar: Click on "Logout" navbar button
    Navbar->>AppController: Publish event SwitchPage("logout")
    AppController->>User: Load and render LoginPage on User's screen
```
