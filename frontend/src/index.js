import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import { hot } from "react-hot-loader"
import Home from "./Containers/Home"
import Recipe from "./Containers/Recipe"
import reducers from "./reducers"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';


const store = createStore(reducers, applyMiddleware(thunkMiddleware))

const WrappedHome = () => (
  <BrowserRouter future={{ v7_startTransition: true }}>
    <Provider store={store}>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/recipe/:id" exact element={<Recipe />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Provider>
  </BrowserRouter>
)

const HotHome = hot(module)(WrappedHome)

ReactDOM.render(<HotHome />, document.getElementById("home"))
