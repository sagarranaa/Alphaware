import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { addJob, getJobs, deleteJob } from "../components/actions/jobActions"; // Correct path
import {
  Container,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardContent,
} from "@mui/material";

const AdminPanel = ({ job: { jobs, loading }, addJob, deleteJob }) => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    contract: "",
    location: "",
  });
  const dispatch = useDispatch();
  // const jobList = useSelector((state) => state.jobs.jobList);
  const { company, position, contract, location } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addJob(formData);
    setFormData({ company: "", position: "", contract: "", location: "" });
  };
  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={onSubmit}>
            <TextField
              label="Company"
              name="company"
              value={company}
              onChange={onChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Position"
              name="position"
              value={position}
              onChange={onChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Contract"
              name="contract"
              value={contract}
              onChange={onChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Location"
              name="location"
              value={location}
              onChange={onChange}
              required
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Add Job
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card style={{ marginTop: "20px" }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Contract</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.position}</TableCell>
                  <TableCell>{job.contract}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteJob(job._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  job: state.jobs,
});

export default connect(mapStateToProps, { addJob, deleteJob })(AdminPanel);
