import { useState } from 'react'

function MainPage() {
    const [ticket, setTicket] = useState({
        name: "",
        email: "",
        description: "",
    })

    function handleNameChange(event) {
        const value = event.target.value;
        setTicket({...ticket, name: value})
    }

    function handleEmailChange(event) {
        const value = event.target.value;
        setTicket({...ticket, email: value})
    }

    function handleDescriptionChange(event) {
        const value = event.target.value;
        setTicket({...ticket, description: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...ticket}

        const ticketUrl = 'http://localhost:8000/tickets/';
        const fetchConfig = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }

        const response = await fetch(ticketUrl, fetchConfig);
        if (response.ok) {
            const newTicket = await response.json();
            window.location.reload(false);
        }
    };

    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Submit a Help Desk Ticket</h1>
                <form onSubmit={handleSubmit} id="submit-help-desk-ticket">
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} value={ticket.name} placeholder="Enter Name" required type="text" name="name" id="name" className="form-control" autoComplete="on" />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleEmailChange} value={ticket.email} placeholder="email" required type="text" name="email" id="email" className="form-control" autoComplete="on" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleDescriptionChange} value={ticket.description} placeholder="description" required type="text"  name="description" id="description" className="form-control" autoComplete="on"/>
                    <label htmlFor="description">Description</label>
                </div>
                <button className="btn" style={{ backgroundColor: '#D36D6D', color: '#FFFFFF' }}>Submit</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default MainPage;
