import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GUI} from "dat.gui";
import {
    AmbientLight, BoxBufferGeometry, Clock, ConeBufferGeometry,
    DirectionalLight, Float32BufferAttribute, Fog, Group,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera, PlaneBufferGeometry,
    PlaneGeometry, PointLight, RepeatWrapping,
    Scene, SphereBufferGeometry, TextureLoader, WebGLRenderer
} from "three";

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new Scene();

//Fog
const fog = new Fog("#262837", 4, 15);
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new TextureLoader();

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg");
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load("/textures/bricks/ambientOcclusion.jpg");
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksRoughnessTexture = textureLoader.load("/textures/bricks/roughness.jpg");

const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load("/textures/grass/ambientOcclusion.jpg");
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load("/textures/grass/roughness.jpg");

grassColorTexture.repeat.set(8,8);
grassColorTexture.wrapS = RepeatWrapping;
grassColorTexture.wrapT = RepeatWrapping;
grassAmbientOcclusionTexture.repeat.set(8,8);
grassAmbientOcclusionTexture.wrapS = RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = RepeatWrapping;
grassNormalTexture.repeat.set(8,8);
grassNormalTexture.wrapS = RepeatWrapping;
grassNormalTexture.wrapT = RepeatWrapping;
grassRoughnessTexture.repeat.set(8,8);
grassRoughnessTexture.wrapS = RepeatWrapping;
grassRoughnessTexture.wrapT = RepeatWrapping;

/**
 * House
 */
//Group
const house = new Group();
scene.add(house);

//Walls
const walls = new Mesh(
    new BoxBufferGeometry(4, 2.5, 4),
    new MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
);
walls.geometry.setAttribute("uv2", new Float32BufferAttribute(walls.geometry.attributes.uv.array, 2));
walls.position.y = walls.geometry.parameters.height / 2;
walls.castShadow = true;
walls.receiveShadow = true;
house.add(walls);

//Roof
const roof = new Mesh(
    new ConeBufferGeometry(3.5, 1, 4),
    new MeshStandardMaterial({color: "#b35f45"})
);
roof.position.y = walls.geometry.parameters.height + roof.geometry.parameters.height / 2;
roof.rotation.y = Math.PI / 4;
roof.castShadow = true;
roof.receiveShadow = true;
house.add(roof);

// Floor
const floor = new Mesh(
    new PlaneGeometry(20, 20),
    new MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
);
floor.geometry.setAttribute("uv2", new Float32BufferAttribute(floor.geometry.attributes.uv.array, 2));
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
floor.castShadow = true;
floor.receiveShadow = true;
scene.add(floor);

// Door
const door = new Mesh(
    new PlaneBufferGeometry(2, 2, 100, 100),
    new MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
);
door.geometry.setAttribute("uv2", new Float32BufferAttribute(door.geometry.attributes.uv.array, 2));
door.position.z = walls.geometry.parameters.depth / 2 + 0.01;
door.position.y = door.geometry.parameters.height / 2;
door.castShadow = true;
door.receiveShadow = true;
house.add(door);

// Bushes
const bushGeometry = new SphereBufferGeometry(1, 16, 16);
const bushMaterial = new MeshStandardMaterial({color: "#89c854"});

const bush1 = new Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.castShadow = true;
bush1.receiveShadow = true;

const bush2 = new Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.castShadow = true;
bush2.receiveShadow = true;

const bush3 = new Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.15, 0.15, 0.15);
bush3.position.set(-1, 0.05, 2.6);
bush3.castShadow = true;
bush3.receiveShadow = true;

const bush4 = new Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.4, 0.4, 0.4);
bush4.position.set(-0.8, 0.1, 2.2);
bush4.castShadow = true;
bush4.receiveShadow = true;

house.add(bush1, bush2, bush3, bush4);

//Graves
const graves = new Group();
scene.add(graves);

const graveGeometry = new BoxBufferGeometry(0.6, 0.8, 0.2);
const graveMaterial = new MeshStandardMaterial({color: "#b2b6b1"});

for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const grave = new Mesh(graveGeometry, graveMaterial);
    grave.position.set(x, graveGeometry.parameters.height / 3, z);
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.castShadow = true;
    grave.receiveShadow = true;
    graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new AmbientLight('#b9d5ff', 0.12);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new DirectionalLight('#b9d5ff', 0.12);
moonLight.position.set(4, 5, -2);
moonLight.castShadow = true;
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001);
scene.add(moonLight);

//Door light
const doorLight = new PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);
doorLight.castShadow = true;
house.add(doorLight);

/**
 * Ghosts
 */
const ghost1 = new PointLight("#ff00ff", 2, 4);
ghost1.castShadow = true;
const ghost2 = new PointLight("#00ffff", 2, 4);
ghost2.castShadow = true;
const ghost3 = new PointLight("#ff0000", 2, 4);
ghost3.castShadow = true;
scene.add(ghost1, ghost2, ghost3);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas as any);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");
renderer.shadowMap.enabled = true;

/**
 * Animate
 */
const clock = new Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update ghosts
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(elapsedTime * 3);

    const ghost2Angle = -elapsedTime * 0.32;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    const ghost3Angle = -elapsedTime * 0.5;
    ghost3.position.x = Math.cos(ghost3Angle) *(7 + Math.sin(elapsedTime * 0.32));
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
    ghost3.position.y = Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2);

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick();