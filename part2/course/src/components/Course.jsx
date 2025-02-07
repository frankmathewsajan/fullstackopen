const Header = ({title}) => {
    return <h2>{title}</h2>;
};

const Part = ({name, exercises}) => {
    return <p>{name} {exercises}</p>;
};

const Total = ({parts}) => {
    return (
        <>
            <p>Total exercises: {parts.reduce((s, p) => {
                return s + Number(p.exercises);
            }, 0)}</p>
        </>
    );
};

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(({name, exercises, id}) => (
                <Part key={id} name={name} exercises={exercises}/>
            ))}
            <Total parts={parts}/>
        </div>
    );
};

const Course = ({course}) => {
    return (
        <>
            <h1>Web development curriculum</h1>
            {course.map(({name, parts, id}) => (
                <div key={id}>
                    <Header title={name}/>
                    <Content parts={parts}/>
                </div>
            ))}
        </>
    );
};

export default Course;
