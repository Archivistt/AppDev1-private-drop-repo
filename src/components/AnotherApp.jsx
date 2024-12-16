import { useState } from 'react';
import CoordinatorInterface from './OJTsample/CoordinatorInterface';
import StudentList from './OJTsample/StudentList';

function AnotherApp() {
    const [pageDisplay, setPageDisplay] = useState(0);

    const handleStudentClick = () => {
        setPageDisplay(0);
    };

    const handleCoordinatorClick = () => {
        setPageDisplay(1);
    };

    return (
        <>
            <div style={{ display: 'flex' }}>
                <button onClick={handleStudentClick}>Student</button>
                <button onClick={handleCoordinatorClick}>Coordinator</button>
            </div>
            {pageDisplay === 0 && <StudentList />}
            {pageDisplay === 1 && <CoordinatorInterface />}
        </>
    );
}

export default AnotherApp;