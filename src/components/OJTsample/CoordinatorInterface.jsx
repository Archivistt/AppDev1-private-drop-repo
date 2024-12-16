import { useState, useEffect } from "react"
import { db } from "../../firebase"
import { collection, doc, getDocs, addDoc, setDoc } from "firebase/firestore";

function CoordinatorInterface() {
    const [infoList, setInfoList] = useState([])

    const fetchList = async () => {
        const collectionRef = collection(db, 'studentOJT');
        const querySnapshot = await getDocs(collectionRef);
        const infoList = querySnapshot.docs.map((info) => ({
            id: info.id,
            ...info.data()
        }))
        setInfoList(infoList)
        console.log(infoList)
    }

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <>
            <h1>
                Coordinator Interface
            </h1>
            <div
                style={{
                    'display': 'flex',
                    'justifyContent': 'space-evenly'
                }}>
                <div>Student Name</div>
                <div>Company Name</div>
            </div>
            {
                infoList.length > 0 && (
                    <ul>
                        {infoList.map((info, index) => (
                            <li
                                key={index} // Use a unique key for each list item
                                style={{
                                    listStyle: 'none',
                                    border: '1px solid black'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly'
                                    }}
                                >
                                    <div>{info.studentName}</div>
                                    <div>{info.companyName}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )
            }
        </>
    )
}

export default CoordinatorInterface