import React, {useEffect} from 'react'

import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

import { useDispatch, useSelector  } from 'react-redux';
import { bindActionCreators } from 'redux'
import { productActionCreators } from './state/index'
import { authActionCreators } from './state/index'


import './styles/App.css';

function App() {

  //Redux state

  const state = useSelector((state) => state)

  //Redux action creators import
  
  const dispatch = useDispatch()

  const {getProducts} = bindActionCreators(productActionCreators, dispatch)

  const {loadUser} = bindActionCreators(authActionCreators, dispatch)

  //Load user function

  useEffect(() => {
    loadUser()
  }, [state.appView])

  //Product DB query function

  useEffect(() => {
    if (state.appView.activePage === "homepage") {
      return
    }else {
      makeRequestApp()
    }
  }, [state.request])

  const makeRequestApp = async () => {
    const request = state.request
    try {
      await getProducts(request)
    } 
    catch(e) {
      console.log(e)
    }
  }

  return (
      <div>
        <Header/>
        <Body makeRequestApp = {makeRequestApp}/>
        <Footer/>
      </div>
  );
}

export default App;
