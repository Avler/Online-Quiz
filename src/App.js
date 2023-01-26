import React , {useState , useEffect} from "react";
import {nanoid} from "nanoid"
import "./App.css"
import Menu from "./Menu"
import Question from "./Question";

export default function App() {

    const [started , setStarted] = useState(false)
    const [checked , setChecked] = useState(false)
    const [questions , setQuestios] = useState([])
    const [correct , setCorrect] = useState(0)
    const [count , setCount] = useState(0)

    const shuffleArr = (arr) => arr.sort(() => Math.random * -0.5)

    useEffect(() => {
        async function getQuestions(){
            const res = await fetch("https://opentdb.com/api.php?amount=5&encode=base64")
            const data = await res.json()
            let q = []
            data.results.forEach(ele => {
                q.push({id: nanoid() , answers:shuffleArr([...ele.incorrect_answers, ele.correct_answer]) , question: ele.question , correct: ele.correct_answer , checked: false , selected: null })
            })
            setQuestios(q)
        }
        getQuestions()
    }, [count]) 
    
    function getStarted() {
        setStarted(x => !x)
    }

    function handleClickAnswers(id, answer) {
        setQuestios(questions => questions.map(question => {
            return question.id === id ? {...question , selected: answer } : question
        }))
    }

    function handleCheck() {
        let selected = true 
        questions.forEach(question => {
            if(question.selected === null){
                selected = false
                return
            }
            if(!selected){
                return
            }
        })
        setQuestios(question => question.map(question => {
            return {...question , checked: true}
        }))
        setChecked(true)
        let correct = 0
        questions.forEach(question => {
            if (question.correct === question.selected) {
                correct += 1
            }
        })
        setCorrect(correct)
    }

    function playAgain(){
        setChecked(false)
        setCount(count => count +1 )
    }
    console.log(questions)
    const questionElement = questions.map(question => {
        return <Question 
            key={question.id}
            q={question}
            id={question.id}
            handleClickAnswers={handleClickAnswers}
        />
    })

   return (
    <div className="main-cont">
        {started ? 
            <div className="cont-question-cont">
                {questionElement}
               {checked && <span className="score">You scored {correct}/5 correct answers</span>}
                <button className="check-button" onClick={checked ? playAgain : handleCheck}>{checked ?  "Play Again" : "Check the Answers" }</button>
            </div>
            :
            <Menu 
                start={getStarted}
            />
        } 
        

    </div>
   )

}