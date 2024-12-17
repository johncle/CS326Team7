import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import * as THREE from "three";
import { GUI } from "dat.gui";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

import SongSelector from "./SongSelector.js";

export class VisualizorPage extends BaseComponent {
  #container;

  constructor() {
    super();
    this.loadCSS("VisualizorPage");
    this.loadSong = this.#loadSong.bind(this);
    this.audioLoader = new THREE.AudioLoader();
    this.listener = new THREE.AudioListener();
    this.audio = null;
  }

  render() {
    if (this.#container) return this.#container;

    // Create the container element
    this.#container = document.createElement("div");
    this.#container.style.width = "100%";
    this.#container.style.height = "100%";
    //this.#container.style.position = "relative"; // Ensure it takes up the full space of its parent
    //his.#container.style.top = "0";
    //this.#container.style.left = "0";

    // Append container to the DOM immediately
    document.body.appendChild(this.#container);

    // Ensure dimensions are valid with a slight delay
    setTimeout(() => this.#checkAndInitialize(), 100);

    return this.#container;
  }

  #checkAndInitialize() {
    const checkDimensions = () => {
      if (this.#container.offsetWidth > 0 && this.#container.offsetHeight > 0) {
        this.#initializeVisualizer();
      } else {
        console.warn("Container has zero size. Waiting...");
        requestAnimationFrame(checkDimensions);
      }
    };
    requestAnimationFrame(checkDimensions);
  }

  #loadSong(fileUrl) {
    this.audioLoader.load(
      fileUrl,
      (buffer) => {
        if (this.audio) this.audio.stop();

        this.audio = new THREE.Audio(this.listener);
        this.audio.setBuffer(buffer);
        this.audio.setLoop(false);
        this.audio.play();
      },
      undefined,
      (error) => {
        console.error("Error loading song:", error);
      },
    );
  }

  async #initializeVisualizer() {
    console.log("Initializing visualizer...");

    /*
    const songSelector = new SongSelector(this.loadSong);
    const selectorDiv = await songSelector.render();

    selectorDiv.style.position = "absolute";
    selectorDiv.style.top = "10px";
    selectorDiv.style.left = "10px";
    selectorDiv.style.zIndex = "100"; // Ensure it stays on top of the canvas
    this.#container.appendChild(selectorDiv);

    */

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(this.#container.offsetWidth, this.#container.offsetHeight);
    renderer.setClearColor(0x000000, 1); // Black background
    this.#container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      this.#container.offsetWidth / this.#container.offsetHeight,
      0.1,
      1000,
    );
    camera.attach(this.listener);

    const params = {
      red: 1.0,
      green: 1.0,
      blue: 1.0,
      threshold: 0.5,
      strength: 0.5,
      radius: 0.8,
    };

    const renderScene = new RenderPass(scene, camera);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(
        this.#container.offsetWidth,
        this.#container.offsetHeight,
      ),
    );
    bloomPass.threshold = params.threshold;
    bloomPass.strength = params.strength;
    bloomPass.radius = params.radius;

    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    const outputPass = new OutputPass();
    bloomComposer.addPass(outputPass);

    camera.position.set(0, -2, 14);
    camera.lookAt(0, 0, 0);

    const uniforms = {
      u_time: { type: "f", value: 0.0 },
      u_frequency: { type: "f", value: 0.0 },
      u_red: { type: "f", value: 1.0 },
      u_green: { type: "f", value: 1.0 },
      u_blue: { type: "f", value: 1.0 },
    };

    const vertexShader = `
      uniform float u_time;
      uniform float u_frequency;

      void main() {
        float noise = sin(u_time * 2.0 + position.x * 10.0) * u_frequency * 0.5; // Mix time and frequency
        vec3 newPosition = position + normal * noise;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_red;
      uniform float u_green;
      uniform float u_blue;

      void main() {
        gl_FragColor = vec4(u_red, u_green, u_blue, 1.0);
      }
    `;

    const geo = new THREE.IcosahedronGeometry(4, 30);
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    mesh.material.wireframe = true;

    const listener = new THREE.AudioListener();
    camera.add(listener);

    const sound = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("./src/assets/Beats.mp3", function (buffer) {
      sound.setBuffer(buffer);
      window.addEventListener("click", function () {
        sound.play();
      });
    });

    const analyser = new THREE.AudioAnalyser(sound, 32);

    const gui = new GUI();
    gui.domElement.style.position = "absolute";
    gui.domElement.style.top = "10px";
    gui.domElement.style.right = "10px";
    this.#container.appendChild(gui.domElement);

    const colorsFolder = gui.addFolder("Colors");
    colorsFolder.add(params, "red", 0, 1).onChange((value) => {
      uniforms.u_red.value = Number(value);
    });
    colorsFolder.add(params, "green", 0, 1).onChange((value) => {
      uniforms.u_green.value = Number(value);
    });
    colorsFolder.add(params, "blue", 0, 1).onChange((value) => {
      uniforms.u_blue.value = Number(value);
    });

    const bloomFolder = gui.addFolder("Bloom");
    bloomFolder.add(params, "threshold", 0, 1).onChange((value) => {
      bloomPass.threshold = Number(value);
    });
    bloomFolder.add(params, "strength", 0, 3).onChange((value) => {
      bloomPass.strength = Number(value);
    });
    bloomFolder.add(params, "radius", 0, 1).onChange((value) => {
      bloomPass.radius = Number(value);
    });

    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener("mousemove", (e) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) / 100;
      mouseY = (e.clientY - windowHalfY) / 100;
    });

    const clock = new THREE.Clock();
    function animate() {
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.5;
      camera.lookAt(scene.position);
      uniforms.u_time.value = clock.getElapsedTime();
      const frequency = analyser.getAverageFrequency();
      uniforms.u_frequency.value = THREE.MathUtils.clamp(
        frequency / 256,
        0.0,
        1.0,
      );
      bloomComposer.render();
      requestAnimationFrame(animate);
    }
    animate();
  }
}
