import React from 'react'
import { useState, useEffect, useRef } from 'react'

const StopWatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const startTimeRef = useRef(0);
    const intervalIdRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10);
        }
        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning])

    const formatTime = () => {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
        let seconds = Math.floor(elapsedTime / ((1000 % 60)))
        let milliseconds = Math.floor((elapsedTime % 1000) / 10)

        hours = String(hours).padStart(2, "0")
        minutes = String(minutes).padStart(2, "0")
        seconds = String(seconds).padStart(2, "0")
        milliseconds = String(milliseconds).padStart(2, "0")
        return `${hours}:${minutes}:${seconds}:${milliseconds}`
    }

    const start = () => {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;

    }

    const stop = () => {
        setIsRunning(false);
    }

    const reset = () => {
        setElapsedTime(0);
        setIsRunning(false);
    }



    return (
        <div className='stopwatch'>
            <div className='display'>{formatTime()}</div>
            <div className='controls'>
                <button className='start' onClick={start}>Start</button>
                <button className='stop' onClick={stop}>Stop</button>
                <button className='reset' onClick={reset}>Reset</button>
            </div>
        </div>
    )
}

export default StopWatch