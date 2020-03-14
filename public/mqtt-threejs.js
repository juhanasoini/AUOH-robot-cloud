/**/
let three_view = document.getElementById( 'three_view' );

let renderer = new THREE.WebGLRenderer();
let scene = new THREE.Scene();

let width = window.innerWidth;
let height = window.innerHeight;
let view_angle = 45;
let near = 0.1;
let far = 1000;

let camera = new THREE.PerspectiveCamera( view_angle, width / height, near, far );
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;
camera.lookAt(scene.position);

renderer.setSize( width, height );

//Testiboxi
three_view.appendChild( renderer.domElement );
{
	let geometry = new THREE.BoxGeometry( 1, 1, 1 );
	let material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
	let mesh = new THREE.Mesh( geometry, material );
	// scene.add( mesh );	
}

let light = new THREE.DirectionalLight( 0xAAAAAA, 4 );
light.position.x = 50;
light.position.y = 0;
light.position.z = 50;
scene.add( light );

scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
scene.background = new THREE.Color( 0xFFFFFF )

//Lattia
{
	let plane = new THREE.PlaneBufferGeometry( 40, 40 );
	let material = new THREE.MeshPhongMaterial({ color: 0xAAAAAA, specular: 0x101010 })
	let mesh = new THREE.Mesh( plane, material );
	mesh.position.z = -1;
	scene.add(mesh);
}

const stl_loader = new THREE.STLLoader();


const load_stl = ( url ) => {
	return new Promise( ( resolve ) => {
		stl_loader.load( url, resolve );
	});
}

let dark = new THREE.MeshLambertMaterial( { color: 0x111111} );
let yellow = new THREE.MeshLambertMaterial( { color: 0xFFFF00} );

let joints = [  ];

const load_geometries =  async () => {
	{
		let geometry = await load_stl( './FANUC_R2000iA165F-STL/BASE.stl' );
		let mesh = new THREE.Mesh( geometry, dark  );
		mesh.geometry.scale(0.001, 0.001, 0.001);
		scene.add( mesh );
		joints.push( mesh );
	}
	{
		let geometry = await load_stl( './FANUC_R2000iA165F-STL/J1-1.stl' );
		let geometry2 = await load_stl( './FANUC_R2000iA165F-STL/J1-2.stl' );
		geometry.merge( geometry2 );
		let mesh = new THREE.Mesh( geometry, yellow  );
		mesh.geometry.scale(0.001, 0.001, 0.001);
		scene.add( mesh );
		joints.push( mesh );
	}
	{
		let geometry = await load_stl( './FANUC_R2000iA165F-STL/J2.stl' );
		let mesh = new THREE.Mesh( geometry, yellow  );
		mesh.geometry.scale(0.001, 0.001, 0.001);
		scene.add( mesh );
		joints.push( mesh );
	}
	{
		let geometry = await load_stl( './FANUC_R2000iA165F-STL/J3.stl' );
		let mesh = new THREE.Mesh( geometry, yellow  );
		mesh.geometry.scale(0.001, 0.001, 0.001);
		scene.add( mesh );
		joints.push( mesh );
	}
	{
		let geometry = await load_stl( './FANUC_R2000iA165F-STL/J4.stl' );
		let mesh = new THREE.Mesh( geometry, yellow  );
		mesh.geometry.scale(0.001, 0.001, 0.001);
		scene.add( mesh );
		joints.push( mesh );
	}
	{
		let geometry = await load_stl( './FANUC_R2000iA165F-STL/J5.stl' );
		let mesh = new THREE.Mesh( geometry, yellow  );
		mesh.geometry.scale(0.001, 0.001, 0.001);
		scene.add( mesh );
		joints.push( mesh );
	}
};
load_geometries();

const orbit_controls = new THREE.OrbitControls( camera, renderer.domElement );
orbit_controls.target = new THREE.Vector3(0,0,0);

const animate = () => {
	requestAnimationFrame( animate );
	orbit_controls.update();
	renderer.render( scene, camera );
};

animate();

const resize = () => {
	let width = window.innerWidth;
	let height = window.innerHeight;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize( width, height );
};

window.onresize = resize;