import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../components/actions/authActions"; // Correct path
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Button color="inherit" onClick={logout}>
      Logout
    </Button>
  );

  const guestLinks = (
    <>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
      <Button color="inherit" component={Link} to="/signup">
        Signup
      </Button>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Job App
        </Typography>
        {!loading && (isAuthenticated ? authLinks : guestLinks)}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
