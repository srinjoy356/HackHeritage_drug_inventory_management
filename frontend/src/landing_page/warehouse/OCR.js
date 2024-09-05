import React, { useState } from 'react';
import './OCR.css'
import Sidebar from '../Sidebar';

const OCR = () => {
    const [fileFormat, setFileFormat] = useState('prescription');
    const [file, setFile] = useState(null);
    const [extractedData, setExtractedData] = useState({});
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleExtract = () => {
        if (!file) {
            alert('Please upload a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file_format', fileFormat);
        formData.append('file', file);

        fetch('/extract_from_doc', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setExtractedData(data);
                setError(null);
            }
        })
        .catch(err => {
            setError('Error occurred while extracting data.');
            console.error('Error:', err);
        });
    };

    const handleSubmit = () => {
        setFile(null);
        setExtractedData({});
        setError(null);
        alert('Data submitted successfully');
    };

    return (
        <>
        <Sidebar/>
        <div className="dash-board">
        
        <div className="container">
            <h1 className='extracter'>Prescription Extractor</h1>
            <form className="uploadForm">
                <label className='form_doc' htmlFor="file_format">Choose Document Type:</label>
                <select 
                className="file_format" 
                    name="file_format"
                    value={fileFormat}
                    onChange={(e) => setFileFormat(e.target.value)}
                >
                    <option value="prescription">Prescription</option>
                    <option value="patient_details">Patient Details</option>
                </select>
                <br/><br/>
                <label htmlFor="file">Upload File:</label>
                <input 
                    type="file" 
                    id="file" 
                    name="file" 
                    accept=".pdf,.jpeg,.jpg"
                    onChange={handleFileChange}
                />
                <br/><br/>
                <button className='extract' type="button" onClick={handleExtract}>Extract</button>
            </form>

            {error && <div className="error">{error}</div>}

            <div id="documentDisplay"></div>

            <div id="extractedData">
                <h2>Extracted Data</h2>
                <div id="dataContainer">
                    {Object.keys(extractedData).length > 0 ? (
                        Object.entries(extractedData).map(([key, value]) => (
                            <div key={key} className="field-container">
                                <label>{key}</label>
                                <input type="text" value={value} readOnly />
                            </div>
                        ))
                    ) : (
                        <p>No data extracted yet.</p>
                    )}
                </div>
            </div>

            <button id="submitButton" onClick={handleSubmit}>Submit</button>
        </div>
        </div>
        </>
    );
};

export default OCR;
