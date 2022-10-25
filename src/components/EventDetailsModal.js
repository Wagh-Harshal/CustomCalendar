import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Modal from "react-modal";

Modal.setAppElement("#root");

const EventDetailsModal = forwardRef((props, ref) => {

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [startHour, setStartHour] = useState();
    const [startMinute, setStartMinute] = useState();
    const [endtHour, setEndHour] = useState();
    const [endMinute, setEndMinute] = useState();
    const [date, setEventDate] = useState();

    useImperativeHandle(ref, () =>
        ({
            showModal({ title, description, date, startHour, startMinute, endtHour, endMinute }) {
                setTitle(title);
                setDescription(description);
                setStartHour(startHour);
                setStartMinute(startMinute);
                setEndHour(endtHour);
                setEndMinute(endMinute);
                setEventDate(date);
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
                <h4>Event Details:</h4>                
                <div className="form-group row col-sm-12 mb-3">
                    <label className="col-sm-3">
                        Title:
                    </label>
                    <span className="col-sm-9">{title}</span>
                </div>
                <div className="form-group row col-sm-12 mb-3">
                    <label className="col-sm-3">
                        Description:
                    </label>
                    <span className="col-sm-9">{description}</span>
                </div>
                <div className="form-group row col-sm-12 mb-3">
                    <label className="col-sm-3">
                        Date:
                    </label>
                    <span className="col-sm-9">{date}</span>
                </div>
                <div className="form-group row col-sm-12 mb-3">
                    <label className="col-sm-3">
                        Start Time:
                    </label>
                    <span className="col-sm-9">{startHour} : {startMinute}</span>
                </div>
                <div className="form-group row col-sm-12 mb-3">
                    <label className="col-sm-3">
                        End Time:
                    </label>
                    <span className="col-sm-9">{endtHour} : {endMinute}</span>
                </div>
                
                <div className="form-group mb-3">
                    <button onClick={toggleModal} className="btn btn-secondary text-right">Close</button>
                </div>
            </Modal>
        </div>
    )
})

export default EventDetailsModal;