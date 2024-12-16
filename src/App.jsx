import { useState, useEffect } from 'react';
import { db } from './firebase';
import './App.css';
import { collection, doc, getDocs, addDoc, setDoc } from "firebase/firestore";
import studentList from './studentList.json';
import dayEligible from './dayEligible.json';

function App() {
    const [listStudent, setStudentList] = useState([]);
    const [classList, setClassList] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);  // New state for filtered students

    // Fetching the student list from Firestore
    const fetchStudentList = async () => {
        const collectionRef = collection(db, 'studentList');
        const querySnapshot = await getDocs(collectionRef);
        const lists = querySnapshot.docs.map((student) => ({
            id: student.id,
            ...student.data()
        }));
        setStudentList(lists);
    };

    // Fetching the class list from Firestore
    const fetchClassList = async () => {
        const collectionRef = collection(db, 'dayEligible');
        const querySnapshot = await getDocs(collectionRef);
        const classList = querySnapshot.docs.map((element) => ({
            id: element.id,
            ...element.data()
        }));
        setClassList(classList);
    };

    useEffect(() => {
        fetchStudentList();
        fetchClassList();
    }, []);

    // Filter students based on the available courses for the given day
    
    const filteredList = (day) => {

        // Find the class data for the given day
        const eligibleDay = classList.find((classItem) => classItem.id === day);
        console.log(eligibleDay);

        // If there's no data for the selected day, return early
        if (!eligibleDay) {
            console.log(`No classes found for ${day}`);
            return;
        }
        const eligibleDayKeys = Object.keys(eligibleDay);
        console.log(eligibleDayKeys);

        // Collect all course names that are true for the selected day
        const eligibleCourses = eligibleDayKeys
        .filter((courseKey) => eligibleDay[courseKey] === true); // Get the course name like 'class1', 'class2', etc.
        
        console.log(`Eligible courses for ${day}:`, eligibleCourses);

        // Filter students who are enrolled in one of the eligible courses for the day
        const filtered = listStudent.filter((student) => {
            // console.log(`Checking student ${student.name} for course ${student.course}`);
            return eligibleCourses.includes(student.course);  // Match student.course to eligible courses
        });

        console.log(`Filtered students for ${day}:`, filtered);
      
        // Update the state with filtered students
        setFilteredStudents(filtered);
    };

    // Handle the 'Add Students' button
    const handleAddStudents = async () => {
        const promises = studentList.map(async (element) => {
            await addStudentList(element.name, element.LvID, element.course, element.unclaimed);
            console.log(element.name, element.LvID, element.course, element.unclaimed);
        });
        await Promise.all(promises);
        console.log("All students added successfully");
    };

    // Handle the 'Add Classes' button
    const handleAddClass = async () => {
        const promises = dayEligible.map(async (element) => {
            await addClasslist(element.day, element.class1, element.class2, element.class3, element.class4, element.class5, element.class6);
            console.log(element.day, element.class1, element.class2, element.class3, element.class4, element.class5, element.class6);
        });
        await Promise.all(promises);
        console.log("All classes added successfully");
    };

    // Add a student to Firestore
    const addStudentList = async (name, LvID, course, unclaimed) => {
        const collectionRef = collection(db, 'studentList');
        await addDoc(collectionRef, {
            name: name,
            LvID: LvID,
            course: course,
            unclaimed: unclaimed
        });
    };

    // Add a class to Firestore
    const addClasslist = async (day, class1, class2, class3, class4, class5, class6) => {
        const collectionRef = collection(db, 'dayEligible');
        await setDoc(doc(collectionRef, day), {
            class1: class1,
            class2: class2,
            class3: class3,
            class4: class4,
            class5: class5,
            class6: class6
        });
    };

    return (
        <>
            <div>
                <h2>Student List</h2>
                {/* Display filtered students based on their course */}
                {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                        <ul key={student.id}>
                            <li>
                                <div>Student name: {student.name}</div>
                                <div>Student LV ID: {student.LvID}</div>
                                <div>Student course: {student.course}</div>
                                <div>Unclaimed: {student.unclaimed ? "true" : "false"}</div>
                            </li>
                        </ul>
                    ))
                ) : (
                    <p>No students available in selected courses.</p>
                )}
            </div>

            <div>
                <h2>Class List</h2>
                {classList.map((element) => (
                    <ul key={element.id}>
                        <li style={{'listStyle': 'none'}}>
                            <div>Day: {element.id}</div>
                            <div>Class1: {element.class1 ? "true" : "false"}</div>
                            <div>Class2: {element.class2 ? "true" : "false"}</div>
                            <div>Class3: {element.class3 ? "true" : "false"}</div>
                            <div>Class4: {element.class4 ? "true" : "false"}</div>
                            <div>Class5: {element.class5 ? "true" : "false"}</div>
                            <div>Class6: {element.class6 ? "true" : "false"}</div>
                        </li>
                    </ul>
                ))}
            </div>

            <div>
                {/* <button onClick={handleAddStudents}>Add Students</button>
                <button onClick={handleAddClass}>Add Classes</button> */}
                <h2>Filter the List</h2>
                <button onClick={() => filteredList("monday")}>monday</button>
                <button onClick={() => filteredList("tuesday")}>tuesday</button>
                <button onClick={() => filteredList("wednesday")}>wednesday</button>
                <button onClick={() => filteredList("thursday")}>thursday</button>
                <button onClick={() => filteredList("friday")}>friday</button>
                <button onClick={() => filteredList("saturday")}>saturday</button>
            </div>
        </>
    );
}

export default App;
