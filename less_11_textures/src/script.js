import './style.css';
import {
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    Clock, TextureLoader, LoadingManager, BoxBufferGeometry, RepeatWrapping, NearestFilter
} from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

/**
 * Textures
 */
const loadingManager = new LoadingManager();
/*loadingManager.onStart = () => {
    console.log("On start");
};
loadingManager.onLoad = () => {
    console.log("On load");
};
loadingManager.onProgress = () => {
    console.log("On progress");
};
loadingManager.onError = () => {
    console.log("On error");
};*/

const textureLoader = new TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/minecraft.png");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const ambientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg");
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

/*colorTexture.repeat.x = 2;
colorTexture.repeat.y = 3;
colorTexture.wrapS = RepeatWrapping;
colorTexture.wrapT = RepeatWrapping;

colorTexture.offset.x = 0.5;
colorTexture.offset.y = 0.5;*/

/*colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;
colorTexture.rotation = Math.PI / 4;*/

colorTexture.minFilter = NearestFilter;
colorTexture.magFilter = NearestFilter;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new Scene();

// Object
const geometry = new BoxBufferGeometry(1, 1, 1);
const material = new MeshBasicMaterial({map: colorTexture});
const mesh = new Mesh(geometry, material);
scene.add(mesh);

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
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new Clock();

const tick = () => {
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();