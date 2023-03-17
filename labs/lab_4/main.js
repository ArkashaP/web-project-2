import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { default as Stats } from "https://cdnjs.cloudflare.com/ajax/libs/stats.js/r17/Stats.min.js";

const clock = new THREE.Clock();
let scene = new THREE.Scene();

const stats = Stats();
document.body.appendChild(stats.dom);

let vertices = [0, 0, 0, 10, 0, 0, 10, 0, 10, 0, 0, 10];

let indices = [2, 1, 0, 0, 3, 2];

let cameraTarget = new THREE.Vector3(0, 0.4, 0);

let geometry = new THREE.BufferGeometry();

geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(new Float32Array(vertices), 3)
);
geometry.setIndex(indices);
geometry.computeVertexNormals();




const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(4000, 4000),
  new THREE.MeshPhongMaterial({ color: 0x808080, dithering: true })
);
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);


const spotLight = new THREE.SpotLight("#ffffff");
spotLight.position.set(0, 2, 5);
spotLight.castShadow = true;
spotLight.intensity = 2;
spotLight.shadow.camera.near = 0.1;
spotLight.shadow.camera.far = 25;
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;
spotLight.shadow.bias = -0.01;
spotLight.target.position.set(0, 0, 0);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLight);
scene.add(spotLight.target);
scene.add(spotLightHelper);



const spotLightL = new THREE.SpotLight("#ffffff");
spotLightL.position.set(-5, 1, 0);
spotLightL.castShadow = true;
spotLightL.intensity = 1
spotLightL.shadow.camera.near = 1;
spotLightL.shadow.camera.far = 25;
spotLightL.shadow.mapSize.width = 2048;
spotLightL.shadow.mapSize.height = 2048;
spotLightL.shadow.bias = -0.01;
spotLightL.target.position.set(0, 0, 0);

const spotLightLHelper = new THREE.SpotLightHelper(spotLightL);
scene.add(spotLightL);
scene.add(spotLightL.target);
scene.add(spotLightLHelper);


const spotLightR = new THREE.SpotLight("#ffffff");
spotLightR.position.set(5, 1, 0);
spotLightR.castShadow = true;
spotLightR.intensity = 0
spotLightR.shadow.camera.near = 1;
spotLightR.shadow.camera.far = 25;
spotLightR.shadow.mapSize.width = 2048;
spotLightR.shadow.mapSize.height = 2048;
spotLightR.shadow.bias = -0.01;
spotLightR.target.position.set(0, 0, 0);

const spotLightRHelper = new THREE.SpotLightHelper(spotLightR);
scene.add(spotLightR);
scene.add(spotLightR.target);
scene.add(spotLightRHelper);

// const spotLightR = new THREE.SpotLight("#ffffff");
// spotLightR.position.set(0, 1, 5);
// spotLightR.castShadow = true;
// spotLightR.intensity = 2;
// spotLightR.shadow.camera.near = 1;
// spotLightR.shadow.camera.far = 25;
// spotLightR.shadow.mapSize.width = 2048;
// spotLightR.shadow.mapSize.height = 2048;
// spotLightR.shadow.bias = -0.01;
// spotLightR.target.position.set(0, 0, 0);


const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 0.5;
scene.add(sphere);

let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 5);

// camera.position.z = 5;
// camera.position.y = 1;

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;


let mainTarget = new THREE.Vector3(5, 5, 5);

function animate() {
  requestAnimationFrame(animate);

  stats.update();
  //spotLightHelper.update();
  const elapsedTime = clock.getElapsedTime();
  // camera.position.x = Math.cos(elapsedTime * 0.6) * 2;
  // camera.position.y = Math.sin(elapsedTime * 0.6 *3.14) + 3.14/2;
  // camera.position.z = Math.sin(elapsedTime * 0.6) * 2;
  
  // Set pos of camera using lerp() to zero point
  camera.position.lerp(mainTarget, 0.05);

  camera.lookAt(cameraTarget);

  renderer.render(scene, camera);
}

animate();

// Every 10 seconds, move the camera
// setInterval(() => {
//   const elapsedTime = clock.getElapsedTime();
//   mainTarget.x = Math.cos(elapsedTime * 0.6) * 2;
//   mainTarget.y = Math.sin(elapsedTime * 0.6 *3.14) + 3.14/2;
//   mainTarget.z = Math.sin(elapsedTime * 0.6) * 2;
// }, 2000);

// Create an event listener for the window resize event
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let CamAngle=0;
let CamHeight=0;
// Функция передвижения камеры по щелчку мыши
function onPointerMove(event) {

  if(event.buttons!=1){
    return;
  };

  const deltaTime = clock.getDelta();
  
  const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
  // const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
  const movementZ = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

  CamAngle += movementX * deltaTime * 2;

  CamHeight = clamp(CamHeight + movementZ * deltaTime * 2, 0, 10);

  

  mainTarget.x = 4 * Math.cos(CamAngle);
  mainTarget.z = 4 * Math.sin(CamAngle);
  mainTarget.y = CamHeight + 0.5;
}

window.addEventListener("pointermove", onPointerMove);

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

