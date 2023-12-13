import React, { useEffect, useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data'

function Quiz() {

    let [index, setIndex] = useState(0);
    let question = data[index];
    let [lock, setLock] = useState(false);
    let [result, setResult] = useState(false);
    let [score, setScore] = useState(0);

    // Create refs for each option
    const optionRefs = [useRef(), useRef(), useRef(), useRef()];

    const resetOptions = () => {
        optionRefs.forEach((ref) => {
            ref.current.classList.remove('correct', 'wrong');
        });
    };

    useEffect(() => {
        resetOptions(); // Reset options when the question changes
    }, [question]); // Watch for changes in the 'question' variable

    const checkAnswer = (event, answer) => {
        if (!lock) {
            const selectedOption = optionRefs.find((ref) => ref.current === event.target);

            if (answer === question.correctAnswer) {
                setScore((prevScore) => prevScore + 1);
                selectedOption.current.classList.add('correct');
                setLock(true);
            } else {
                selectedOption.current.classList.add('wrong');
                // Highlight the correct option
                const correctOption = optionRefs.find((ref) => ref.current.innerText === question.correctAnswer);
                if (correctOption) {
                    correctOption.current.classList.add('correct');
                }
                setLock(true);
            }
        }
    };

    const nextQuestion = () => {
        if (index === data.length - 1) {
            setResult(true);
            return 0;
        }
        setIndex((prevIndex) => prevIndex + 1);
        setLock(false);
    };

    const resetQuiz = () => {
        setIndex(0);
        setScore(0);
        setResult(false);
        setLock(false);
        resetOptions();
    };


    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {result ?
                <>
                    <h2>You scored {score} out of {data.length} </h2>
                    <button onClick={resetQuiz}>Reset</button>
                </>
                :
                <>
                    <h2>{(index + 1) + ". " + question.question}</h2>
                    <ul>
                        <li ref={optionRefs[0]} onClick={(event) => checkAnswer(event, question.option1)}>{question.option1}</li>
                        <li ref={optionRefs[1]} onClick={(event) => checkAnswer(event, question.option2)}>{question.option2}</li>
                        <li ref={optionRefs[2]} onClick={(event) => checkAnswer(event, question.option3)}>{question.option3}</li>
                        <li ref={optionRefs[3]} onClick={(event) => checkAnswer(event, question.option4)}>{question.option4}</li>
                    </ul>
                    <button onClick={nextQuestion} disabled={!lock}>Next</button>
                    <div className='index'>{index + 1} of {data.length} questions</div>
                </>
            }
        </div>
    )
}

export default Quiz

