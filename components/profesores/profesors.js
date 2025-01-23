import React, { useEffect, useState } from 'react';
import Content from './Content';
import Footer from '../components/Footer'
import Header from '../components/Header'

function Profesores() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const res = await fetch(`${"http://localhost:3000"}/tutors/getAll?cacheBuster=${new Date().getTime()}`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
            }
          }
        )
        const data = await res.json();
        setTeachers(data);
        teachers.map((teacher) => {
          teacher.fullName = `${teacher.name} ${teacher.lastName}`;
        });
      } catch (error) {
        console.log(error);
        return [];
      }
    }
    getTeachers();
  }, []);

  return (
    <>
        <Header />
        <Content teachers={teachers} />
        <Footer />
    </>
  )
}

export default Profesores;