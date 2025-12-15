# Domain Model (DDD Strategy)

## 1. Bounded Contexts
We identify the following bounded contexts, which map 1:1 to our microservices.

### A. Identity & Access Context
- **Responsibility:** Authentication, User Management, Role Authorization.
- **Aggregates:** `User`, `Role`, `Permission`.

### B. Patient Context
- **Responsibility:** Managing patient demographics and master index.
- **Aggregates:** 
    - `Patient` (Root): Name, DOB, Contact, MRN (Medical Record Number).
    - `NextOfKin`: Emergency contact.

### C. Clinical Context (EMR)
- **Responsibility:** Managing medical history and consultation notes.
- **Aggregates:**
    - `MedicalRecord`: The longitudinal record of a patient.
    - `Visit` (Root): Represents a single consultation session.
    - `Prescription`: List of meds prescribed in a visit.
    - `Diagnosis`: ICD-coded condition identified.

### D. Scheduling Context
- **Responsibility:** Managing doctor time and appointments.
- **Aggregates:**
    - `Appointment` (Root): Time, Status, Type.
    - `DoctorSchedule`: Availability blocks.

### E. Diagnostic Context (Lab)
- **Responsibility:** Processing test orders and results.
- **Aggregates:**
    - `LabOrder` (Root): Request for tests.
    - `Sample`: Physical specimen tracking.
    - `TestResult`: The outcome data.

### F. Billing Context
- **Responsibility:** Financial transactions.
- **Aggregates:**
    - `Invoice` (Root): Line items for services rendered.
    - `Payment`: Record of transaction.
    - `InsuranceClaim`: Workflow for payer interaction.

## 2. Event Storming (Key Integration Events)

| Producer Context | Event Name | Consumer Contexts | Purpose |
| :--- | :--- | :--- | :--- |
| **Patient** | `PatientRegistered` | EMR, Billing, Notification | Create empty med record, Open wallet, Welcome SMS. |
| **Scheduling** | `AppointmentBooked` | Notification, Doctor | SMS confirmation, Calendar update. |
| **Clinical** | `PrescriptionIssued` | Pharmacy, Notification | Notify pharmacy to prepare meds. |
| **Clinical** | `LabOrderCreated` | Lab, Billing | Queue lab request, Add charge to draft bill. |
| **Lab** | `LabResultVerified` | EMR, Notification | Update medical record, Notify doctor/patient. |
| **Billing** | `PaymentReceived` | Notification, Audit | Receipt generation. |

## 3. Ubiquitous Language mappings
- **MRN:** Medical Record Number (Unique Patient ID).
- **Visit:** A single encounter with a doctor.
- **Encounter:** Generic term for Visit/Admission.
- **Triage:** Initial assessment (Vitals).
- **Dispense:** Act of giving medicine to patient.
