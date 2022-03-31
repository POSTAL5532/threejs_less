import './style.css';
import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    Clock,
    AxesHelper,
    AmbientLight,
    DirectionalLight,
} from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from "dat.gui";
import { Interaction } from './three-interaction';
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import {addGroundToScene} from "./Ground";
import {addHouse1ToScene, addHouse2ToScene} from "./House1";


/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLElement;

// Scene
const scene = new Scene();
scene.add(new AxesHelper(20));

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 7;
camera.position.y = 4;
camera.position.z = 7;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Lights
 */
const lightColors = {
    ambientLightColor: 0xffffff,
    directionalLightLightColor: 0xffffff,
}

const ambientLight = new AmbientLight(lightColors.ambientLightColor, 1);
const directionalLight = new DirectionalLight(lightColors.directionalLightLightColor, 1);
scene.add(ambientLight);
scene.add(directionalLight);

const interaction = new Interaction(renderer, scene, camera);

addGroundToScene(scene, interaction);
addHouse1ToScene(scene, interaction);
addHouse2ToScene(scene, interaction);

/**
 * Animate
 */
const clock = new Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();