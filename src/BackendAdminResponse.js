import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BackendAdminResponse() {
    const { id } = useParams();
    const [ticket, setTicket] = useState('');
    const [responseText, setResponseText] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/tickets/${id}`);
                const data = await response.json();
                setTicket(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchTicketDetails();
    }, [id]);

    function handleResponseChange(event) {
        const value = event.target.value;
        setResponseText(value)
    }

    function handleStatus(event) {
        const value = event.target.value;
        setStatus(value)
    }

    const formatStatus = (status) => {
        switch (status) {
            case 'new':
                return 'New';
            case 'in_progress':
                return 'In Progress';
            case 'resolved':
                return 'Resolved';
            default:
                return status;
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8000/tickets/${id}/response/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    response_text: responseText,
                }),
            });
            if (response.ok) {
                console.log('“Would normally send email here with body: ', responseText);
            } else {
                console.error('Failed to submit response');
            }
        } catch (error) {
            console.error(error.message);
        }
        // Delay reload by 1 second so the console.log message can be seen
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    };

    const handleChangeStatus = async () => {
        try {
            const response = await fetch(`http://localhost:8000/tickets/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: status,
                }),
            });
            if (response.ok) {
                console.log('Status updated successfully');
                window.location.reload();
            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className='container mt-5'>
            <div className='card'>
                <div className="card-header">
                    <h2>{ticket.name}</h2>
                </div>
                <div className='card-body'>
                    <p className="card-text"><strong>Email:</strong> {ticket.email}</p>
                    <p className="card-text"><strong>Description:</strong> {ticket.description}</p>
                    <p className="card-text">
                        <strong>Status: </strong>
                        {formatStatus(ticket.status)}
                    </p>

                    <h3>Write a Response</h3>
                    <textarea onChange={handleResponseChange} className='form-control' id="handleResponseChange" rows="4" cols="50" style={{ marginBottom: '15px' }} />
                    <button onClick={handleSubmit} className="btn btn-primary fw-bold fs border border-dark border-2 rounded " id="button" style={{ backgroundColor: '#D36D6D', color: '#FFFFFF', marginBottom: '10px' }} >Submit Response</button>

                    <h3>Change Status</h3>
                    <select onChange={handleStatus} className="form-select mb-3" id="handleStatus">
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                    <button onClick={handleChangeStatus} className="btn fw-bold fs border border-dark border-2 rounded" id="button" style={{ backgroundColor: '#D36D6D', color: '#FFFFFF' }} >Update Status</button>
                </div>
            </div>
        </div>
    );
}
export default BackendAdminResponse
