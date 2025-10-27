import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_SHIFT } from '../utils/mutations';
import { ALL_SHIFTS } from '../utils/queries';

// interface ShiftFormProps {
//   showModal: boolean;
//   handleClose: () => void;
// }

const ShiftForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    day: '',
    startTime: '',
    endTime: '',
    employee: '',
    status: 'giveaway',
    notes: '',
  });

  const [addShift] = useMutation(ADD_SHIFT, { refetchQueries: [ALL_SHIFTS, 'Shifts'] });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('New Shift:', formData);

      await addShift({
        variables: {
          location: formData.location,
          startTime: formData.startTime,
          endTime: formData.endTime,
          day: formData.day,
          status: formData.status,
          employee: formData.employee || 'Unknown',
          notes: formData.notes || null,
        },
      });

      setFormData({ location: '', day: '', startTime: '', endTime: '', employee: '', status: 'giveaway', notes: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // <Modal show={showModal} onHide={handleClose} centered>
    //   <Modal.Header closeButton>
    //     <Modal.Title>Add New Shift</Modal.Title>
    //   </Modal.Header>

      // <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          {/* Location */}
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Where is the shift?"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Day */}
          <Form.Group className="mb-3">
            <Form.Label>Day</Form.Label>
            <Form.Control
              type="text"
              placeholder="Example: Tuesday"
              // default 
              name="day"
              value={formData.day}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Start Time */}
          <Form.Group className="mb-3">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="text"
              placeholder="Example: 12:00 PM"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* End Time */}
          <Form.Group className="mb-3">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="text"
              placeholder="Example: 6:00 PM"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Employee / Poster */}
          <Form.Group className="mb-3">
            <Form.Label>Employee / Poster</Form.Label>
            <Form.Control
              type="text"
              placeholder="Who posted or who is assigned?"
              name="employee"
              value={formData.employee}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="giveaway">Giveaway</option>
              <option value="trade">Trade</option>
              <option value="pickup">Pickup</option>
            </Form.Select>
          </Form.Group>

          {/* Notes */}
          <Form.Group className="mb-3">
            <Form.Label>Notes (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Any extra details (like who it's for, etc.)"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="outline-secondary" onClick={() => {}}>
              Cancel
            </Button>
            <Button variant="dark" type="submit">
              Add Shift
            </Button>
          </div>
        </Form>
    //   </Modal.Body>
    // </Modal>
  );
};

export default ShiftForm;

