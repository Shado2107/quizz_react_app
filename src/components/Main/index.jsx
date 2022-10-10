import React, { useState } from 'react';
import { Container, Segment, Item, Dropdown, Divider, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types'
import {shuffle} from '../../utils'
import axios from '../../Api/config'
import { CATEGORIES, COUNTDOWN_TIME, DIFFICULTY, NUM_OF_QUESTIONS, QUESTIONS_TYPE } from '../../constants'


const Main = ({startQuiz}) => {

    const [category, setCategory] = useState('0')
    const [numOfQuestions, setNumOfQuestions] = useState(5)
    const [difficulty, setDifficulty] = useState('0')
    const [questionsType, setQuestionsType] = useState('0')
    const [countdownTime, setCountdownTime] = useState({
        hours: 0,
        minutes: 120,
        seconds: 0,
    });
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState(null);
    const [offline, setOffline] = useState(false)
    const handleTimeChange =  (e, {name, value}) => {
        setCountdownTime({...countdownTime, [name]: value });
    };


    let allFieldSelected = false;
    if (
        category &&
        numOfQuestions &&
        difficulty &&
        questionsType &&
        (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
    ) {
        allFieldSelected = true;
    }


    const loadData = () => {
      
        const Qcm = axios.get({
            params: {
                amount: {numOfQuestions},
                category: {category},
                difficulty: {difficulty},
                type: {questionsType}
            }
        });
        Qcm.then((response) => {
            response.jscon();
        }).then( data => setTimeout(() => {
            const {response_code, results} = data;

            if(response_code === 1){
                const message = (
                    <p>
                        The API doesn(t have enough questions for your query. (Ex. Asking for 50 questions in a category that only has 20)
                        )
                        <br/>
                        <br/>
                        Please change <strong>N of questions</strong>, {''}
                        <strong>Difficulty level</strong>, or {''}
                        <strong>Type of questions</strong>
                    </p>
                );
                setProcessing(false);
                setError({message});

                return;
            }

            results.forEach(element => {
                element.options = shuffle([
                    element.correct_answer,
                    ...element.incorrect_answers,
                ]);
            });

            setProcessing(false);
            startQuiz(
                results,
                countdownTime.hours + countdownTime.minutes + countdownTime.seconds
            );

        }, 1000)
        ).catch( error => {
            setTimeout(() => {
                if(!navigator.onLine){
                    setOffline(true);
                } else {
                    setProcessing(false);
                    setError(error);
                }
            }, 1000)
        });
    };

    return (
        <Container>
            <Segment>
                <Item.Group divided>
                    <Item>
                        <Item.Image  />
                        <Item.Content>
                            <Item.Header>
                                <h1>The ultimate trivia quiz</h1>
                            </Item.Header>
                            {error && (
                                <Message erro onDismiss={() => setError(null)}>
                                    <Message.Header>Error!</Message.Header>
                                    {error.message}
                                </Message>
                            )}
                            <Divider/>
                            <Item.Meta>
                                <Dropdown
                                    fluid
                                    selection
                                    name="category"
                                    placeholder='select quiz category'
                                    header="select quiz category"
                                    options={CATEGORIES}
                                    value={category}
                                    onChange={(e, {value}) => setCategory(value)}
                                    disabled={processing}
                                />
                                <br/>
                                <Dropdown
                                    fluid
                                    selection
                                    name="numOfQ"
                                    placeholder='slect N of questions'
                                    header="slection n OF questions"
                                    options={NUM_OF_QUESTIONS}
                                    value={numOfQuestions}
                                    onChange={(e, {value}) => setNumOfQuestions(value)}
                                    disabled={processing}
                                />
                                <br/>
                                <Dropdown
                                    fluid
                                    selection
                                    name="difficulty"
                                    placeholder='select difficulty level'
                                    header="select difficulty level"
                                    options={DIFFICULTY}
                                    onChange={(e, {value}) => setDifficulty(value)}
                                    disabled={processing}
                                />
                                <br/>
                                <Dropdown
                                    fluid
                                    selection
                                    name="type"
                                    placeholder="Select Questions Type"
                                    header="Select Questions Type"
                                    options={QUESTIONS_TYPE}
                                    value={questionsType}
                                    onChange={(e, { value }) => setQuestionsType(value)}
                                    disabled={processing}
                                    />
                                <br />
                                <Dropdown
                                    search
                                    selection
                                    name="hours"
                                    placeholder="Select Hours"
                                    header="Select Hours"
                                    options={COUNTDOWN_TIME.hours}
                                    value={countdownTime.hours}
                                    onChange={handleTimeChange}
                                    disabled={processing}
                                />
                                <Dropdown
                                    search
                                    selection
                                    name="minutes"
                                    placeholder="Select Minutes"
                                    header="Select Minutes"
                                    options={COUNTDOWN_TIME.minutes}
                                    value={countdownTime.minutes}
                                    onChange={handleTimeChange}
                                    disabled={processing}
                                />
                                <Dropdown
                                    search
                                    selection
                                    name="seconds"
                                    placeholder="Select Seconds"
                                    header="Select Seconds"
                                    options={COUNTDOWN_TIME.seconds}
                                    value={countdownTime.seconds}
                                    onChange={handleTimeChange}
                                    disabled={processing}
                                />
                            </Item.Meta>
                            <Divider/>
                                <Item.Extra>
                                    <Button
                                    primary
                                    size="big"
                                    icon="play"
                                    labelPosition="left"
                                    content={processing ? 'Processing...' : 'Play Now'}
                                    onClick={loadData}
                                    disabled={!allFieldSelected || processing}
                                    />
                                </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <br/>
        </Container>
    );
};

Main.propTypes = {
    startQuiz: PropTypes.func.isRequired,
};

export default Main;