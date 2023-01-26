import React from "react";

export default function Menu(props) {
    return (
        <div className="main-menu">
            <h1 className="quiz-title">Quizzical</h1>
            <p className="quiz-descirpiton">Want to Check your Knowledge ? Start our aswome Quiz !</p>
            <button className="start-button" onClick={() => props.start()}>Start Quiz</button>
        </div>
    )
}