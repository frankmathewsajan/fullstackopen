import {useState} from "react";
// UseState re-renders the whole thing, so don't use it directly.
// ie. Calling a function that changes the state causes the component to re-render.
// lift the state up in the component hierarchy.
// Do not mutate state directly
// Since state changes are asyncronous, put the new values in a `const` first

const Display = ({counter}) => {
  return (
      <div>{counter}</div>
  )
}

const Button = ({onClick,text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}
const App = () => {
    const [counter, setCounter] = useState(0)


    const increaseByOne = () => setCounter(counter + 1)

    const setToZero = () => setCounter(0)

    return (
        <>
            <Display counter={counter}/>

            <Button onClick={increaseByOne} text="+"/>

            <Button onClick={setToZero} text="to 0"/>
        </>
    )
}
export default App

