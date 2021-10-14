'use strict'

//REACT
import React, { useEffect } from 'react'
//REDUX
import { useSelector, useDispatch } from 'react-redux'
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

const fontLoader = new FontLoader();

const About = () => {
  const rstate = useSelector(rstate => rstate)
  const dispatch = useDispatch()
  const { appState } = bindActionCreators(actions, dispatch)

  useEffect(async () => {
    console.log(rstate.main)
  }, [])

  return (
    <div id="home-three">
      <Header />
      <div id="about-text">
        <p>I am a sort of software engineer experimenting and developing interactive experiences through various a plethora of technologies.
        The current tech stack that I'm working with primarily uses React, Threejs, Solidity and Nodejs. With this stack I aim to create
        decentralized applications that merge the wonderful world of web based 3D with blockchain.</p>

        <p>Prior to my current ventures I have worked several years as a Software Engineer / Full Stack Developer.</p>
      </div>
      <Footer />
    </div>
  )
}

export default About
