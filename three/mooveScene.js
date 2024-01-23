import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );


    //Je gère la distance de point de vue
	const fov = 75;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 10;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.z = 4;
    camera.position.y = 0;


    const loader = new THREE.TextureLoader();


	const scene = new THREE.Scene();
    //Changer la couleur de fond du canvas
    loader.load('./img/waves.jpg', function(texture) {
        scene.background = texture;
    });

    //Je gère la lumière
	{
		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set(  2, 10, 1 );

		scene.add( light );

	}

    //Je gère la taille/profondeur de mes cubes
	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );
   

	function makeInstance(geometry, color, x) {
    

        // Crée un nouveau cube ici
        const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        cube.position.x = x;


        // Cette classe permet à la caméra de se déplacer autour d'un point cible (orbit) en réponse aux actions de l'utilisateur (par exemple, le mouvement de la souris).
        const controls = new OrbitControls(camera, canvas);

        // Définit la position de la cible autour de laquelle la caméra va orbiter. 
        // Ici, elle est réglée sur le centre de la scène (les coordonnées x, y, z sont toutes à 0).
        controls.target.set(0, 0, 0); 

        // Définit la distance minimale à laquelle la caméra peut s'approcher de la cible. 
        // Ici, la caméra ne peut pas se rapprocher de la cible à moins de 2 unités. PLus c'est bas plus on peut zoomer
        controls.minDistance = 2;

        // Définit la distance maximale à laquelle la caméra peut s'éloigner de la cible. 
        // Ici, la caméra ne peut pas s'éloigner de la cible de plus de 10 unités.
        controls.maxDistance = 10;

        // Active l'amortissement (ou "inertie"), ce qui rend les mouvements de la caméra plus fluides et naturels. 
        // C'est particulièrement perceptible lorsque vous arrêtez de déplacer la caméra : elle ralentira progressivement au lieu de s'arrêter brusquement.
        controls.enableDamping = true; 

        // Définit le facteur d'amortissement, c'est-à-dire la quantité de ralentissement appliquée aux mouvements de la caméra. 
        // Un facteur plus élevé augmente l'effet d'amortissement. Ici, le facteur est réglé sur 0.05.
        controls.dampingFactor = 0.05;




        controls.update();

        return cube;


    }
    

    //Je viens stocker plusieurs cubes qui prennent des parametre differents dans un tableau, d'abord la taille des cubes qui sont géré 
    //par la constante "geometry" puis la couleur de mes cubes et enfin la position sur mon canvas de mes cubes 0 étant le milieu
	const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
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


