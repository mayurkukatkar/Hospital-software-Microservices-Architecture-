# System Architecture - Raksha HMS

## 1. High-Level Architecture

The system follows a **Microservices Architecture** utilizing **Event-Driven Design** for decoupling complex workflows.

```mermaid
graph TD
    Client[Web/Mobile Clients] -->|HTTPS| Gateway[API Gateway (Spring Cloud Gateway)]
    
    subgraph "Core Infrastructure"
        Gateway --> Auth[Identity Service (IAM)]
        Gateway --> Discovery[Service Registry (Eureka)]
        Gateway --> Config[Config Server]
    end

    subgraph "Business Microservices"
        Gateway --> Patient[Patient Service]
        Gateway --> Appt[Appointment Service]
        Gateway --> EMR[EMR Service]
        Gateway --> Lab[Lab Service]
        Gateway --> Pharmacy[Pharmacy Service]
        Gateway --> Billing[Billing Service]
        Gateway --> Inventory[Inventory Service]
    end

    subgraph "Async / Event Bus"
        Patient -->|PatientRegistered| Kafka((Apache Kafka))
        Appt -->|ApptBooked| Kafka
        Lab -->|ResultsReady| Kafka
        Kafka --> Notif[Notification Service]
        Kafka --> Audit[Audit Service]
        Kafka --> Analytics[Reporting Service]
    end

    subgraph "Data Layer"
        Patient -.-> DB_Pat[(PostgreSQL)]
        EMR -.-> DB_EMR[(MongoDB)]
        Lab -.-> DB_Lab[(PostgreSQL)]
        Billing -.-> DB_Bill[(PostgreSQL)]
    end
```

## 2. Infrastructure Components
- **API Gateway:** Entry point, Routing, Rate Limiting, CORS.
- **Service Registry:** Dynamic discovery of microservices instances.
- **Config Server:** Centralized configuration management.
- **Auth Service:** Centralized authentication (JWT issuance).

## 3. Communication Patterns
- **Synchronous (REST):** Used for user-facing reads and writes where immediate feedback is required (e.g., "Create Appointment").
- **Asynchronous (Kafka):** Used for side effects and eventual consistency.
    - *Example:* When `Appointment Created` -> Publish Event -> `Notification Service` sends SMS + `Audit Service` logs action.

## 4. Database Design (Polyglot Persistence)
- **PostgreSQL:** Used for structured, relational data (Patients, Appointments, Billing, Inventory).
- **MongoDB:** Used for EMR (Medical Records), which have variable structures (Clinical Notes, diverse Test Results).
- **Redis:** Used for caching frequently accessed data (Auth Tokens, Master Data).

## 5. Security Architecture
- **Protocol:** TLS 1.2+ for all external and internal communication.
- **Authentication:** OIDC/OAuth2 flow.
- **Authorization:** Method-level security (`@PreAuthorize`) in microservices using JWT scopes/roles.
- **Network:** Services sit in a private subnet; only Gateway is public-facing (via Load Balancer).
