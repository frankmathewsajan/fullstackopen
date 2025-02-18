import {useState} from "react";

function NextButton({onClick}) {
    return <button onClick={onClick}>next</button>;
}

function VoteButton({onClick}) {
    return <button onClick={onClick}>vote</button>;
}

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is the same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well."
    ];

    const [selected, setSelected] = useState(Math.floor(Math.random() * (8)));
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
    const [highest, setHighest] = useState(0);

    const handleVote = () => {
        setVotes((prevVotes) => {
            const newVotes = [...prevVotes];
            newVotes[selected] += 1;

            if (newVotes[selected] > newVotes[highest]) {
                setHighest(selected);
            }

            return newVotes;
        });
    };

    const handleNext = () => {
        setSelected((prevSelected) => (prevSelected + 1) % anecdotes.length);
    };

    return (
        <>
            <h1>Anecdote of the day</h1>
            <div>
                {anecdotes[selected]} <br/>
                <br/>
                has {votes[selected]} {votes[selected] === 1 ? "vote" : "votes"}
            </div>
            <br/>
            <VoteButton onClick={handleVote}/>
            <NextButton onClick={handleNext}/>

            <h1>Anecdote with most votes</h1>
            <div>
                {anecdotes[highest]} <br/>
                <br/>
                has {votes[highest]} {votes[highest] === 1 ? "vote" : "votes"}
            </div>
        </>
    );
};

export default App;
