import * as THREE from 'three';

function mainCircle() {

	const canvas = document.querySelector( '#d' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

    //Je gère la distance de point de vue
	const fov = 85;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.z = 2;

	const scene = new THREE.Scene();

    //Je gère la lumière
	{

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( - 1, 2, 4 );
		scene.add( light );

	}

    //Création des sphères
    //Je gère la taille entre 0 et 2
	const radius = 0.3;  
    //Je gère le lissage
    const detail = 5;  
    const geometry = new THREE.IcosahedronGeometry( radius, detail );

    //Création de la box
    const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometryCube = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );
   

	function makeInstance( geometry, color, x ) {

		const material = new THREE.MeshPhongMaterial( { color } );

		const circle = new THREE.Mesh( geometry, material );
		scene.add( circle );

		circle.position.x = x;

		return circle;

	}

    function makeInstance( geometryCube, color, x ) {

		const material = new THREE.MeshPhongMaterial( { color } );

		const cube = new THREE.Mesh( geometryCube, material );
		scene.add( cube );

		cube.position.x = x;

		return cube;

	}

    //Je viens stocker plusieurs cubes qui prennent des parametre differents dans un tableau, d'abord la taille des cubes qui sont géré 
    //par la constante "geometry" puis la couleur de mes cubes et enfin la position sur mon canvas de mes cubes 0 étant le milieu
	const circles = [
		makeInstance( geometry, 0x44aa88, -0.8 ),
        makeInstance( geometry, 0x44aa88, 1 ),
	];


	const cubes = [
		makeInstance( geometryCube, 0x44aa88, 0 ),
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
	function render( time ) {

		time *= 0.001; // convert time to seconds

        //Permet de faire en sorte que les elements ne soient pas mal dimensionné élargi etc quand on resize la fenetre tout cela ce fait grâce 
        //a la fonction resizeRendererToDisplaySize qui vérifie que mes elements sont bien dimensionné a la taille écran
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
          }

		circles.forEach( ( circle, ndx ) => {

			const speed = 1 + ndx * .1;
			const rot = time * speed;
			circle.rotation.x = rot;
			circle.rotation.y = rot;

		} );

        cubes.forEach( ( cube, ndx ) => {

			const speed = 1 + ndx * .1;
			const rot = time * speed;
			cube.rotation.y = rot;

		} );

		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

    

}

mainCircle();