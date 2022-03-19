import './style.css';
import {
    BoxGeometry,
    BufferAttribute,
    BufferGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from 'three';
import gsap from "gsap";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

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

window.addEventListener("dblclick", () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if(canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.webkitExitFullscreen) {
            ocument.webkitExitFullscreen();
        }
    }
});

// Scene
const scene = new Scene();

// Object
// const geometry = new BoxGeometry(1, 1, 1, 5, 5, 5);
/*const positionsArray = new Float32Array([
    0,0,0,
    0,1,0,
    1,0,0
]);

const positionsAttribute = new BufferAttribute(positionsArray, 3);*/
const geometry = new BufferGeometry();
const count = 900;
const positionsArray = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4;
    //positionsArray[i] = Math.random();
}

const positionsAttribute = new BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionsAttribute);

const material = new MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
});
const mesh = new Mesh(geometry, material);
scene.add(mesh);

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