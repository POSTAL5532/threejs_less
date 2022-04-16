import './style.css';
import "core-js/stable";
import {render} from "react-dom";
import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    Clock,
    AxesHelper,
    DirectionalLight, DirectionalLightHelper, PCFSoftShadowMap, AmbientLight,
} from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from "dat.gui";
import {BigHouse} from "./buildings/BigHouse";
import {CityLabel} from "./buildings/CityLabel";
import {CylinderHouse} from "./buildings/CylinderHouse";
import {Ground} from "./Ground";

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
camera.position.set(3, 3, 5);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Lights
 */
const lightColors = {
    directionalLightColor_DAY: "#ffffff",
    directionalLightColor_NIGHT: "#6181a0"
}

const ambientLight = new AmbientLight(lightColors.directionalLightColor_DAY, 0.5);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(lightColors.directionalLightColor_DAY, 3);
directionalLight.position.set(-2.32, 2.83, -2.54);
scene.add(directionalLight);

const lightHelper = new DirectionalLightHelper(directionalLight, 1)
scene.add(lightHelper);

gui.add(directionalLight.position, "x").min(-10).max(10).step(0.01);
gui.add(directionalLight.position, "y").min(-10).max(10).step(0.01);
gui.add(directionalLight.position, "z").min(-10).max(10).step(0.01);

const cylinderHouse = new CylinderHouse();
scene.add(new Ground());
scene.add(new BigHouse());
scene.add(cylinderHouse);
scene.add(new CityLabel());

/**
 * Animate
 */
const clock = new Clock();

setTimeout(() => cylinderHouse.onNight(), 2000)

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();