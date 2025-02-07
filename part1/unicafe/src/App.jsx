import { useState } from "react";

const Statistics = ({ stat }) => {
    const [good, bad, neutral] = stat;
    const total = good + bad + neutral;
    const avg = total > 0 ? (good - bad) / total : 0;
    const positive = total > 0 ? (good / total) * 100 : 0;

    return (
        <>
            <h1>Statistics</h1>
            {total === 0 ? (
                <p>No feedback given</p>
            ) : (
                <table>
                    <tbody>
                        <tr>
                            <td>Good</td>
                            <td>{good}</td>
                        </tr>
                        <tr>
                            <td>Neutral</td>
                            <td>{neutral}</td>
                        </tr>
                        <tr>
                            <td>Bad</td>
                            <td>{bad}</td>
                        </tr>
                        <tr>
                            <td>All</td>
                            <td>{total}</td>
                        </tr>
                        <tr>
                            <td>Average</td>
                            <td>{avg.toFixed(1)}</td>
                        </tr>
                        <tr>
                            <td>Positive</td>
                            <td>{positive.toFixed(1)}%</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </>
    );
};

const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <>
            <h1>Give Feedback</h1>
            <Button text="Good" onClick={() => setGood(good + 1)} />
            <Button text="Neutral" onClick={() => setNeutral(neutral + 1)} />
            <Button text="Bad" onClick={() => setBad(bad + 1)} />
            <Statistics stat={[good, bad, neutral]} />
        </>
    );
};

export default App;
