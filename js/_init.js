/**
 * User: im007boy
 * Date: 12-9-9
 * Desc:
 */

var CONFIG = {
    WIDTH: 600,
    HEIGHT: 600
};
function log(){
    if (console)
        console.log.apply(console, arguments);
}
function World(context){
    this.context = this || context;
    var that = this.context;
    that.scene = new THREE.Scene;
    that.camera = new THREE.PerspectiveCamera(120, CONFIG.WIDTH/CONFIG.HEIGHT,
        0.01, 1000);
    that.scene.add(that.camera);

    that.render = new THREE.WebGLRenderer({
            maxLights: 6,
            antialias: true,
            sortObjects: false
        });
    that.render.shadowMapEnabled = false;
    //去锯齿
    that.render.shadowMapSoft = false;
    that.render.setSize(CONFIG.WIDTH, CONFIG.HEIGHT);

    var patent = document.getElementById('game3d') || document.body;

    patent.appendChild(render.domElement);

    animate(function (){
        that.render.render( that.scene, that.camera );
    });
}
function setupWebGL(){
    scene = new THREE.Scene();
    ambient = new THREE.AmbientLight( 0xFFFFFF );
    scene.add(ambient);

    camera = new THREE.PerspectiveCamera(120, CONFIG.WIDTH/CONFIG.HEIGHT,
        0.01, 100000);
    camera.position.z = 50;
    scene.add(camera);

    //render
    render = new THREE.WebGLRenderer({
        maxLights: 6,
        antialias: true,
        sortObjects: false
    });
    render.shadowMapEnabled = false;
    //去锯齿
    render.shadowMapSoft = false;
    render.setSize(CONFIG.WIDTH, CONFIG.HEIGHT);
    var patent = document.getElementById('game3d') || document.body;

    patent.appendChild(render.domElement);

    (function(scene){
        //var geometry = new THREE.SphereGeometry(251, 10, 42 );
        var geometry =  new THREE.CubeGeometry( 10, 10, 10 );
        var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        var mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
        animate(function (){
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.02;
        });

    })(scene);

    animate(function (){
        render.render( scene, camera );
    });


    mouseX = 0;
    mouseXOnMouseDown = 0;

    targetRotation = 0;
    targetRotationOnMouseDown = 0;


    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

}
function enableCameraControl(){
    if ( typeof controls != 'undefined' ){
       return true;
    }
    controls = new THREE.OrbitControls( camera );
    //controls.addEventListener( 'change', render );
    animate(function(){
        controls.update();
    });
    return true;
}
function animate(func, timeout) {
    var next = window.requestAnimationFrame;
    if ( timeout ){
        next = function(fn){
            setTimeout(fn, timeout);
        };
    }
    next(function(){
        animate(func, timeout);
    });
    func();
}
function ready(fu){
    _onwebglready = fu;
}
function DomLoaded(){
    if ( this._iswebglready != true){
        setupWebGL();
    }
    if ( typeof _onwebglready == 'function' )
        _onwebglready();
}
window.onload = DomLoaded;
