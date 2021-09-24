import React from 'react';

//Headerin renderöintiä varten
const Header = ({ name }: { name: string }) => (
  <h1>{name}</h1>
);
/*
//CourseParts -oliota varten tyyppi
interface ContentProps {
  name: string,
  exerciseCount: number
}
*/
/*
//Arrayta varten tyyppi
interface ContentPropsArray {
  courses: Array<ContentProps>
}
*/
// Tyyppien määrittelyt
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
  description?: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: "normal";
  //description: string;
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  //description: string;
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBase {
  type: "special";
  //description: string;
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

//Kurssidata
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]

//Yksittäisen kurssin renderöinti
const Part = ({ part }: { part: CoursePart }) => {
  //console.log('PART Componentti', part)
  if (part.type === 'normal') {
    return <table>
      <tbody >
        <br></br>
        <tr>
          <th align='left'>{part.name} {part.exerciseCount}</th>
        </tr>
        <tr>
          <td align='left'> {part.description}</td>
        </tr>
      </tbody>
    </table>
  }
  else if (part.type === 'groupProject') {
    return <table>
      <tbody >
        <br></br>
        <tr>
          <th align='left'>{part.name} {part.exerciseCount}</th>
        </tr>
        <tr>
          <td align='left'> project excercises: {part.groupProjectCount} </td>
        </tr>
      </tbody>
    </table>

  }
  else if (part.type === 'submission') {
    return <table>
      <tbody>
        <br></br>
        <tr>
          <th align='left'>{part.name} {part.exerciseCount}</th>
        </tr>
        <tr>
          <td align='left'> {part.description} </td>
        </tr>
        <tr>
          <td align='left'> submit: {part.exerciseSubmissionLink}</td>
        </tr>
      </tbody>
    </table>
  }
  else if (part.type === 'special') {
    return <table>
      <tbody>
        <br></br>
        <tr>
          <th align='left'>{part.name} {part.exerciseCount}</th>
        </tr>
        <tr>
          <td align='left'> {part.description} </td>
        </tr>
        <tr>
          <td align='left'> required skills: {part.requirements.join(', ')}</td>
        </tr>
      </tbody>

    </table>
  }

  return null
}

//Contentin renderöinti. 
//Käytetään "switch-case" -opertaaioita
//Yksittäinen kurssi renderöidään "Part" -komponentin avulla
const Content = () => {
  return <div>
    {courseParts.map((course, index) => {
      switch (course.type) {
        case 'normal':
          //console.log('Indeksi', index)
          return <Part part={course} key={index} />;
        case 'groupProject':
          return <Part part={course} key={index} />;
        case 'submission':
          return <Part part={course} key={index} />;
        case 'special':
          return <Part part={course} key={index} />;
        default:
          return assertNever(course);
      }
    })}
  </div>
}
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

//Kurssin harjoitusten kokonaismäärän laskenta ja renderöinti
const Total = () => {
  {
    return (
      <div>
        <br></br>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </div>);
  }
};

const App = () => {
  const courseName = "Half Stack application development";
  /*
    const courseParts = [
      {
        name: "Fundamentals",
        exerciseCount: 10,
        description: "This is the leisured course part",
        type: "normal"
      },
      {
        name: "Advanced",
        exerciseCount: 7,
        description: "This is the harded course part",
        type: "normal"
      }
  
      ,
      {
        name: "Using props to pass data",
        exerciseCount: 7,
        groupProjectCount: 3,
        type: "groupProject"
      },
      {
        name: "Deeper type usage",
        exerciseCount: 14,
        description: "Confusing description",
        exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
        type: "submission"
      }
  
    ];*/
  return (

    <div>
      <Header name={courseName} />
      <Content />
      <Total />
    </div>
  );
};

export default App;