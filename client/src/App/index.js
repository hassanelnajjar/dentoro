import { Switch, Route, Redirect } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';

import { PrivateRoutes, LoggedOutRoutes } from './Routes';

import './App.css';
import Loading from '../components/common/Loading';

const LoginPage = lazy(() => import('../pages/logIn'));
const Sidebar = lazy(() => import('../components/Sidebar'));
const Calendar = lazy(() => import('../pages/admin/Calendar'));
const PatientProfile = lazy(() => import('../pages/admin/PatientProfile'));
const LandingPage = lazy(() => import('../pages/LandingPage'));

const PatientsAppointmentTable = lazy(() =>
  import('../pages/admin/PatientsAppointmentTable')
);

const Patients = lazy(() => import('../components/Patients'));

const App = () => (
  <div className="App">
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <LoggedOutRoutes exact path="/login">
          <LoginPage />
        </LoggedOutRoutes>
        <PrivateRoutes path="/dashboard">
          <Sidebar>
            <Switch>
              <Route exact path="/dashboard">
                <PatientsAppointmentTable
                  showSearchBar={false}
                  pageTitle="Today's Schedule"
                />
              </Route>
              <Route exact path="/dashboard/calendar">
                <Calendar />
              </Route>
              <Route exact path="/dashboard/calendar/appointmentsearch">
                <PatientsAppointmentTable pageTitle="Patients Appointment Table" />
              </Route>
              <Route exact path="/dashboard/calendar/:appointmentDate">
                <PatientsAppointmentTable pageTitle="Patients Appointment Table" />
              </Route>
              <Route exact path="/dashboard/patients">
                <Patients />
              </Route>
              <Route exact path="/dashboard/patients/:patientId">
                <PatientProfile />
              </Route>
              <Redirect to="/404" />
            </Switch>
          </Sidebar>
        </PrivateRoutes>
        <Route>
          <h1>Error 404 Not Found !!</h1>
        </Route>
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  </div>
);

export default App;
