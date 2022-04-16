import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {GUI} from "dat.gui";
import {
    AmbientLight, BasicShadowMap, BufferGeometry, CameraHelper, Clock,
    DirectionalLight,
    Mesh, MeshBasicMaterial,
    MeshStandardMaterial, PCFSoftShadowMap,
    PerspectiveCamera, PlaneBufferGeometry,
    PlaneGeometry, PointLight, PointLightHelper,
    Scene,
    SphereGeometry, SpotLight, SpotLightHelper, TextureLoader, WebGLRenderer
} from "three";
import {render} from "react-dom";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

const textureLoader = new TextureLoader();
const backedShadow = textureLoader.load("/textures/bakedShadow.jpg");
const simpleShadow = textureLoader.load("/textures/simpleShadow.jpg");

// Scene
const scene = new Scene();

/**
 * Lights
 */
// Ambient light
const ambientLight = new AmbientLight(0xffffff, 0.3);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const directionalLight = new DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(2, 2, - 1);
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001);
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001);
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001);
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001);

directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
// directionalLight.shadow.radius = 15;

scene.add(directionalLight);

const directionalCameraHelper = new CameraHelper(directionalLight.shadow.camera);
scene.add(directionalCameraHelper);
directionalCameraHelper.visible = false;

const spotLight = new SpotLight(0xffffff, 0.3, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.shadow.mapSize.set(1024, 1024);
spotLight.shadow.camera.fov = 30;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 6;
spotLight.position.set(0 , 2, 2);
scene.add(spotLight);
scene.add(spotLight.target);

const spotLightCameraHelper = new CameraHelper(spotLight.shadow.camera);
spotLightCameraHelper.visible = false;
scene.add(spotLightCameraHelper);

const pointLight = new PointLight(0xffffff, 0.3);
pointLight.castShadow = true;
pointLight.shadow.mapSize.set(1024, 1024);
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5;
pointLight.shadow.mapSize.set(1024, 1024);
pointLight.position.set( -1, 1, 0);
scene.add(pointLight);

const pointLightCameraHelper = new CameraHelper(pointLight.shadow.camera);
pointLightCameraHelper.visible = false;
scene.add(pointLightCameraHelper);

/**
 * Materials
 */
const material = new MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, 'metalness').min(0).max(1).step(0.001);
gui.add(material, 'roughness').min(0).max(1).step(0.001);

/**
 * Objects
 */
const sphere = new Mesh(new SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = true;
sphere.receiveShadow = false;

const plane = new Mesh(new PlaneGeometry(5, 5), material);
plane.rotation.x = - Math.PI * 0.5;
plane.position.y = - 0.5;
plane.receiveShadow = true;
plane.castShadow = false;

scene.add(sphere, plane);

const sphereShadow = new Mesh(
    new PlaneBufferGeometry(1.5, 1.5),
    new MeshBasicMaterial({color: "black", transparent: true, alphaMap: simpleShadow})
);
sphereShadow.rotation.x = -Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.01;
scene.add(sphereShadow)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas as any);
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = PCFSoftShadowMap;

/**
 * Animate
 */
const clock = new Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    sphere.position.x = Math.cos(elapsedTime) * 1.5;
    sphere.position.z = Math.sin(elapsedTime) * 1.5;
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));
    console.log(sphere.position.y)

    sphereShadow.position.x = sphere.position.x;
    sphereShadow.position.z = sphere.position.z;
    sphereShadow.material.opacity = 1.1-sphere.position.y

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();