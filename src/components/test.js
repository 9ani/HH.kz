'use client'
import { useState } from "react"

export default function Test(){
    const [counter, setCounter] = useState(10)
    const plusFunc = () =>{
        setCounter(counter + 1)
    }
   const minusFunc = () =>{
        setCounter(counter - 1)
}
    return(
        <div>
            <h1>GANI</h1>
            <p> Counter: {counter}</p>
            <button onClick={plusFunc}>Plus</button>
            <button onClick={minusFunc}>Minus</button>

        </div>
    )
}