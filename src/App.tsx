import React from 'react';

//Headerin renderöintiä varten
const Header = ({ name }: { name: string }) => (
  <h1>{name}</h1>
);

//CourseParts -oliota varten tyyppi
interface ContentProps {
  name: string,
  exerciseCount: number

}

//Arrayta varten tyyppi
interface ContentPropsArray {
  courses: Array<ContentProps>
}


//Contentin renderöinti. Tuodaan "App" -komponentilta data arrayna ja siksi tarvitaan
//toinen interface Array:ta varten.
//HUOM! Vaatii "<div>" -elementin return:ssa
const Content = ({ courses }: ContentPropsArray): JSX.Element => {
  console.log('COURSES', courses)
  {
    return (
      <div>
        {courses.map((course, index) => (<p key={index}>{course.name} {course.exerciseCount}</p>))}
      </div>);
  }

}
//Kurssin harjoitusten kokonaismäärän renderöinti
//hyödynnetään "ContentPropsArray" -interfacea
const Total = ({ courses }: ContentPropsArray): JSX.Element => {
  {
    return (
      <div>
        Number of exercises{" "}
        {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </div>);
  }
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};

export default App;