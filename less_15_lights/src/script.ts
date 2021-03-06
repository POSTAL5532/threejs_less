import './style.css'
import {
    AmbientLight,
    BoxGeometry, Clock, Color, DirectionalLight, HemisphereLight,
    Mesh,
    MeshStandardMaterial, PerspectiveCamera, PlaneGeometry,
    PointLight, RectAreaLight,
    Scene,
    SphereGeometry,
    TorusGeometry, WebGLRenderer
} from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {GUI} from "dat.gui";

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLElement;

// Scene
const scene = new Scene();

/**
 * Lights
 */
const ambientLight = new AmbientLight(0xffffff, 0.5);
// ambientLight.color = new Color(0xffffff);
// ambientLight.intensity = 0.5;
scene.add(ambientLight);
// gui.add(ambientLight, "intensity").min(0).max(1).step(0.01);

const directionalLight = new DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
directionalLight;
scene.add(directionalLight);

const hemisphereLight = new HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);

const pointLight = new PointLight(0xff9000, 0.5, 5);
scene.add(pointLight);

const rectAreaLight = new RectAreaLight( 0x4e00ff, 2, 1, 1);
scene.add(rectAreaLight);
gui.add(rectAreaLight, "intensity").min(0).max(1).step(0.01);
gui.add(rectAreaLight.position, "x").min(-3).max(3).step(0.01);
gui.add(rectAreaLight.position, "y").min(-3).max(3).step(0.01);
gui.add(rectAreaLight.position, "z").min(-3).max(3).step(0.01);

/**
 * Objects
 */
// Material
const material = new MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new Mesh(
    new SphereGeometry(0.5, 32, 32),
    material
);
sphere.position.x = - 1.5;

const cube = new Mesh(
    new BoxGeometry(0.75, 0.75, 0.75),
    material
);

const torus = new Mesh(
    new TorusGeometry(0.3, 0.2, 32, 64),
    material
);
torus.position.x = 1.5;

const plane = new Mesh(
    new PlaneGeometry(5, 5),
    material
);
plane.rotation.x = - Math.PI * 0.5;
plane.position.y = - 0.65;

scene.add(sphere, cube, torus, plane);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

/**
 * Camera
 */
// Base camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new Clock();

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick();