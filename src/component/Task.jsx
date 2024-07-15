import React, { useEffect, useState } from 'react'


const Task = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [addData, setAddData] = useState({
        username: "",
        email: "",
        password: "",
        phone_number: "",
        dob: "",
        gender: "",

    })

    const [displayData, setDisplayData] = useState([])
    const [selectedData, setSelectedData] = useState('')

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('form-data'));

        if (data) {
            setDisplayData(data)
        }
    }, [])

    useEffect(() => {
        if (displayData?.length) {
            localStorage.setItem('form-data', JSON.stringify(displayData))
        }
    }, [displayData])

    const handleChange = (e) => {
        setAddData({ ...addData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
            id: Date.now(),
            ...addData
        }

        setDisplayData([...displayData, formData])

        console.log(addData)
    }

    const handleOpen = (id) => {
        setIsOpen(!isOpen)
        setSelectedData(id)
    }
    return (
        <div className=' w-full h-full mt-[2rem]'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center space-y-4'>
                <input
                    type="text"
                    name='username'
                    placeholder='Enter username'
                    value={addData.username}
                    onChange={handleChange}
                    className='border-2 border-slate-900 py-3 px-4 rounded-sm'
                />

                <input
                    type="email"
                    name='email'
                    placeholder='Enter email'
                    value={addData.email}
                    onChange={handleChange}
                    className='border-2 border-slate-900 py-3 px-4 rounded-sm'
                />

                <input
                    type="password"
                    name='password'
                    placeholder='Enter password'
                    value={addData.password}
                    onChange={handleChange}
                    className='border-2 border-slate-900 py-3 px-4 rounded-sm'
                />

                <input
                    type="number"
                    name='phone_number'
                    placeholder='Enter phone number'
                    value={addData.phone_number}
                    onChange={handleChange}
                    className='border-2 border-slate-900 py-3 px-4 rounded-sm'
                />

                <input
                    type="date"
                    name='dob'
                    placeholder='Enter birth date'
                    value={addData.dob}
                    onChange={handleChange}
                    className='border-2 border-slate-900 py-3 px-4 rounded-sm'
                />


                <select
                    name="gender"
                    value={addData.gender}
                    onChange={handleChange}
                    className='py-[0.6rem] px-[1rem] border border-black'
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>


                <button
                    type='submit'
                    className='py-3 px-7 border border-slate-500 cursor-pointer text-xl'
                >
                    Submit
                </button>
            </form>


            {/* display the data */}

            <div
                className='mt-[2rem] w-full flex items-center justify-center cursor-pointer'

            >
                {
                    displayData.map((item, index) => (
                        <div
                            key={index}
                            className='flex items-center flex-row w-[15rem] py-[1rem] px-[2rem] justify-center shadow-lg mx-4'
                            onClick={() => handleOpen(item)}
                        >
                            <div>
                                <p className='text-2xl'>{item.username}</p>
                                <p className='mt-4'>{item.dob}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Each item model */}

            {
                isOpen && (
                    <div className='fixed inset-0 bg-gray-600 bg-opacity-55 outline-0 flex items-center justify-center'>
                        <div className='relative bg-white shadow-md space-y-4 py-[1rem] border-2 border-black px-[4rem] flex flex-col items-start '>
                            <p className=' font-semibold text-black'>{`${selectedData.username}`}</p>
                            <p className=' font-semibold text-black'>{selectedData.email}</p>
                            <p className=' font-semibold text-black'>{selectedData.phone_number}</p>
                            <p className=' font-semibold text-black'>{selectedData.dob}</p>
                            <p className=' font-semibold text-black'>{selectedData.gender}</p>
                            <button
                                onClick={handleOpen}
                                className='py-[.6rem] px-[1.5rem] text-xl border border-black font-medium'
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )


            }
        </div>


    )
}

export default Task
