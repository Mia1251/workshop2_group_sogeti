import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PersonService from '../service/PersonService';

const CrudDemo = () => {

    const [persons, setPersons] = useState([]);
    const [message, setMessage] = useState({value: '', type: ''});

    const [reload, setReload] = useState(false);

    // useEffect
    useEffect(() => {
        // call API
        const personService = new PersonService();
        personService.findAll().then((res) => {
            console.log(res);
            if(res.status === 200) {
                setPersons(res.data);
                setMessage({value: "Operation Done!", type: 'success'});
            } else {
                // display error message
                setMessage({value: "Operation Failed!", type: 'danger'});
            }
        });
       // update the state 
    },[reload]);

    const Table = () => {

        const TableHeader = () => {
            return (
                <thead>
                   <tr>
                       <th>Id</th>
                       <th>Name</th>
                       <th>Email</th>
                       <th>Action</th>
                   </tr>
                </thead>
            )
        };

        const TableAction = (props) => {

            const history = useHistory();

            const showData = () => {
                history.push(`/details/${props.id}`);
            }

        return (
        <div>
            <button type='button' className='btn btn-primary' onClick={showData}>Details</button>
            <button type='button' className='btn btn-danger m-2'>Delete</button>
            <button type='button' className='btn btn-warning'>Edit</button>
        </div>
        )
        };

        const TableRow = (props) => {
            return (
                <tbody>
                    {
                    persons.map((person) => (
                        <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.firstName} {person.lastName}</td>
                        <td>{person.email}</td>
                        <td><TableAction /></td>
                        </tr>
                    ))
                    }
                </tbody>
            )
        };
        return (
        <div className='container'>
            <table className='table table-striped'>
                <TableHeader />                
                <TableRow />                
            </table>
        </div>
        );

    };

    const Form = () => {

        const {register, handleSubmit, reset, formState: {errors} } = useForm();

        const savePerson = (data) => {
            console.log(data);
            // call API
            const service = new PersonService();
            service.savePerson(data).then()
        }

    }


    return (
        <div className='container'>
            <Table />
        </div>
    );

};

export default CrudDemo;