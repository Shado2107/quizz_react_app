import React, { useState } from 'react';
import { Loader } from 'semantic-ui-react';
import shuffle from '../../utils/shuffle';

import Layout from '../Layout'
import Main from '../Main';
import Quiz from '../Quiz';

const App = () => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null);
    const [countdownTime, setCountdownTime] = useState(null)
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [iseQuizCompleted, setIsQuizCompleted] = useState(false)
    const [resultData, setResultData] = useState(null)

    const startQuiz = () => {
        setLoading(true);
        setCountdownTime(countdownTime);

        setTimeout(() => {
            setData(data);
            setIsQuizStarted(true);
            setLoading(false);
        }, 1000);
    };

    const endQuiz = resultData => {
        setLoading(true);

        setTimeout(() => {
            setIsQuizStarted(false);
            setIsQuizCompleted(true);
            setResultData(resultData);
            setLoading(false);
        }, 2000)
    };

    const replayQuiz = () => {
        setLoading(true);

        const shuffleData = shuffle(data);
        shuffleData.forEach(element => {
            element.options = shuffle(element.options);
        });

        setData(shuffleData);

        setTimeout(() => {
            setIsQuizStarted(true);
            setIsQuizCompleted(false)
            setResultData(null)
            setLoading(false)
        }, 1000)
    };

    const resetQuiz = () => {
        setLoading(true);

        setTimeout(() => {
            setData(null)
            setCountdownTime(null)
            setIsQuizStarted(false)
            setIsQuizCompleted(false)
            setResultData(null)
            setLoading(false)
        }, 1000);

    };

    return (
       <Layout>
            {loading && <Loader/>}
            {!loading && !isQuizStarted && !iseQuizCompleted && (
                <Main startQuiz= {startQuiz}/>
            )}
            {!loading && isQuizStarted && (
                <Quiz data={data} countdownTime={countdownTime} endQuiz={endQuiz}/>
            )}
            {!loading && iseQuizCompleted && (
                <></>
            )}
       </Layout>
    );
};

export default App;