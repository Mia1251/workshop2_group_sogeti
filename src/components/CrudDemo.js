import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
            } else {
                // display error message
                setMessage({value: "API Error!" + res.status, type: 'danger'});
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

            const deleteById = () => {
                const service = new PersonService();
                service.deletePersonById(props.id).then(res => {
                    if (res.status === 204 || res.status === 202) {
                        setMessage({value: 'Person with id: ' + props.id + ' successfully deleted!', type: 'info'});
                        setReload(!reload);
                    } else {
                        setMessage({value: 'API Error: ' + res.status, type: 'danger'});
                    }
                });
            }


        return (
        <div>
            <button type='button' className='btn btn-primary' onClick={showData}>Details</button>
            {/* <button type='button' className='btn btn-danger m-2' onClick={deleteById}>Delete</button> */}
            { <button type='button' className='btn btn-danger m-2' onClick={() => { if (window.confirm('Are you sure you wish to delete this person?')) deleteById()} }>Delete</button> }
            <button type='button' className='btn btn-warning' onClick={()=>history.push("/edit")}>Edit</button>
        </div>
        )
        };

        const TableRow = () => {
            return (
                <tbody>
                    {
                    persons.map((person) => (
                        <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.firstName} {person.lastName}</td>
                        <td>{person.email}</td>
                        <td><TableAction id = {person.id} /></td>
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

        const savePerson = async (data) => {
            console.log(data);
            // call API
            const service = new PersonService();
            service.savePerson(data).then(res => {
                if (res.status === 201) {
                    setMessage({value: 'Created Person with Id '+ res.data.id + ' is Done!', type: 'success'});
                    setReload(!reload);
                } else {
                    setMessage({value: 'API Error: ' + res.status})
                }
            });
        }


        return(
            <Fragment>
                <form className='form-control m-2 p-3' onSubmit={handleSubmit(savePerson)} >
                    <div className='row mb-3'>
                        <div className='col-6'>
                            <input type="text" className='form-control' {...register('firstName', {required: true})} placeholder='Enter FirstName'/>
                            {errors.firstName && <span className='text-danger'>First Name is required!</span>}
                        </div>
                        <div className='col-6'>
                            <input type="text" className='form-control' {...register('lastName', {required: true})} placeholder='Enter LastName'/>
                            {errors.lastName && <span className='text-danger'>LastName is required!</span>}
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col'>
                            <input type="text" className='form-control' {...register('email', {required: true})} placeholder='Enter Email'/>
                            {errors.email && <span className='text-danger'>Email is required!</span>}
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col'>
                            <input type="text" className='form-control' {...register('title')} placeholder='Enter Title' />
                        </div>
                    </div>
                    <button type='submit' className='btn btn-success'>Add</button>
                    <button type='button' className='btn btn-danger m-1' onClick={() => reset()}>Reset</button>
                </form>
            </Fragment>
        );

    }


    return (
        <div className='container'>
            {message && <div className={'alert alert-' + message.type}>{message.value}</div>}
            <Form />
            <Table />
        </div>
    );

};

export default CrudDemo;