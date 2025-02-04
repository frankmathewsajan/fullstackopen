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
            <Part name={props.values[0]['name']} count={props.values[0]['exercises']}/>
            <Part name={props.values[1]['name']} count={props.values[1]['exercises']}/>
            <Part name={props.values[2]['name']} count={props.values[2]['exercises']}/>
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
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }
    let total = part1['exercises'] + part2['exercises'] + part3['exercises']
    return (
        <div>
            <Header course={course}/>
            <Content values={[part1, part2, part3]} />
            <Total total={total}/>
        </div>
    )
}

export default App