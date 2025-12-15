# Product Requirements Document (PRD) - Raksha HMS

## 1. Stakeholders & Actors
| Actor | Role Description | Key Responsibilities |
| :--- | :--- | :--- |
| **Admin** | System Administrator | User management, Configuration, Role assignment, Audit review. |
| **Doctor** | Medical Practitioner | View appointment, diagnosis, prescribe meds/tests, update EMR. |
| **Nurse** | Nursing Staff | Vitals check, patient monitoring, bed management, medicine administration. |
| **Patient** | Healthcare Consumer | Book appointments, view history, download reports, pay bills. |
| **Receptionist** | Front Desk | Patient registration, scheduling appointments, check-in. |
| **Lab Technician** | Laboratory Staff | Collect samples, perform tests, upload reports. |
| **Pharmacist** | Pharmacy Staff | Dispense medicines, check inventory, billing for meds. |
| **Billing Officer** | Finance Staff | Generate invoices, process insurance claims, manage payments. |
| **Inventory Mgr** | Supply Chain | Procurement, stock management, vendor management. |

---

## 2. Epics & Features

### Epic 1: Patient Management (Patient 360)
- **Feature 1.1: Registration:** Walk-in and online registration with unique MRN (Medical Record Number).
- **Feature 1.2: Profile Management:** Demographics, Next of Kin, Insurance details.
- **Feature 1.3: Patient Portal:** View visit history, upcoming appointments.

### Epic 2: Clinical Care (EMR & CPOE)
- **Feature 2.1: Doctor Console:** Queue management, Quick patient lookup.
- **Feature 2.2: Clinical Notes:** Chief complaints, Diagnosis (ICD-10 support), Prescriptions, Allergies.
- **Feature 2.3: Order Entry (CPOE):** Order Lab tests, Radiology, Procedures.
- **Feature 2.4: Vitals Charting:** Graphical view of BP, Pulse, Temp over time.

### Epic 3: Appointment & Scheduling
- **Feature 3.1: Slot Management:** Doctor availability, Leave management.
- **Feature 3.2: Booking:** Slot selection, Rescheduling, Cancellation.
- **Feature 3.3: Queue Management:** Live status display (Waiting, In-Consultation).

### Epic 4: Diagnostics (LIS - Lab Information System)
- **Feature 4.1: Internal Order Processing:** Receive orders from doctors.
- **Feature 4.2: Sample Collection:** Barcode generation, Status tracking (Collected, In-Progress).
- **Feature 4.3: Result Entry:** Manual entry or Machine Interface (future scope).
- **Feature 4.4: Report Generation:** PDF Reports with digital sign.

### Epic 5: Pharmacy Management
- **Feature 5.1: Prescription Fulfillment:** View digital prescriptions, Dispense logic.
- **Feature 5.2: Inventory Sync:** Auto-deduct stock upon dispensing.
- **Feature 5.3: POS (Point of Sale):** Cash/Card billing for walk-in pharmacy sales.

### Epic 6: Billing & Insurance
- **Feature 6.1: Service Charge Master:** Price list for consultations, tests, rooms.
- **Feature 6.2: Invoicing:** Consolidated bill (Consultation + Lab + Pharmacy + Bed).
- **Feature 6.3: Insurance Claims:** Pre-auth forms, Claim submission status.
- **Feature 6.4: Settlements:** Payment gateways, Partial payments, Refunds.

### Epic 7: Administration & Security
- **Feature 7.1: RBAC:** Granular permission sets (e.g., "Nurse can View EMR" but "Cannot Edit Diagnosis").
- **Feature 7.2: Audit Logs:** Immutable log of WHO did WHAT and WHEN.

---

## 3. Non-Functional Requirements (NFRs)

### 3.1 Security & Compliance
- **Authentication:** OAuth2 / OpenID Connect (OIDC).
- **Authorization:** Fine-grained Role-Based Access Control (RBAC).
- **Auditability:** Hibernate Envers for entity versioning; dedicated Audit Service for access logs.
- **Data Privacy:** PII redaction in logs; Encryption at rest (AES-256) and in transit (TLS 1.2+).
- **Session Management:** Auto-logout after inactivity; JWT rotation.

### 3.2 Reliability & Availability
- **Uptime:** 99.9% availability during business hours.
- **Resiliency:** Circuit breakers (Resilience4j) for all unified service calls.
- **Data Consistency:** Eventual consistency for diverse models (using Kafka); Strong consistency for Inventory/Billing.

### 3.3 Performance
- **Response Time:** API latency < 200ms for 95th percentile.
- **Throughput:** Support 50 concurrent internal users initially.

### 3.4 Scalability
- **Horizontal Scaling:** All microservices must be stateless and containerized.
- **Database:** Database per service pattern to allow independent scaling.

---

## 4. Assumptions & Constraints
- **Assumptions:**
    - Hospital has stable internet connectivity.
    - User devices are modern (Chrome/Edge browsers).
- **Constraints:**
    - "Soft Delete" only for all medical records. No physical deletion allowed.
    - Stack is strictly Java Spring Boot + React.
