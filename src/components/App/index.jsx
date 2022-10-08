import React, { useState } from 'react';

import Layout from '../Layout'

const App = () => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null);
    const [countdownTime, setCountdownTime] = useState(null)
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [iseQuizCompleted, setIsQuizCompleted] = useState(false)
    const [resultData, setResultData] = useState(null)

    

    return (
       <Layout>
            {}
       </Layout>
    );
};

export default App;