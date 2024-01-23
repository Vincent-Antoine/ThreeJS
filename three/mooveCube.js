import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';


function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );


    //Je gère la distance de point de vue
	const fov = 75;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.z = 4;
    camera.position.y = 0;


	const scene = new THREE.Scene();

    //Je gère la lumière
	{

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( - 1, 2, 4 );
		scene.add( light );

	}

    

    //Je gère la taille/profondeur de mes cubes
	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );
   

	function makeInstance(geometry, color, x) {
    

        // Crée un nouveau cube ici
        const material = new THREE.MeshBasicMaterial( { color: 0xfffffff } );
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        cube.position.x = x;
    
        let objects = [cube];
        console.log(objects);
        const dControls =  new DragControls(objects, camera, renderer.domElement)

        dControls.enable = true;
        dControls.activate();

        // dControls.addEventListener("hoveron", function(event) {
        //     console.log(event.object);
        //     event.object.material.wireframe = true; // Active le wireframe
        // });
        
        // dControls.addEventListener("hoveroff", function(event) {
        //     event.object.material.wireframe = false; // Désactive le wireframe
        // });

        return cube;


    }
    

    //Je viens stocker plusieurs cubes qui prennent des parametre differents dans un tableau, d'abord la taille des cubes qui sont géré 
    //par la constante "geometry" puis la couleur de mes cubes et enfin la position sur mon canvas de mes cubes 0 étant le milieu
	const cubes = [
		makeInstance( geometry, 0x44aa88, 0 ),
	];

    //Création d'une fonction qui vérifie la taille des elements de mon canvas et qui la resize si celle ci n'est pas adapté a l'écran client
    //Cela permet d'améliorer la qualité de rendu des cubes, moins de pixelisation grâce au resize
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

    //Je gère le temps de rotation de mes cubes ainsi que leurs animation
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

    

}

main();


