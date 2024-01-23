import * as THREE from 'three';

function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

    //Je gère la distance de point de vue
	const fov = 75;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.z = 3;

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
        //Permet de load une image en texture
        const loader = new THREE.TextureLoader();
    

        const cubeMaterials = [
            new THREE.MeshBasicMaterial({ map: loader.load('./img/laura.jpg') }), //right side
            new THREE.MeshBasicMaterial({ map: loader.load('./img/seb.jpg')}), //left side
            new THREE.MeshBasicMaterial({ map: loader.load('./img/jonathan.jpg')}), //top side
            new THREE.MeshBasicMaterial({ map: loader.load('./img/maxime.jpg')}), //bottom side
            new THREE.MeshBasicMaterial({ map: loader.load('./img/vincent.png')}), //front side
            new THREE.MeshBasicMaterial({ map: loader.load('./img/jonathan.jpg')}), //back side
        ];

        // Crée un nouveau cube ici
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        cube.position.x = x;
    
        // // Charge la texture
        // loader.load(
        //     './img/laura.jpg',
        //     function (texture) {
        //         // Applique la texture au matériau du mesh une fois qu'elle est chargée
        //         cube.material.map = texture;
        //         cube.material.needsUpdate = true;
        //     },
            
        // );
    
        return cube;
    }
    

    //Je viens stocker plusieurs cubes qui prennent des parametre differents dans un tableau, d'abord la taille des cubes qui sont géré 
    //par la constante "geometry" puis la couleur de mes cubes et enfin la position sur mon canvas de mes cubes 0 étant le milieu
	const cubes = [
		makeInstance( geometry, 0x44aa88, 1 ),
		makeInstance( geometry, 0xfffff, -1 ),
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
	function render(time) {
        time *= 0.001; // convertit le temps en secondes
    
        // Redimensionne le rendu à la taille de l'affichage si nécessaire
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
    
        // Rotation des cubes
        const speed = 4;
        const rot = time * speed;
    
        // Cube qui tourne
        cubes.forEach(cube => {
    
            // Ajuste la position du cube pour le faire tourner
            cube.position.x = Math.sin(rot);
            // cube.position.y = Math.sin(rot) * radius;

    
            // Vous pouvez également ajouter une rotation sur lui-même si désiré
            // cube.rotation.x = rot;
            // cube.rotation.y = rot;
        });

        
        const rotatingCube = cubes[1];
        rotatingCube.rotation.y = rot ;
        rotatingCube.position.x = Math.sin(rot/9);

    

        
    
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

	requestAnimationFrame( render );

    

}

main();


