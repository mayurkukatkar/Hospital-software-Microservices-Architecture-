import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { PatientsPage } from './pages/PatientsPage';
import { Dashboard } from './pages/Dashboard';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';

import { AppointmentsPage } from './pages/AppointmentsPage';
import { EmrPage } from './pages/EmrPage';
import { BillingPage } from './pages/BillingPage';
import { LabPage } from './pages/LabPage';
import { PharmacyPage } from './pages/PharmacyPage';
import { InventoryPage } from './pages/InventoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<PatientsPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="emr" element={<EmrPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="lab" element={<LabPage />} />
            <Route path="pharmacy" element={<PharmacyPage />} />
            <Route path="inventory" element={<InventoryPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
