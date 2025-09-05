import React, { useState } from 'react'

const Register = () => {
    let [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        course: "",
        gender: "",
        address: "",
        Phnumber: "",
        age: undefined,
        file: null
    });
    let { firstName, lastName, course, address, gender, age, file } = formData;
    let handleOnchange = (e) => {
        let { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
    let handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({...formData})
    }
    let handleFile = (e) => {
        let {name,files}=e.target;
        setFormData({...formData,[name]:files[0]})
    }
    return (
        <>
            <div>
                <section>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='firstName'>First Name</label>
                            <input id='firstName' type='text' name='firstName' value={firstName} onChange={handleOnchange} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id='lastName' name='lastName' value={lastName} onChange={handleOnchange} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="course">Course :</label>
                            <select id='course' name='course' value={course} onChange={handleOnchange}>
                                <option value="Java Full Stack">Java Full Stack</option>
                                <option value="Python Full Stack">Python Full Stack</option>
                                <option value="Dot Net Full Stack">Dot net full Stack</option>
                                <option value="AI Developer">AI Developer</option>
                            </select>
                        </div >
                        <div className='form-group'>
                            <label htmlFor="gender">Gender :</label>
                            <input type="radio" name='gender' value="Male" onChange={handleOnchange} checked={formData.gender ==='Male'} />Male
                            <input type="radio" name='gender' value="Female" onChange={handleOnchange} checked={formData.gender ==='Female'} />Female
                            <input type="radio" name='gender' value='Others' onChange={handleOnchange} checked={formData.gender ==='Others'} />Others
                        </div>
                        <div className='form-group'>
                            <label>Address</label>
                            <textarea name='address' value={address} onChange={handleOnchange} rows={4} cols={40}></textarea>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="age">Select Age</label>
                            <input type="number" name='age' value={age} onChange={handleOnchange} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="file"> File :</label>
                            <input type="file" name='file' onChange={handleFile} id='file' />
                        </div>
                        <div className='form-group'>
                            <input type="submit" name="" id="" />
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}

export default Register