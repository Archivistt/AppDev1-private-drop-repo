import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { db } from "../../firebase"
import { collection, doc, getDocs, addDoc, setDoc } from "firebase/firestore";
import CoordinatorInterface from './CoordinatorInterface.jsx'


function StudentList() {
    const [list, setList] = useState([]);
    const [studentName, setStudentName] = useState('')
    const [companyName, setCompanyName] = useState('')


    let hiddenButton = document.getElementById('hiddenNavButton')

    //FETCHING THE COMPANY LIST FROM FIREBASE
    const fetchCompanyList = async () => {
        const collectionRef = collection(db, 'companyList');
        const querySnapshot = await getDocs(collectionRef);
        const lists = querySnapshot.docs.map((company) => ({
            id: company.id,
            ...company.data()
        }));
        setList(lists);
    }

    //ADDING THE STUDENT AND THE SELECTED COMPANY LIST
    const handleAddForm = async () => {
        const collectionRef = collection(db, 'studentOJT');
        await addDoc(collectionRef, {
            studentName: studentName,
            companyName: companyName
        })
        alert(`${studentName} has been added to the list`)
        setStudentName('');
        setCompanyName('');

        navigate('./Coordinator')
    }
    return (
        <>
            <h1>OJT Application</h1>
            <form>
                <input
                    type="text"
                    name="studentName"
                    id="studentName"
                    placeholder="input name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    style={{ 'marginRight': '10px' }}
                    required />
                <button type="submit" onClick={(e) => {
                    e.preventDefault();
                    fetchCompanyList();
                    document.getElementById('subHeader').innerText = `Select Company, ${studentName}`;
                }}> Submit </button>
            </form>
            <h2 id="subHeader"></h2>
            {
                list.map((company) => (
                    <ul>
                        <li
                            style={{ 'display': 'flex', 'alignItems': 'center' }}
                            key={company.id} >
                            <div style={{ 'paddingRight': '10px' }}>
                                {company.name}
                            </div>
                            <button onClick={() => {
                                hiddenButton.style.display = 'flex';
                                hiddenButton.style.justifyContent = 'center';
                                document.getElementById('subHeader').innerText = `you selected: ${company.name}`;
                                setCompanyName(company.name);
                            }}>Select</button>
                        </li>
                    </ul>
                ))
            }
            
                <div
                    style={{ 'display': 'none' }}
                    id="hiddenNavButton"
                >
                    <button
                        onClick={() => handleAddForm(studentName, companyName)}>
                        Proceed
                    </button>
                </div>
        </>
    )
}

export default StudentList