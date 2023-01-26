import React from "react";
import {nanoid} from "nanoid"

export default function Question(props) {

    let answers = props.q.answers

    function handleClick(answer) {
        if (props.q.checked) {
            return
        }
        props.handleClickAnswers(props.id , answer)
    }

    const answersElm = answers.map(ans => {
        let id = null 
        if(props.q.checked) {
            if(props.q.correct === ans) {
                id = "correct"
            }
            else if(props.q.selected === ans) {
                id = "incorrect"
            }
            else {
                id = "not-selected"
            }
        }
        return (
            <button key={nanoid()} id={id} className={ans === props.q.selected ? "answer selected" : "answer "} onClick={() => handleClick(ans)}>{atob(ans)}</button>
        )
    })
    

    return(
        <div className="quiz-main">
            <h2 className="quiz-question">{atob(props.q.question)}</h2>
                {answersElm}
            <div className="line"></div>

        </div>
    )
}