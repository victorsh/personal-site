import React, { useEffect, useRef } from 'react'
import { initMoralis, login, logout } from '../lib/blockchain/moralis/m-users'
import {
  useSelector,
  useDispatch,
  bindActionCreators,
  actions
} from '../imports/redux'

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
    initMoralis()
    return () => {
      document.body.removeEventListener('cube-click', )
    }
  }, []) //empty array causes this effect to only run on mount

  return (
    <div>
      <Header />
      {/* <IntroModal /> */}
      {/* <button onClick={() => document.body.dispatchEvent(event_loading_green)}>hello</button>
      <button onClick={() => document.body.dispatchEvent(event_switch_scene)}>switch scene</button> */}
      <div className='flex justify-center items-center mx-auto text-center bg-cyan-700 w-2/3 mt-10 text-2xl text-slate-300'>
        Hello and welcome to my site! This site is a source of all computer science topics that interest me.
        This ranges from web development, backend, blockchain technology, computer graphics, and more.
      </div>
      <button className='text-slate-300 enable-input' onClick={() => login()}>login</button>
      <button className='text-slate-300 enable-input' onClick={() => logout()}>logout</button>
      <Footer />
    </div>
  )
}

export default Home
