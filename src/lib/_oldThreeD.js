// https://discoverthreejs.com/book/first-steps/animation-loop/
// https://discourse.threejs.org/t/raycasting-does-not-work-in-react-app/16513
'use strict'

import { throttle } from 'lodash-es'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import axis from './objects/axis'

import font_bebasneue from '../assets/bebasneue_regular.json'

export default class ThreeD {
  constructor(ref) {
    this.ref = ref
    
    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color( '#BBBBBB' )
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    this.camera.position.z = 10
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set( 0, 0, 0 )
    this.mouse = new THREE.Vector2()
    this.raycaster = new THREE.Raycaster()
    this.loader = new GLTFLoader()
    this.fonter = new THREE.Font(font_bebasneue)

    window.addEventListener('resize', throttle(() => this.resize(), 100))
    window.addEventListener('keydown', e => this.keydown(e), 10)
    window.addEventListener('wheel', e => this.wheelScroll(e), false)
    // window.addEventListener('mousemove', e => this.mouseMove(e), false)
    window.addEventListener('mousedown', e => this.mouseDown(e), false)
    window.addEventListener('mouseup', e => this.mouseUp(e), false)
  }

  async init(ref) {
    this.ref = ref
    ref.current.appendChild(this.renderer.domElement)

    // Lights
    this.loadLights()

    let text = new THREE.Mesh(
      new THREE.ShapeBufferGeometry(this.fonter.generateShapes('Loading...', 1)),
      new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide })
    )
    text.name = 'loading'
    text.position.set(-1.5, 3, 0)
    this.scene.add(text)

    this.renderer.render(this.scene, this.camera)

    // this.scene.remove(this.scene.getObjectByName('loading'))


    // Objects
    const geometryCube = new THREE.BoxGeometry( 1, 1, 1 )
    const materialCube = new THREE.MeshLambertMaterial( { color: 0x779ab9f } )
    this.cube = new THREE.Mesh( geometryCube, materialCube )
    this.cube.position.set(-5, 5, 0)
    this.scene.add( this.cube )

    this.planeFloor = new THREE.Mesh(
      new THREE.BoxGeometry( 10, 0.25, 10 ), new THREE.MeshLambertMaterial( { color: 0xffeeaa } )
    )
    this.planeFloor.position.set(0, 0, -5)
    this.scene.add(this.planeFloor)

    this.createTree(0, 4, 0)
    axis(this.scene)

    this.animate()
  }

  createTree(x, y, z) {
    const treeTrunk = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 8, 44, 32), new THREE.MeshBasicMaterial({ color: 0x725c42 }))
    treeTrunk.position.set(x, y, z)

    const treeHead = new THREE.Mesh(new THREE.SphereGeometry(5, 32, 16), new THREE.MeshBasicMaterial({ color: 0x66aa66}))
    treeHead.position.set(x, y*3, z)

    const tree = new THREE.Group()
    tree.add(treeTrunk)
    tree.add(treeHead)
    this.scene.add(tree)
  }

  async loadObjects (objs) {
    for (let i = 0; i < objs.length; i++) {
      const ld_obj = await this.loader.loadAsync(
        objs[i],
        (xhr) => this.loadStatus(xhr)
      )
      const ldm_obj = ld_obj.scene.children[0]
      ldm_obj.position.set(3, -2 * i, -5)
      this.scene.add(ldm_obj)
    }
  }

  loadLights () {
    const amblight = new THREE.AmbientLight( 0x404040, 1 )
    this.scene.add(amblight)

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
    directionalLight.position.y = 15
    this.scene.add( directionalLight )

    this.spotlight = new THREE.SpotLight( 0xffffff )
    this.spotlight.position.set(5, 5, 5)
    this.scene.add( this.spotlight )

    this.pointlight = new THREE.PointLight( 0xff0000, 1, 1 )
    this.pointlight.position.set( -5, -5, -5 )
    this.scene.add( this.pointlight )
  }

  destroy() {
    window.removeEventListener('resize', throttle(() => this.resize(), 100))
    window.removeEventListener('keydown', (e) => this.keydown(e))
    window.removeEventListener('wheel', e => this.wheelScroll(e))
    // window.removeEventListener('mousemove', e => this.mouseMove(e) )
  }

  loadStatus(xhr) {
    // console.log(xhr)
    const loaded = (xhr.loaded / xhr.total) * 100
    // console.log( loaded + '% loaded' )
  }

  animate() {
    this.renderer.setAnimationLoop(() => {
      this.cube.rotation.x += 0.01
      this.cube.rotation.y += 0.01

      // const intersects = this.raycaster.intersectObjects( this.scene.children )
      // console.log(intersects)
      // if (intersects.length > 0) {
      //   // console.log(intersects[0])
      //   // intersects.forEach(ints => {
      //   //   console.log(ints)
      //   // })
      // }

      this.renderer.render(this.scene, this.camera)
    })
  }

  stopAnimate() {
    this.renderer.setAnimationLoop(null)
  }

  mouseMove(e, _mouse) {
    e.preventDefault()
    console.log(e)
    console.log(_mouse)

    // const bounding_rect = this.renderer.domElement.getBoundingClientRect()
    this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    

    // this.raycaster.setFromCamera( this.mouse, this.camera )
  }

  mouseUp(e) {

  }

  mouseDown(e) {

  }

  wheelScroll(e) {
    if (e.deltaY > 0) {
      this.camera.z += 1
    } else {
      this.camera.z -= 1
    }
  }

  keydown(e) {
    console.log(e.key)
  }

  resize() {
    const width = window.innerWidth
    const height = window.innerHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  
    const canvas = this.ref.current.children[0]
    const ratio = window.devicePixelRatio
    canvas.width = width * ratio
    canvas.height = height * ratio
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
  }
}
