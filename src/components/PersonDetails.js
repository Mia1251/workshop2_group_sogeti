import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import PersonService from '../service/PersonService';

const PersonDetails = () => {
    const params = useParams();
    const [person, setPerson] = useState({id: 0, firstName: '', lastName: '', email: '', title: ''});
    const [message, setMessage] = useState({value: '', type: ''});
    const history = useHistory()

    useEffect(() => {
        const personService = new PersonService();
        personService.getPersonById(params.id).then(res => {
            // update state
            console.log("PERSON:", res);
            if (res.status === 200) {
                console.log(res.data);
                setPerson(res.data);
            } else {
                setMessage({value: 'API ERROR: ' + res.status, type: 'danger'})
            }
        });
    }, []);

    return (
        <div className='container'>
            <div className='col-6'>
                {message && <div className={'alert alert-' + message.type} >{message.value}</div>}
                <div className='card'>
                <div className='card-header bg-info text-white'>
                    Person Information
                </div>
                <div className='card-body'>
                    <h4 className='card-title'>{person.title}</h4>
                    <p className='card-text'>ID: {person.id}</p>
                    <p className='card-text'>Name: {person.firstName} {person.lastName}</p>
                    <p className='card-text'>Email: {person.email}</p>
                </div>
                <div className='card-footer bg-dark'>
                    <button className='btn btn-outline-danger' onClick={()=> history.push('/crud')}>Back</button>
                </div>
                </div>
            </div>
            
        </div>
    );
};

export default PersonDetails;