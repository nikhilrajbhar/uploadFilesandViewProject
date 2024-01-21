import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";

export default function Uploadfile() {

    const [viewFilesRefresh, setviewFilesRefresh] = useState(false);
    const [displayFiles, setdisplayFiles] = useState([]);
    const [filename, setfilename] = useState('')
    const [filecode, setfilecode] = useState('');
    const logindata = useSelector((state) => state?.user);
    const userId = logindata.userdata?._id;
    const username = logindata.userdata?.name;

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`http://localhost:3000/viewFiles?username=${username}`, {
                    method: "GET"
                })
                const finalResponse = await res.json();
                setdisplayFiles(finalResponse?.files)
                console.log(finalResponse);
            } catch (error) {
                console.log(error);
                alert('Something went wrong')
            }
        }
        fetchData();
    }, [viewFilesRefresh]);

    const handleUpload = async (e) => {
        const dataForm = new FormData();
        dataForm.append('file', e.target.files[0]);
        try {
            const res = await fetch(`http://localhost:3000/upload?userId=${userId}&&username=${username}`, {
                method: "POST",
                body: dataForm
            })
            const finalResponse = await res.json();
            if (finalResponse.success == true) {
                alert(`Your uploaded file code is ${finalResponse.code}`)
            }
            console.log(finalResponse);
        } catch (error) {
            console.log(error);
            alert('Something went wrong')
        }
        setviewFilesRefresh(state => !state)

    }

    const handleFileView = async (file) => {
        console.log("view file name", file);
        try {
            const res = await axios(`http://localhost:3000/viewFile?userId=${userId}&&code=${filecode}`, {
                method: "GET",
                responseType: "blob"
            })
            console.log(res);
            if (res?.status == 200) {
                const fileURl = URL.createObjectURL(res?.data);
                const a = document.createElement('a');
                a.href = fileURl;
                a.target = '_blank';
                a.click();
            } else {
                alert("Enter code is wrong")
            }

        } catch (error) {
            console.log(error);
            if (error?.response.status == 404) {
                alert('Enter code is wrong');
            } else {
                alert('Something went wrong');

            }

        }
    }
    const handleDelete = async (file) => { 
        try {
            const res = await fetch(`http://localhost:3000/delete?userId=${userId}&&file=${file}&&username=${username}`, {
                method: "DELETE"
            })
            console.log(res);
            const finalResponse = await res.json();
            if (finalResponse.success == true) {
                alert(`Your file deleted`)
            }

        } catch (error) {
            console.log(error);
            alert('Something went wrong')
        }
        setviewFilesRefresh(state => !state)
    }

    const courseList = displayFiles?.map((file, index) => {
        return (
            <li key={index.toString()} style={{ marginBottom: 20 }}>
                <button type="button" className='btn btn-outline-primary mr-3' data-toggle="modal" data-target="#exampleModal" onClick={() => setfilename(file)}>
                    {file}
                </button>
                <button className='btn btn-danger' onClick={() => handleDelete(file)}> Remove</button>
            </li>
        )
    })

    return (
        <>
            <div className='center2'>
            <div className="form-group">
                <label htmlFor="Uploadfile">Upload File Here</label>
                <input
                    className="form-control"
                    onChange={(e) => handleUpload(e)}
                    type="file"
                />
            </div>
            <div>
                <p class="font-weight-normal">View Uploaded files</p>
                {/* <button className='btn btn-outline-primary' onClick={() => setviewFilesRefresh(state => !state)}>View refresh file</button> */}
                <div className='viewfile'>
                    <ul style={{ marginRight: 20 }}>
                        {courseList}
                    </ul>
                </div>


                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="filecode">{filename}</label>
                                    <input type="number" className="form-control" value={filecode} onChange={(e) => setfilecode(e.target.value)} id="password" maxLength={6} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => handleFileView(filename)}>Enter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>

    )
}
