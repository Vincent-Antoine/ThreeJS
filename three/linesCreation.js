import * as THREE from 'three';


function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.setClearColor(0x000000, 0); // Couleur noire, mais totalement transparente

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });


    // Lumière directionnelle
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Lumière d'ambiance
    const ambientLight = new THREE.AmbientLight(0x404040); // lumière douce
    scene.add(ambientLight);


    const points = [];
    points.push(new THREE.Vector3(20, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));
    points.push(new THREE.Vector3(50, 0, 0));
    points.push(new THREE.Vector3(0, 50, 0));



    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);


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
        scene.add(line);
        renderer.render(scene, camera)

    }

    requestAnimationFrame(render);

    render();
}

main();
