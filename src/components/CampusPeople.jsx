import React from 'react'
import PeopleCard from './PeopleCard';
const CampusPeople = () => {
     const people = [
    {
      name: "Mohd Belal Naim",
      designation: "Full Stack Engineer",
      avatar: "https://via.placeholder.com/50",
      skills: ["React", "Node.js", "JavaScript", "CSS"],
    },
    {
      name: "John Doe",
      designation: "Backend Developer",
      avatar: "https://via.placeholder.com/50",
      skills: ["Python", "Django", "SQL"],
    },
    {
      name: "Jane Smith",
      designation: "UI/UX Designer",
      avatar: "https://via.placeholder.com/50",
      skills: ["Figma", "Sketch", "Adobe XD"],
    },
    {
      name: "Jane Smith",
      designation: "UI/UX Designer",
      avatar: "https://via.placeholder.com/50",
      skills: ["Figma", "Sketch", "Adobe XD"],
    },
    {
      name: "Mohd Belal Naim",
      designation: "Full Stack Engineer",
      avatar: "https://via.placeholder.com/50",
      skills: ["React", "Node.js", "JavaScript", "CSS"],
    },
    {
      name: "John Doe",
      designation: "Backend Developer",
      avatar: "https://via.placeholder.com/50",
      skills: ["Python", "Django", "SQL"],
    },
    {
      name: "Jane Smith",
      designation: "UI/UX Designer",
      avatar: "https://via.placeholder.com/50",
      skills: ["Figma", "Sketch", "Adobe XD"],
    },
    {
      name: "Jane Smith",
      designation: "UI/UX Designer",
      avatar: "https://via.placeholder.com/50",
      skills: ["Figma", "Sketch", "Adobe XD"],
    },
    {
      name: "Mohd Belal Naim",
      designation: "Full Stack Engineer",
      avatar: "https://via.placeholder.com/50",
      skills: ["React", "Node.js", "JavaScript", "CSS"],
    },
    {
      name: "John Doe",
      designation: "Backend Developer",
      avatar: "https://via.placeholder.com/50",
      skills: ["Python", "Django", "SQL"],
    },
    {
      name: "Jane Smith",
      designation: "UI/UX Designer",
      avatar: "https://via.placeholder.com/50",
      skills: ["Figma", "Sketch", "Adobe XD"],
    },
    {
      name: "Jane Smith",
      designation: "UI/UX Designer",
      avatar: "https://via.placeholder.com/50",
      skills: ["Figma", "Sketch", "Adobe XD"],
    },  
    {
      name: "Mohd Belal Naim",
      designation: "Full Stack Engineer",
      avatar: "https://via.placeholder.com/50",
      skills: ["React", "Node.js", "JavaScript", "CSS"],
    },
    {
      name: "John Doe",
      designation: "Backend Developer",
      avatar: "https://via.placeholder.com/50",
      skills: ["Python", "Django", "SQL"],
    },
    {
      name: "Jane Smith",
      designation: "UI/UX Designer",
      avatar: "https://via.placeholder.com/50",
      skills: ["Figma", "Sketch", "Adobe XD"],
    },
    {
      name: "Jane Smith",
      designation: "UI/UX Designer",
      avatar: "https://via.placeholder.com/50",
      skills: ["Figma", "Sketch", "Adobe XD"],
    },
  ];
  return (
    <div>
      <div className="">
            <div className="font-bold text-lg py-2">
              People in Integral university
            </div>
            <div className="grid lg:grid-cols-2 gap-2 md:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-1">
              {people.map((person, index) => (
                <PeopleCard
                  key={index}
                  name={person.name}
                  designation={person.designation}
                  avatar={person.avatar}
                  skills={person.skills}
                />
              ))}
            </div>
            
          </div>
    </div>
  )
}

export default CampusPeople
