import { useEffect, useState } from "react"

import "./App.css"
export default function App() {
  const [datas, setDatas] = useState([])
  const [currQ, setCurrQ] = useState(null)

  const URL = "https://the-trivia-api.com/v2/questions?limit=10"

  async function getData() {
    try {
      const res = await fetch(URL)
      const data = await res.json()
      setDatas(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (datas.length > 0) {
      console.log("Setting first question:", datas[0])
      setCurrQ(datas[0])
    }
  }, [datas])

  function handleNext() {
    if (datas.length > 0) {
      const randomIndex = Math.floor(Math.random() * datas.length)
      setCurrQ(datas[randomIndex])
    }
  }

  if (!currQ) {
    return (
      <div className="w-200 p-2 h-auto text-black bg-amber-50 m-auto">
        <h1 className="text-3xl text-center">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="w-200 p-2 h-auto text-black bg-amber-50 m-auto">
      <h1 className="text-3xl text-center">Fsd Quiz App</h1>
      <div className="gap-120 mt-8">
        <div className="difficulty bg-green-700 w-60 h-10 text-white text-[19px] flex justify-center items-center p-2 rounded-2xl">
          difficulty: {currQ.difficulty}
        </div>
      </div>

      <div className="question">
        <div className="space flex justify-center items-center w-full h-15 my-5 bg-amber-200 ">
          <h2 className="text-[18px]">{currQ.question.text}</h2>
        </div>
        <div className="options">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {currQ.incorrectAnswers && currQ.incorrectAnswers.length > 0 ? (
              <>
                <div className="bg-gray-200 p-4 rounded text-center">{currQ.correctAnswer}</div>
                <div className="bg-gray-200 p-4 rounded text-center">{currQ.incorrectAnswers[0]}</div>
                <div className="bg-gray-200 p-4 rounded text-center">{currQ.incorrectAnswers[1]}</div>
                <div className="bg-gray-200 p-4 rounded text-center">{currQ.incorrectAnswers[2]}</div>
              </>
            ) : (
              <div className="col-span-2">Loading options...</div>
            )}
          </div>
        </div>

        <div className="submit">
          <button 
            onClick={handleNext}
            className="w-45 cursor-pointer active:scale-95 h-auto py-1 mt-10 rounded-2xl text-[20px] bg-amber-600"
          >
            Next Question
          </button>
        </div>
      </div>
    </div>
  )
}