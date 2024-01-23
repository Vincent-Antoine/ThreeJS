import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.setClearColor(0x000000, 0); // Couleur noire, mais totalement transparente


    const fov = 75;
    const aspect = canvas.clientWidth / canvas.clientHeight;  // Ajusté pour correspondre aux dimensions du canvas
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z =2.5;
    const scene = new THREE.Scene();


    
    // Lumière directionnelle
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Lumière d'ambiance
    const ambientLight = new THREE.AmbientLight(0x404040); // lumière douce
    scene.add(ambientLight);

    const loader = new OBJLoader();
    loader.load(
        'models/FinalBaseMesh.obj',
        function (obj) {
            obj.scale.set(0.1, 0.1, 0.1);  // Ajustez selon les besoins
            obj.position.set(0, -1, 0);  // Ajustez selon les besoins
            scene.add(obj);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened', error);
        }
    );

    const controls = new OrbitControls(camera, canvas);

        controls.target.set(0, 0, 0); 

        // Définit la distance minimale à laquelle la caméra peut s'approcher de la cible. 
        // Ici, la caméra ne peut pas se rapprocher de la cible à moins de 2 unités. PLus c'est bas plus on peut zoomer
        controls.minDistance = 0;

        // Définit la distance maximale à laquelle la caméra peut s'éloigner de la cible. 
        // Ici, la caméra ne peut pas s'éloigner de la cible de plus de 10 unités.
        controls.maxDistance = 10;

    function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }


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
    
        // Redimensionne le rendu à la taille de l'affichage si nécessaire
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        };

        renderer.render(scene, camera);

        requestAnimationFrame(render);
        
    }

	requestAnimationFrame( render );

    render();
}

main();
