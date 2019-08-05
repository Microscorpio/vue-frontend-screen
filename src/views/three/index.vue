<template>
	<div id="testThree"></div>
</template>
<script>
import VueTypes from 'vue-types'
import * as Three from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js';
export default {
  props: {
    color: VueTypes.string.def('#ffffff'),
    mouseX: VueTypes.number.def(0),
    mouseY: VueTypes.number.def(-550),
    spearation: VueTypes.number.def(50),
    aMountX: VueTypes.number.def(40),
    aMountY: VueTypes.number.def(20),
    fov: VueTypes.number.def(75),
    near: VueTypes.number.def(1),
    far: VueTypes.number.def(1000),
    positionZ: VueTypes.number.def(600),
    showStats: VueTypes.bool.def(true)
  },
  data() {
    return {
      container: null,
      stats: null,
      camera: null,
      scene: null, 
      renderer: null,
      particles: 0, 
      count: 0,
    }
  },
  methods: {
    init: function() {
      const self = this
      self.container = document.getElementById('testThree');
      self.container.style.height = window.innerHeight + 'px'
			self.camera = new Three.PerspectiveCamera( self.fov, window.innerWidth / window.innerHeight, self.near, self.far );
			self.camera.position.z = self.positionZ;
			self.scene = new Three.Scene();
      let numParticles = self.aMountX * self.aMountY;
      let positions = new Float32Array( numParticles * 3 );
      let scales = new Float32Array( numParticles );
      let i = 0
      let j = 0
      for ( let ix = 0; ix < self.aMountX; ix ++ ) {
        for ( let iy = 0; iy < self.aMountY; iy ++ ) {
          positions[ i ] = ix * self.spearation - ( ( self.aMountX * self.spearation ) / 2 ); // x
          positions[ i + 1 ] = 0; // y
          positions[ i + 2 ] = iy * self.spearation - ( ( self.aMountY * self.spearation ) / 2 ); // z
          scales[ j ] = 1;
          i += 3;
          j ++;
        }
      }
      let geometry = new Three.BufferGeometry();
      geometry.addAttribute( 'position', new Three.BufferAttribute( positions, 3 ) );
      geometry.addAttribute( 'scale', new Three.BufferAttribute( scales, 1 ) );
      let material = new Three.ShaderMaterial( {
        uniforms: {
          color: { 
            value: new Three.Color(self.color) 
          },
        },
        vertexShader: 'attribute float scale; void main() { vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 ); gl_PointSize = scale * ( 300.0 / - mvPosition.z ); gl_Position = projectionMatrix * mvPosition;}',
        fragmentShader: 'uniform vec3 color; void main() { if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard; gl_FragColor = vec4( color, 1.0 );}'
      } );
      self.particles = new Three.Points( geometry, material );
      self.scene.add( self.particles );
      self.renderer = new Three.WebGLRenderer( { antialias: true, alpha:true} );
      self.renderer.setPixelRatio( window.devicePixelRatio );
      self.renderer.autoClear = true
      // self.renderer.setClearColor('rgb(0,0,0)',1.0); 
      // self.renderer.setClearAlpha(0.01)
      self.renderer.setSize( window.innerWidth, window.innerHeight );
      self.container.appendChild( self.renderer.domElement );
    },
    animate: function() {
      const self = this
      self.renderer.clear()
      requestAnimationFrame( self.animate );
      self.render();
      self.showStats && self.showStateInfo();
    },
    render: function() {
      const self = this
      self.camera.position.x += ( self.mouseX - self.camera.position.x ) * .05;
      self.camera.position.y += ( - self.mouseY - self.camera.position.y ) * .05;
      self.camera.lookAt( self.scene.position );
      let positions = self.particles.geometry.attributes.position.array;
      let scales = self.particles.geometry.attributes.scale.array;
      let i = 0
      let j = 0
      for ( let ix = 0; ix < self.aMountX; ix ++ ) {
        for ( let iy = 0; iy < self.aMountY; iy ++ ) {
          positions[ i + 1 ] = ( Math.sin( ( ix + self.count ) * 0.3 ) * 40 ) +
                  ( Math.sin( ( iy + self.count ) * 0.5 ) * 40 );
          scales[ j ] = ( Math.sin( ( ix + self.count ) * 0.3 ) + 1 ) * 6 +
                  ( Math.sin( ( iy + self.count ) * 0.5 ) + 1 ) * 6;
          i += 3;
          j ++;
        }
      }
      self.particles.geometry.attributes.position.needsUpdate = true;
      self.particles.geometry.attributes.scale.needsUpdate = true;
      self.renderer.render( self.scene, self.camera );
      self.count += 0.1;
    },
    showStateInfo: function() {
      const self = this
      if (!self.stats) {
        self.stats = new Stats();
        document.getElementById('testThree').appendChild( self.stats.dom );
      } else {
        self.stats.update();
      }
    }
  },
  mounted() {
    this.init()
    this.animate()
  }
}
</script>
