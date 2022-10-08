import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Segment, Item, Divider, Button, Icon, Message, Menu, Header} from 'semantic-ui-react';
import he from 'he'
import Countdown from '../Countdown';
import getLetter from '../../utils/getLetter';

const Quiz = ({data, countdownTime, endQuiz}) => {

    const  [questionIndex, setQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [userSlectedAns, setUserSlectedAns] = useState(null);
    const [questionAndAnswers, setQuestionAndAnswers] = useState([]);
    const [timeTaken, setTimeTaken] = useState(null);

    const handleItemClick = (e, {name}) => {
        setUserSlectedAns(name);
    }

    const handleNext = () => {
        let point = 0;
        if(userSlectedAns === he.decode(data[questionIndex].correct_answer)){
            point = 1;
        }
        
        const qna = questionAndAnswers;
        qna.push({
            question: he.decode(data[questionIndex].question),
            user_answer: userSlectedAns,
            correct_answer: he.decode(data[questionIndex].correct_answer),
            point
        });

        if(questionIndex === data.length - 1){
            return endQuiz({
                totalQuestions: data.length,
                correctAnswers: correctAnswers + point,
                timeTaken,
                questionAndAnswers: qna
            });
        }

        setCorrectAnswers(correctAnswers + 1);
        setQuestionIndex(questionIndex + 1);
        setUserSlectedAns(null);
        setQuestionAndAnswers(qna);
    };

    const timeOver = timeTaken => {
        return endQuiz({
            totalQuestions: data.length,
            correctAnswers,
            timeTaken,
            questionAndAnswers
        });
    };

    return (
        <Item.Header>
            <Container>
                <Segment>
                    <Item.Group divided>
                        <Item>
                            <Item.Content>
                                <Item.Extra>
                                    <Header as="h1" block floated="left">
                                        <Icon name='info circle'/>
                                        <Header.Content>
                                            {`Question N:.${questionIndex + 1} of ${data.length}`}
                                        </Header.Content>
                                    </Header>
                                    <Countdown
                                        countdownTime={countdownTime}
                                        timeOver={timeOver}
                                        setTimeTaken={setTimeTaken}
                                    />
                                </Item.Extra>
                                <br />
                                <Item.Meta>
                                    <Message size='huge' floating>
                                        <b> {`Q. ${he.decode(data[questionIndex].question)}`} </b>
                                    </Message>
                                    <br/>
                                    <Item.Description>
                                        <h3>Please chosse one of the following answers:</h3>
                                    </Item.Description>
                                    <Divider/>
                                    <Menu vertical fluid size='massive'>
                                        {data[questionIndex].options.map((option, i) => {
                                            const letter = getLetter(i);
                                            const decodeOption = he.decode(option);

                                            return (
                                                <Menu.Item
                                                    key={decodeOption}
                                                    name={decodeOption}
                                                    active={userSlectedAns === decodeOption}
                                                    onClick={handleItemClick}
                                                >
                                                    <b style={{ marginRight: '8px' }}> {letter} </b>
                                                    {decodeOption}
                                                </Menu.Item>
                                            )
                                        })}
                                    </Menu>
                                </Item.Meta>
                                <Divider/>
                                <Item.Extra>
                                    <Button
                                        primary
                                        content="Next"
                                        onClick={handleNext}
                                        floated="right"
                                        size='big'
                                        icon="right chevron"
                                        labelPosition='right'
                                        disabled={!userSlectedAns}
                                    />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                <br/>
            </Container>
        </Item.Header>
    );
};

Quiz.propTypes = {
    data: PropTypes.array.isRequired,
    countdownTime: PropTypes.number.isRequired,
    endQuiz: PropTypes.func.isRequired
};

export default Quiz;