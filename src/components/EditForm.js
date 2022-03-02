import React from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import PersonService from '../service/PersonService';


const EditForm = () => {
    const history=useHistory();

    const params = useParams();

    const service = new PersonService();
    service.updatePerson(params.id).then((res) => {
        console.log("EDIT PERSON" ) // TODO
    })

    return (
        <div className='container'>
            <div className='col-xl-12 col-sm-10 offset-sm-1 p-sm-5'>
                <form className='form-control'>
                    <div className='panel-body text-center text-black'>
                    <h2 className='flexi shadow border-b'> EDIT FORM</h2>
                    </div>

                    <div className='row mb-2'>

                    <div className='col-sm-9 m-auto'>
                        <input type="text"  className='form-control'></input>
                    </div>
                    <div className='col-sm-9 m-auto'>
                        <input type="text"  className='form-control'></input>
                    </div>
                    <div className='col-sm-9 m-auto'>
                        <input type="text"  className='form-control'></input>
                    </div>
                    <div className='col-sm-9 m-auto'>
                        <input type="text"  className='form-control'></input>
                    </div>
                
                    </div>
                <div className='col-sm-2-m-auto'>
                    <button type='button'className='btn btn-success'>Update</button>
                    <button type='button'className='btn btn-danger m-2'onClick={()=>history.goBack()}>Cancel</button>
                </div>
                </form>

            </div>
            
        </div>
    );
};

export default EditForm;