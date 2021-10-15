'use strict'

//REACT
import React, { useEffect, useState } from 'react'
//REDUX
import { useSelector, useDispatch, Provider, ReactReduxContext } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../store/actions'
//COMPONENTS
import Header from '../components/Header'
import Footer from '../components/Footer'
//THREE
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import * as THREE from 'three'

import Controls from '../components/three/controls'
import Box from '../components/three/box'
import Card from '../components/three/card'
import TextExample from '../components/three/text-example'
import Actions from '../components/three/actions'

const fontLoader = new FontLoader();

const HomeThree = () => {
  const rstate = useSelector(rstate => rstate)
  const dispatch = useDispatch()
  const { appState } = bindActionCreators(actions, dispatch)
  const [exampleText, setExampleText] = useState('hello!')

  useEffect(async () => {
    console.log(rstate.main)
  }, [])

  const handleText = async () => {
    const extx = 'Example Text Loaded!'
    await appState({...rstate.main, extx})
  }
  return (
    <div id="home-three">
      <Header />
      <button onClick={handleText}>Load Exmaple Text</button>
      <div id="canvas-container" style={{width: '100%', height: '100%', position: 'fixed', top: '0px', zIndex: '-1'}}>
        <ReactReduxContext.Consumer>
          {({ store }) => 
            <Canvas style={{ background: 'black'}} pixelRatio={window.devicePixelRatio}>
              <Provider store={store}>
                <Controls />
                <ambientLight intensity={0.1} />
                <directionalLight color="white" position={[-5, 0, -5]} />
                <primitive object={new THREE.AxesHelper(10)} />
                <Box />
                <Card />
                <TextExample />
                <Actions />
              </Provider>
            </Canvas>
          }
        </ReactReduxContext.Consumer>
      </div>
      <Footer />
    </div>
  )
}

export default HomeThree
