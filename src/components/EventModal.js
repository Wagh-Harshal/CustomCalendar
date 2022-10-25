import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import Modal from "react-modal";
import { createEventId } from './event-utils'

Modal.setAppElement("#root");

const EventModal = forwardRef((props, ref) => {

    const [isOpen, setIsOpen] = useState(false);
    const [hours, setHours] = useState([]);
    const [minutes, setMinutes] = useState([]);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [startHour, setStartHour] = useState();
    const [startMinute, setStartMinute] = useState();
    const [endtHour, setEndHour] = useState();
    const [endMinute, setEndMinute] = useState();
    const [date, setEventDate] = useState();

    useImperativeHandle(ref, () =>
    ({
        showModal(date) {
            setEventDate(date);
            setTitle('');
            setDescription('');
            setIsOpen(!isOpen);
        },
        dismissModal() {
            setIsOpen(!isOpen);
        },
    })
    );

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        let hoursArray = [];
        let minutesArray = [];
        for (let i = 1; i <= 24; i++) {
            hoursArray.push(i <= 9 ? '0' + i : i);
        }
        for (let i = 1; i <= 60; i++) {
            minutesArray.push(i <= 9 ? '0' + i : i);
        }
        setMinutes(minutesArray);
        setHours(hoursArray);
    }, []);

    let handleSubmit = (e) => {        
        if(title != '' && description != ''){
            let id = createEventId();
            props.addEvent({ id, title, description, date, startHour, startMinute, endtHour, endMinute });
            e.preventDefault();
            return true;
        }      
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
                className="mymodal"
                overlayClassName="myoverlay"
                closeTimeoutMS={500}
            >
                <h4>Add Event:</h4>
                <form action="#">
                    <div className="form-group mb-3">
                        <label htmlFor="name">Title:</label>
                        <input className="form-control" placeholder="Enter Title"
                            onChange={(e) => setTitle(e.target.value)} required="required" />
                    </div>
                    <div className="form-group mb-3">
                        <label for="comment">Description:</label>
                        <textarea className="form-control" rows="3" placeholder="Enter Description"
                            onChange={(e) => setDescription(e.target.value)} required="required"></textarea>
                    </div>
                    <div className="form-group mb-3 d-flex">
                        <div>
                            <label htmlFor="email">Start Hour</label>
                            <select className="form-select" onChange={(e) => setStartHour(e.target.value)}>
                                <option value="00">00</option>
                                {
                                    hours.map((hour) => {
                                        return <option key={hour} value={hour}>{hour}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div style={{ marginLeft: 10 }}>
                            <label htmlFor="email">Start Minutes</label>
                            <select className="form-select" onChange={(e) => setStartMinute(e.target.value)}>
                                <option value="00">00</option>
                                {
                                    minutes.map((minute) => {
                                        return <option key={minute} value={minute}>{minute}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div style={{ marginLeft: 10 }}>
                            <label htmlFor="email">End Hour</label>
                            <select className="form-select" onChange={(e) => setEndHour(e.target.value)}>
                                <option value="00">00</option>
                                {
                                    hours.map((hour) => {
                                        return <option key={'end' + hour} value={hour}>{hour}</option>;
                                    })
                                }
                            </select>
                        </div>
                        <div style={{ marginLeft: 10 }}>
                            <label htmlFor="email">End Minutes</label>
                            <select className="form-select" onChange={(e) => setEndMinute(e.target.value)}>
                                <option value="00">00</option>
                                {
                                    minutes.map((minute) => {
                                        return <option key={'end' + minute} value={minute}>{minute}</option>;
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <button onClick={toggleModal} className="btn btn-secondary text-right">Close</button>
                        <button className="btn btn-primary text-right" type="submit"
                            style={{ marginRight: 10 }}
                            onClick={(e) => handleSubmit(e)}>
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )

})

export default EventModal;