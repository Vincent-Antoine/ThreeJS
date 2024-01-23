import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';




function main() {



    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1500
    );
    camera.position.set(-30, 50, 100);
    camera.lookAt(0, 0, 0)



    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);




    const controls = new OrbitControls(camera, renderer.domElement);

    let text = "Toto";
    let textMesh;

    const loader = new FontLoader();

    loader.load("/fonts/Roboto_Regular.json", function (font) {

        const tGeometry = new TextGeometry(text, {
            font: font,
            size: 40,
            height: 5,
        });


        textMesh = new THREE.Mesh(tGeometry, [
            new THREE.MeshPhongMaterial({ emissive: 0xd69edc }),
            new THREE.MeshPhongMaterial({ color: 0xffffff }),

        ]);

        scene.add(textMesh)
        textMesh.position.set(-85, 3, 0);


    });

    animate();

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerHeight, window.innerWidth)

    }
}
main();