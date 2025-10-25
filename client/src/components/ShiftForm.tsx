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
    timeRange: '',
    status: 'giving',
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
          day: formData.day,
          timeRange: formData.timeRange,
          status: formData.status,
          notes: formData.notes,
        },
      });

      setFormData({ location: '', day: '', timeRange: '', status: 'giving', notes: '' });
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
              required
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
              required
            />
          </Form.Group>

          {/* Time Range */}
          <Form.Group className="mb-3">
            <Form.Label>Time Range</Form.Label>
            <Form.Control
              type="text"
              placeholder="Example: 12:00 PM – 6:00 PM"
              name="timeRange"
              value={formData.timeRange}
              onChange={handleInputChange}
              required
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
              <option value="giving">Giving Away</option>
              <option value="picking">Picking Up</option>
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

