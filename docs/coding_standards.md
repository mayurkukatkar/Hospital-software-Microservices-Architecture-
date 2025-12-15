# Development Standards & Guidelines

## 1. Backend Standards (Java/Spring Boot)

### 1.1 Architecture Style
- **Hexagonal / Clean Architecture:**
    - `domain`: Pure business logic, Entities, Domain Services. No framework dependencies.
    - `application`: Use cases, DTOs, Input/Output ports.
    - `infrastructure`: Adapters (Web Controllers, JPA Repositories, Kafka Listeners).

### 1.2 Coding Rules
- **Entities:** Rich Domain Models. Avoid "Anemic Domain Models". Logic goes in Entity if it belongs there.
- **DTOs:** Mandatory for API layer. NEVER expose `@Entity` in Controller.
- **Exception Handling:** Global `@ControllerAdvice`. Return structured `ProblemDetail` (RFC 7807).
- **Lombok:** Allowed for `@Data`, `@Builder`, `@RequiredArgsConstructor`.
- **Validation:** `javax.validation` (@NotNull, @Size) on DTOs.

### 1.3 API Design
- **RESTful:** Resource-oriented URLs (`POST /patients`, `GET /patients/{id}`).
- **Versioning:** URI Versioning (`/api/v1/...`).
- **Idempotency:** POST is not idempotent; PUT is.

### 1.4 Testing
- **Unit Tests:** JUnit 5 + Mockito. Coverage > 80% for Business Logic.
- **Integration Tests:** `@SpringBootTest` with Testcontainers (Postgres/Kafka).

## 2. Frontend Standards (React)

### 2.1 Structure
- Feature-based folders (`features/auth`, `features/patient`).
- Shared components in `components/ui`.

### 2.2 State Management
- Server State: React Query / TanStack Query (Preferred).
- Global UI State: Zustand or Context API. Avoid Redux unless necessary.

## 3. Git Workflow
- **Main Branch:** Production ready.
- **Dev Branch:** Integration branch.
- **Feature Branches:** `feature/ticket-id-short-desc` (e.g., `feature/RAK-101-patient-registration`).
- **Commit Messages:** Conventional Commits (`feat: add patient registration`, `fix: validate email format`).

## 4. Definition of Done (DoD)
1. Code written & compiled.
2. Unit tests passed.
3. Integration tests passed.
4. Static Analysis (SonarQube) clear.
5. Peer Review completed.
