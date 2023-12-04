import { useState } from 'react'
import Menue from './comp/Menue'
import Feed from './comp/Feed'
import Chatt from './comp/Chatt'
import Abbos from './comp/Abbos'
import Profile from "./comp/Profile"

import "./app.css"

function App() {

  const [active, _setActive] = useState("home")

  function setActive(text) {
    _setActive("")
    setTimeout(() => {
      _setActive(text)
    }, 300)
  }

  return (
    <>
      <div className={[active == "home" ? "active" : "", "task"].join(" ")}>
        <Feed />
      </div>

      <div className={[active == "chatt" ? "active" : "", "task"].join(" ")}>
        <Chatt />
      </div>

      <div className={[active == "abbos" ? "active" : "", "task"].join(" ")}>
        <Abbos />
      </div>

      <div className={[active == "profile" ? "active" : "", "task"].join(" ")}>
        <Profile />
      </div>

      <Menue active={active} setActive={setActive} />
    </>
  )

}

export default App