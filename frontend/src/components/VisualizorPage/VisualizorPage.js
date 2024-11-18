import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import Stats from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/libs/stats.module.js";
import { GUI } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/libs/lil-gui.module.min.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

export class VisualizorPage extends BaseComponent {
  #container = null; // Private variable to store the container element

  constructor() {
    super();
    this.loadCSS("VisualizorPage");
  }

  // Method to render the component and return the container
  render() {
    if (this.#container) {
      return this.#container;
    }

    this.#createContainer();
    this.#setupContainerContent();

    // Ensure the container is appended to the DOM before initializing
    requestAnimationFrame(() => {
      this.#initializeParticleSystem();
    });

    return this.#container;
  }

  // Creates the container element for the component
  #createContainer() {
    this.#container = document.createElement("div");
    this.#container.classList.add("visualizor-page");
  }

  // Sets up the basic HTML structure of the component
  #setupContainerContent() {
    this.#container.innerHTML = `
      <h2>Visualizor</h2>
      <div id="visualizorCanvasContainer" class='canvas-container'></div>
    `;
  }

  // Initializes the Three.js particle system
  #initializeParticleSystem() {
    const container = document.querySelector("#visualizorCanvasContainer");

    // Check if the container exists
    if (!container) {
      console.error("visualizorCanvasContainer not found in the DOM");
      return;
    }

    let group;
    let stats;
    const particlesData = [];
    let camera, scene, renderer;
    let positions, colors;
    let particles;
    let pointCloud;
    let particlePositions;
    let linesMesh;
    const maxParticleCount = 1000;
    let particleCount = 500;
    const r = 800;
    const rHalf = r / 2;

    const effectController = {
      showDots: true,
      showLines: true,
      minDistance: 150,
      limitConnections: false,
      maxConnections: 20,
      particleCount: 500,
    };

    // Initialize Three.js elements
    function init() {
      // Camera setup
      camera = new THREE.PerspectiveCamera(
        60,
        container.offsetWidth / container.offsetHeight,
        1,
        4000,
      );
      camera.position.z = 800;

      // Scene setup
      scene = new THREE.Scene();

      group = new THREE.Group();
      scene.add(group);

      // Particles setup
      particles = new THREE.BufferGeometry();
      particlePositions = new Float32Array(maxParticleCount * 3);
      positions = new Float32Array(maxParticleCount * maxParticleCount * 3);
      colors = new Float32Array(maxParticleCount * maxParticleCount * 3);

      const pMaterial = new THREE.PointsMaterial({
        color: 0x00ff88,
        size: 3,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: false,
      });

      for (let i = 0; i < maxParticleCount; i++) {
        const radius = Math.sqrt(rHalf * rHalf * Math.random());
        const direction = new THREE.Vector3()
          .randomDirection()
          .setLength(radius);

        particlePositions[i * 3] = direction.x;
        particlePositions[i * 3 + 1] = direction.y;
        particlePositions[i * 3 + 2] = direction.z;

        particlesData.push({
          velocity: new THREE.Vector3().randomDirection(),
          numConnections: 0,
        });
      }

      particles.setAttribute(
        "position",
        new THREE.BufferAttribute(particlePositions, 3).setUsage(
          THREE.DynamicDrawUsage,
        ),
      );
      pointCloud = new THREE.Points(particles, pMaterial);
      group.add(pointCloud);

      // Renderer setup
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      //renderer.setSize(container.offsetWidth, container.offsetHeight);
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // Orbit Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 800;
      controls.maxDistance = 3000;

      // Stats
      stats = new Stats();
      container.appendChild(stats.dom);

      // Animation loop
      function animate() {
        stats.update();
        group.rotation.y += 0.001;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }

      animate();

      // Resize handler
      /*
      window.addEventListener("resize", () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
      });
      */
      window.addEventListener("resize", () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      });
    }

    init();
  }
}
