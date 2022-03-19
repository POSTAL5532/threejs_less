import './style.css';
import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from 'three';
import gsap from "gsap";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from "dat.gui";

/**
 * Debug
 */
const gui = new GUI();

const parameters = {
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, {y: mesh.rotation.y + 10, duration: 1})
    }
};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new Scene();

// Object
const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({color: parameters.color});
const mesh = new Mesh(geometry, material);
scene.add(mesh);

/**
 * Debug
 */
gui.add(mesh.position, "y")
    .min(-3)
    .max(3)
    .step(0.01)
    .name("elevation");
gui.add(mesh, "visible").name("visible");
gui.add(material, "wireframe").name("wireframe");

gui.addColor(parameters, "color")
    .name("color")
    .onChange(color => material.color.set(color));
gui.add(parameters, "spin");

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();