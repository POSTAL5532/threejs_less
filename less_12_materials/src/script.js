import './style.css';
import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    Clock,
    MeshBasicMaterial,
    Mesh,
    SphereGeometry,
    PlaneGeometry,
    TorusGeometry,
    TextureLoader,
    Color,
    FrontSide,
    DoubleSide,
    MeshNormalMaterial,
    MeshMatcapMaterial,
    MeshDepthMaterial,
    AmbientLight,
    PointLight,
    MeshLambertMaterial,
    MeshPhongMaterial, MeshToonMaterial, NearestFilter, MeshStandardMaterial, BufferAttribute, CubeTextureLoader
} from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from "dat.gui";

/**
 * Debug
 */
const gui = new GUI();

/**
 * Textures
 */
const textureLoader = new TextureLoader();
const cubeTextureLoader = new CubeTextureLoader();

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg");
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
gradientTexture.minFilter = NearestFilter;
gradientTexture.magFilter = NearestFilter;
gradientTexture.generateMipmaps = false;

const environmentMapTexture = cubeTextureLoader.load([
    "/textures/environmentMaps/3/px.jpg",
    "/textures/environmentMaps/3/nx.jpg",
    "/textures/environmentMaps/3/py.jpg",
    "/textures/environmentMaps/3/ny.jpg",
    "/textures/environmentMaps/3/pz.jpg",
    "/textures/environmentMaps/3/nz.jpg",
]);

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new Scene();

/**
 * Objects
 */
// const material = new MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color.set("green")
// material.color = new Color("green");
// material.wireframe = true;
// material.opacity = 0.5;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
// material.side = DoubleSide;

// const material = new MeshNormalMaterial();
// material.flatShading = true;

/*const material = new MeshMatcapMaterial();
material.matcap = matcapTexture;*/

// const material = new MeshDepthMaterial();
// const material = new MeshDepthMaterial();
// const material = new MeshLambertMaterial();
/*const material = new MeshPhongMaterial();
material.shininess = 100;
material.specular = new Color(0xff0000);*/

/*const material = new MeshToonMaterial();
material.gradientMap = gradientTexture;*/

/*const material = new MeshStandardMaterial();
material.metalness = 0;
material.roughness = 1;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;
material.aoMapIntensity = 1;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.05;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture;
material.normalScale.set(0.5, 0.5);
material.transparent = true;
material.alphaMap = doorAlphaTexture;*/

const material = new MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = environmentMapTexture;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "aoMapIntensity").min(0).max(10).step(0.0001);
gui.add(material, "displacementScale").min(0).max(1).step(0.0001);
gui.add(material.normalScale, "x").min(0).max(10).step(0.0001).name("normal scale X");
gui.add(material.normalScale, "y").min(0).max(10).step(0.0001).name("normal scale Y");

const sphere = new Mesh(
    new SphereGeometry(0.5, 64, 64),
    material
);
sphere.position.x = -1.5;
sphere.geometry.setAttribute(
    "uv2",
    new BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

const plane = new Mesh(
    new PlaneGeometry(1, 1, 100, 100),
    material
);
plane.geometry.setAttribute(
    "uv2",
    new BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new Mesh(
    new TorusGeometry(0.3, 0.2, 64, 128),
    material
);
torus.position.x = 1.5;
torus.geometry.setAttribute(
    "uv2",
    new BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

scene.add(sphere, plane, torus);

/**
 * Lights
 */
const ambientLight = new AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

scene.add(pointLight);

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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
    const elapsedTime = clock.getElapsedTime() * 0.15;

    sphere.rotation.y = elapsedTime;
    plane.rotation.y = elapsedTime;
    torus.rotation.y = elapsedTime;

    sphere.rotation.x = elapsedTime;
    plane.rotation.x = elapsedTime;
    torus.rotation.x = elapsedTime;

    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();