import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 10;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 4;

  const scene = new THREE.Scene();

  const loader = new THREE.TextureLoader();
  loader.load("/assets/minecraft-world.jpg", function (texture) {
    scene.background = texture;
  });

  // Lumière
  let ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  // Chargement des textures pour chaque face du cube
  const textureLoader = new THREE.TextureLoader();
  const textures = [
    textureLoader.load("assets/minecraft.png"),
    textureLoader.load("assets/minecraft.png"),
    textureLoader.load("assets/grass.jpg"),
    textureLoader.load("assets/dirt.png"),
    textureLoader.load("assets/minecraft.png"),
    textureLoader.load("assets/minecraft.png"),
  ];

  // Création des matériaux pour chaque face
  const materials = textures.map(
    (texture) => new THREE.MeshStandardMaterial({ map: texture })
  );

  // Définition des dimensions du cube
  let boxWidth = 1;
  let boxHeight = 1;
  let boxDepth = 1;
  let geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // Création du cube avec des matériaux différents pour chaque face
  const cube = new THREE.Mesh(geometry, materials);
  scene.add(cube);

  // Contrôles d'orbite
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Mise à jour de la géométrie des cubes
  function updateCubeGeometry(newWidth, newHeight, newDepth) {
    geometry.dispose();
    geometry = new THREE.BoxGeometry(newWidth, newHeight, newDepth);
    cube.geometry = geometry;
  }

  // Mise à jour de la géométrie des cubes
  function updateCubeGeometry(newWidth, newHeight, newDepth) {
    geometry.dispose(); // Libérer l'ancienne géométrie de la mémoire
    geometry = new THREE.BoxGeometry(newWidth, newHeight, newDepth);
    cube.geometry = geometry; // Mettre à jour la géométrie du cube
  }

  // Écouteur d'événements pour la largeur des cubes
  const wChange = document.querySelector("#wChange");
  wChange.addEventListener("input", function () {
    const newWidth = parseFloat(wChange.value);
    if (!isNaN(newWidth) && newWidth > 0) {
      boxWidth = newWidth;
      updateCubeGeometry(boxWidth, boxHeight, boxDepth);
    }
  });

  // Écouteur d'événements pour la hauteur des cubes
  const hChange = document.querySelector("#hChange");
  hChange.addEventListener("input", function () {
    const newHeight = parseFloat(hChange.value);
    if (!isNaN(newHeight) && newHeight > 0) {
      boxHeight = newHeight;
      updateCubeGeometry(boxWidth, boxHeight, boxDepth);
    }
  });

  // Écouteur d'événements pour la profondeur des cubes
  const dChange = document.querySelector("#dChange");
  dChange.addEventListener("input", function () {
    const newDepth = parseFloat(dChange.value); // Utilisez dChange.value ici
    if (!isNaN(newDepth) && newDepth > 0) {
      boxDepth = newDepth; // Mettez à jour boxDepth au lieu de boxHeight
      updateCubeGeometry(boxWidth, boxHeight, boxDepth);
    }
  });

  // Fonctions de rendu
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
