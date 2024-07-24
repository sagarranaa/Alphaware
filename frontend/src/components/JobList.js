import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getJobs } from "../components/actions/jobActions"; // Correct path
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";

const JobList = ({ getJobs, job: { jobs, loading } }) => {
  useEffect(() => {
    getJobs();
  }, [getJobs]);

  return (
    <Container>
      <Typography variant="h4">Job Listings</Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} lg={4} key={job._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{job.company}</Typography>
                <Typography variant="body2">{job.position}</Typography>
                <Typography variant="body2">{job.contract}</Typography>
                <Typography variant="body2">{job.location}</Typography>
                <Button variant="contained" color="primary">
                  Apply
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  job: state.jobs,
});

export default connect(mapStateToProps, { getJobs })(JobList);
