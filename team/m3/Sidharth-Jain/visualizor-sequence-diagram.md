## Description:

The sequence begins with the User clicking the VisualizorButton, which passes the selected song to the AudioProcessor. The AudioProcessor analyzes the song’s frequencies and vocals, sending the data to the THREEjsParticleSystem. The particle system dynamically updates its visuals (motion, color, and behavior) based on the audio analysis and renders the reactive visualizer, which is displayed back to the User.

## Diagram

```mermaid
sequenceDiagram
    participant User
    participant VisualizorButton
    participant AudioProcessor
    participant THREEjsParticleSystem

    User ->> VisualizorButton: Clicks "Visualizor" Button
    VisualizorButton ->> AudioProcessor: Pass song data
    AudioProcessor ->> AudioProcessor: Analyze vocals and frequencies
    AudioProcessor ->> THREEjsParticleSystem: Send audio analysis data
    THREEjsParticleSystem ->> THREEjsParticleSystem: Update particle motion and behavior
    THREEjsParticleSystem -->> VisualizorButton: Render updated particles
    VisualizorButton -->> User: Display reactive particle system
```
