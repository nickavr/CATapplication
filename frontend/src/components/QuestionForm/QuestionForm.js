import React from 'react';
import Modal from 'react-bootstrap/Modal';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';
// import './QuestionForm.css';

function QuestionForm(props) {
    const handleChange = (newValue, actionMeta) => {
        console.group('Value Changed');
        console.log(newValue);
        // console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };
    const handleInputChange = (inputValue, actionMeta) => {
        console.group('Input Changed');
        console.log(inputValue);
        // console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };
    return (
        <div>
            <Modal
                size="lg"
                show={props.showAddModal}
                onHide={props.handleCloseForm}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add a question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup controlId="addQuestion">
                            <Form.Label>Enter the question text</Form.Label>
                            <Form.Text>
                                E.G "How many bytes does a char have in Java?"
                            </Form.Text>
                            <Form.Control
                                // onChange={e =>
                                //     this.setState(prevState => ({
                                //         formData: {
                                //             ...prevState.formData,
                                //             review_title: e.target.value,
                                //         },
                                //     }))
                                // }
                                type="text"
                                placeholder="Enter question text"
                            ></Form.Control>
                            <Form.Label>
                                Choose an estimated difficulty
                            </Form.Label>
                            <Form.Text>E.G between 1 and 10</Form.Text>
                            <Form.Control
                                // onChange={e =>
                                //     this.setState(prevState => ({
                                //         formData: {
                                //             ...prevState.formData,
                                //             review_title: e.target.value,
                                //         },
                                //     }))
                                // }
                                type="number"
                                placeholder="Enter question difficulty"
                            ></Form.Control>
                        </FormGroup>
                        <Form.Label>Choose a topic or add a new one</Form.Label>
                        <CreatableSelect
                            isClearable
                            onChange={() => handleChange()}
                            onInputChange={() => handleInputChange()}
                            options={[{ label: 'topic1', value: 'topic1' }]}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => props.handleCloseForm()}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        // onClick={() => this.handleEditReview()}
                    >
                        Add question
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default QuestionForm;
