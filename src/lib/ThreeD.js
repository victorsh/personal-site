https://github.com/emreacar/google-fonts-as-json/tree/master/json-files

'use strict'

import * as THREE from 'three'
import { throttle } from 'lodash-es'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import font_bebasneue from '../assets/bebasneue_regular.json'

import axis from './objects/axis'
import RotatingBoxes from './objects/rotating-boxes'
import tree from './objects/tree'
import dbox from './objects/dbox'
import loadingText from './objects/loading-text.js'

export default class ThreeD {
  constructor() {
    this.loopCount = 0
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    // this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize( window.innerWidth, window.innerHeight )

    document.body.appendChild( this.renderer.domElement )
    const canvas = document.body.children[1]
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.position = 'fixed'
    canvas.style.top = '0px'
    canvas.style.zIndex = '-1'

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('#000000')

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
    this.camera.position.set( 5, 5, 10 )
    
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set( 0, 0, 0 )
    this.controls.update()
    
    this.mouse = new THREE.Vector2()
    this.raycaster = new THREE.Raycaster()
    this.raycaster.params.Line.threshold = 0.1
    this.loader = new GLTFLoader()
    this.fonter = new THREE.Font(font_bebasneue)

    this.animDBoxPulse = 1

    window.addEventListener('resize', throttle(() => this.resize(), 100))
    window.addEventListener('keydown', e => this.keydown(e), 10)
    window.addEventListener('wheel', e => this.wheelScroll(e), false)
    window.addEventListener('mousemove', e => this.mouseMove(e), false)
    window.addEventListener('mousedown', e => this.mouseDown(e), false)
    window.addEventListener('mouseup', e => this.mouseUp(e), false)

    document.body.addEventListener('loading-green', () => {
      console.log('loading text to green')
      this.ld_text.material.color.set(0x00ff00)
    })

  }

  init() {
    this.ld_text = loadingText(this.scene, this.camera, this.fonter)

    this.loadLights()
    axis(this.scene)

    this.renderer.render(this.scene, this.camera)
    
    this.cubes = RotatingBoxes(this.scene)
    this.dbox = dbox(this.scene, -5, 0, 0)
    this.tree = tree(this.scene, 5, 5, -5)
    
    this.animate()
  }

  animate() {
    this.renderer.setAnimationLoop(() => {
      this.ld_text.lookAt(this.camera.position)
      if (typeof this.cubes !== 'undefined') {
        this.cubes.forEach(cube => {
          cube.rotation.x += Math.floor(Math.random() * 1.01)
          cube.rotation.y += Math.floor(Math.random() * 1.01)
        })
      }

      if (typeof this.dbox !== 'undefined') {
        this.dbox.forEach(box => {
          if (box.scale.x >= 1) {
            this.animDBoxPulse = -1
          } else if (box.scale.x <= 0.5) {
            this.animDBoxPulse = 1
          }
          box.scale.x = box.scale.x + this.animDBoxPulse*0.01
          box.scale.y = box.scale.y + this.animDBoxPulse*0.01
          box.scale.z = box.scale.z + this.animDBoxPulse*0.01
          
          // box.rotation.x += 0.01
          box.rotation.y += 0.01
          box.rotation.z += 0.01
        })
      }

      const intersects = this.raycaster.intersectObjects( this.scene.children )

      if (intersects.length > 0 && !intersects[0].object.name.includes('axis')) {
        // console.log(intersects[0].object.name)
        const hexValues = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
        if (this.loopCount % 15 === 0) {
          let hex = ''
          for(let i = 0; i < 6; i++){
            const index = Math.floor(Math.random() * hexValues.length)
            hex += hexValues[index];
          }
          intersects[0].object.material.color.set(`#${hex}`)
        }
      }

      this.loopCount++
      this.renderer.render(this.scene, this.camera)
    })
  }

  resize() {
    const width = window.innerWidth
    const height = window.innerHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  
    const canvas = document.body.children[0]
    const ratio = window.devicePixelRatio
    canvas.width = width * ratio
    canvas.height = height * ratio
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
  }

  destroy() {
    window.removeEventListener('resize', throttle(() => this.resize(), 100))
    window.removeEventListener('keydown', (e) => this.keydown(e))
    window.removeEventListener('wheel', e => this.wheelScroll(e))
    window.removeEventListener('mousemove', e => this.mouseMove(e) )
  }

  stopAnimate() {
    this.renderer.setAnimationLoop(null)
  }

  loadStatus(xhr) {
    // console.log(xhr)
    const loaded = (xhr.loaded / xhr.total) * 100
    // console.log( loaded + '% loaded' )
  }

  mouseMove(e) {
    e.preventDefault()
    this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    this.raycaster.setFromCamera( this.mouse, this.camera )
  }
  mouseUp(e) {
    e.preventDefault()
  }
  mouseDown(e) {
    e.preventDefault()
    // this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    // this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    // this.raycaster.setFromCamera( this.mouse, this.camera )
    const intersects = this.raycaster.intersectObjects( this.scene.children )
    if (intersects.length > 0) {
      if (intersects[0].object.name === 'cube_0') {
        console.log('cube 0 clicked')
        const evt_cube_click = new Event('cube-click')
        document.body.dispatchEvent(evt_cube_click)
      }

    }
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
    directionalLight.position.y = 5
    this.scene.add( directionalLight )

    this.spotlight = new THREE.SpotLight( 0xffffff )
    this.spotlight.position.set( 5, 5, 5 )
    this.scene.add( this.spotlight )

    this.pointlight = new THREE.PointLight( 0xff0000, 1, 1 )
    this.pointlight.position.set( -5, -5, -5 )
    this.scene.add( this.pointlight )
  }

}