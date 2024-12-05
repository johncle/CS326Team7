## Description:

The Search Page allows users to search for songs and playlists using a search bar. Before a search is conducted, the page displays default playlists. Once the user submits a query, the search page communicates with the EventHub and AppController to fetch mock data. The AppController responds with the search results, which are dynamically rendered on the page.

## Diagram

```mermaid
sequenceDiagram
    participant User
    participant SearchPage
    participant EventHub
    participant AppController

    User->>+SearchPage: Render Search Page
    SearchPage->>SearchPage: Load Default Playlists
    SearchPage->>User: Display Default Playlists

    User->>SearchPage: Enter Search Query and Click Search
    SearchPage->>+EventHub: Publish Search Query Event
    EventHub->>+AppController: Forward Search Query Event
    AppController-->>SearchPage: Send Search Results (Mock Data)
    SearchPage-->>User: Update UI with Search Results
