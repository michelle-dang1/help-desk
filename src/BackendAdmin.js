import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function BackendAdmin() {
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        const getTickets = async () => {
            try {
                const response = await fetch('http://localhost:8000/tickets/')
                const data = await response.json()
                return data['tickets']
            } catch (error) {
                console.error(error.message)
            }
        }
        getTickets()
        .then(ticket => setTickets(ticket))
        .catch(console.error)
    }, [])
    return (
        <div>
            <h2>Help Desk Tickets</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket=>{
                        return (
                        <tr key={ticket.id}>
                            <td>
                            <Link to={`/admin/${ticket.id}`}>
                                    {ticket.name}
                                </Link>
                            </td>
                            <td>{ticket.email}</td>
                            <td>{ticket.description}</td>
                            <td>
                            {ticket.status === 'new' || ticket.status === 'New' ? 'New' :
                            ticket.status === 'in_progress' || ticket.status === 'In Progress' ? 'In Progress' :
                            ticket.status === 'resolved' || ticket.status === 'Resolved' ? 'Resolved' :
                            ticket.status}
                            </td>
                        </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default BackendAdmin
