const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}
const Part = (props) => {
    return (
        <>
            <p>
                {props.name} {props.count}
            </p>
        </>
    )
}
const Content = (props) => {
    return (
        <>
            <Part name={props.names[0]} count={props.count[0]}/>
            <Part name={props.names[1]} count={props.count[1]}/>
            <Part name={props.names[2]} count={props.count[2]}/>
        </>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.total}</p>
    )
}
const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course}/>
            <Content names={[part1, part2, part3]} count={[exercises1, exercises2, exercises3]}/>
            <Total total={exercises1 + exercises2 + exercises3}/>
        </div>
    )
}

export default App