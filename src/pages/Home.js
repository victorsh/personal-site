import React, { useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../store/actions'

import IntroModal from '../components/IntroModal'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Home = () => {
  const rstate = useSelector((rstate) => rstate)
  const dispatch = useDispatch()
  const { appState } = bindActionCreators(actions, dispatch)
  const event_loading_green = new Event('loading-green')
  const event_switch_scene = new Event('switch-scene')

  useEffect(async () => {
    document.body.addEventListener('cube-click', () => {
      console.log('react: cube click')
    })
    return () => {
    }
  }, []) //empty array causes this effect to only run on mount

  return (
    <div>
      <Header />
      {/* <IntroModal /> */}
      <button onClick={() => document.body.dispatchEvent(event_loading_green)}>hello</button>
      <button onClick={() => document.body.dispatchEvent(event_switch_scene)}>switch scene</button>
      <Footer />
    </div>
  )
}

export default Home
