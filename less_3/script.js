const canvas = document.querySelector("#rootCanvas");

// create scene
const scene = new THREE.Scene();

// red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// caamera
const camera = new THREE.PerspectiveCamera(75, 800 / 600);
camera.position.z = 3;
camera.position.x = 3;

scene.add(camera);

const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(800, 600);
renderer.render(scene, camera);