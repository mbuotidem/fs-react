import React from 'react';


const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </>
    )
}


const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    const sum = course.parts.reduce((x, y) => x + y.exercises, 0)
    return (
        <p><strong>Total of {sum} exercises</strong></p>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(x =>
                < Part key={x.name} part={x} />
            )}
        </div>
    )
}

export default Course