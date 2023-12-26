import './App.css';
import { useState, useEffect } from "react"
const countriesJSON = require("./countries.json")

function Header({points, color, oldAnswer}){
  return (
    <div style={{display: "flex", width: "100vw", backgroundColor: "darkslategray", color: "white", flexDirection: "row", marginBottom: 8, justifyContent: "center", gap: 50, alignItems: "center"}} >
      <h1>Bayrak Tahmin</h1>
      <h1 style={{color: [color]}} >Puan: {points}</h1>
      <h4>Doğru cevap şuydu: {oldAnswer[0]}</h4>
      <img src={require("./flags/" + oldAnswer[1].toLowerCase() + ".svg")} height={60} />
    </div>
  )
}

function Modal({points, visibility, questions}){
  return(
    <div style={{visibility: visibility, position: "fixed", width: "100vw", height: "100vh", alignItems: "center", justifyContent: "center", display: "flex", backgroundColor: "rgba(0, 0, 0, 0.2)"}} >
      <div style={{height: 300, width: 400, backgroundColor: "darkslategray", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 20}} >
      Oyun bitti. {questions - 2} soruda {points / 10} doğru cevap verdin
      </div>  
    </div>
  )
}

function App() {
  
  //let isoCodes = Object.keys(iso)
  let countries = Object.values(countriesJSON)
  //console.log(countries[0]["name"]["official"])


  function fisherYatesShuffle(comb){
    const arr = [...comb];
    for(let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    };
    return arr;
  }

  const [shuffledOptions, setShuffledOptions] = useState(["","","",""]);
  const [correctAnswer, setCorrectAnswer] = useState(["","no_image"])
  const [oldAnswer, setOldAnswer] = useState(["","no_image"])
  const [points, setPoints] = useState(0)
  const [color, setColor] = useState("white")
  const [questions, setQuestions] = useState(1)
  const [modalVisibility, setModalVisibility] = useState("hidden")

  function newQuestion(){
    let randomIndex = Math.round(Math.random() * 250)
    let answerName = countries[randomIndex]["name"]["common"]
    let answerCode = countries[randomIndex]["cca3"]
    let answer = [answerName, answerCode]
    
    let options = [answer]
    let otherCountries = [...countries]
    otherCountries.splice(randomIndex, 1)
    for(let i = 0; i <= 2; i++){
      randomIndex = Math.round(Math.random() * (248 - i))
      console.log(randomIndex, otherCountries.length, i)
      console.log(otherCountries[randomIndex])
      let optionName = otherCountries[randomIndex]["name"]["common"]
      let optionCode = otherCountries[randomIndex]["cca3"]
      let option = [optionName, optionCode]
      options.push(option)
      otherCountries.splice(randomIndex, 1)
    }
    setCorrectAnswer(answer);
    setShuffledOptions(fisherYatesShuffle(options));
    setQuestions(questions + 1)
    
  }
  function optionClicked(opt){
    console.log(opt, correctAnswer[0])
    if (questions === 51){
      setQuestions(1)
      setModalVisibility("visible")
    }
    else if (opt === correctAnswer[0]) {
      setPoints(points + 10)
      setColor("lawngreen")
      setOldAnswer([correctAnswer[0], correctAnswer[1]])
    }
    else {
      setColor("red")
      setOldAnswer([correctAnswer[0], correctAnswer[1]])
    }
    newQuestion()
  }
  
  useEffect(()=>{
    newQuestion()
  }, [])

  return (
    <div className="App">
      <Modal points={points} visibility={modalVisibility} questions={questions} />
      <Header points={points} color={color} oldAnswer={oldAnswer}/>
      <img src={require("./flags/" + correctAnswer[1].toLowerCase() + ".svg")} height={300} alt='flag'/>
      <div style={{alignItems: "center", height: "%100", width: "%100", display: "flex", flexDirection: "column"}} >
        <button style={{height: 42, width: 400, fontSize: 20, borderRadius: 0, marginTop: 4, backgroundColor: "white"}} onClick={()=>{optionClicked(shuffledOptions[0][0])}} >{shuffledOptions[0][0]}</button>
        <button style={{height: 42, width: 400, fontSize: 20, borderRadius: 0, marginTop: 4, backgroundColor: "white"}} onClick={()=>{optionClicked(shuffledOptions[1][0])}} >{shuffledOptions[1][0]}</button>
        <button style={{height: 42, width: 400, fontSize: 20, borderRadius: 0, marginTop: 4, backgroundColor: "white"}} onClick={()=>{optionClicked(shuffledOptions[2][0])}} >{shuffledOptions[2][0]}</button>
        <button style={{height: 42, width: 400, fontSize: 20, borderRadius: 0, marginTop: 4, backgroundColor: "white"}} onClick={()=>{optionClicked(shuffledOptions[3][0])}} >{shuffledOptions[3][0]}</button>
      </div>
    </div>
  );
}

export default App;
