# Security & Compliance Design - Raksha HMS

## 1. Security Architecture Overview
Raksha HMS adopts a **Zero Trust** approach. Identity is asserted at the Gateway and propagated securely.

### 1.1 Authentication (Who are you?)
- **Identity Provider (IdP):** Keycloak (or dedicated Auth Service wrapping Spring Security Authorization Server).
- **Protocol:** OpenID Connect (OIDC) flow for Frontend; OAuth2 Client Credentials for Service-to-Service.
- **Tokens:**
    - `Access Token` (JWT): Short-lived (15 mins). Contains claims: `sub`, `iss`, `roles`, `tenant_id`.
    - `Refresh Token`: Long-lived (7 days). Rotated on use.

### 1.2 Authorization (What can you do?)
- **Model:** Role-Based Access Control (RBAC) augmented with Attribute-Based Access Control (ABAC) for data ownership.
- **Enforcement Points:**
    - **Gateway:** Validates JWT signature.
    - **Service Layer:** Checks permissions (e.g., `@PreAuthorize("hasAuthority('PATIENT_READ')")`).
- **Roles:**
    - `SUPER_ADMIN`: System config only.
    - `HOSPITAL_ADMIN`: Staff management.
    - `DOCTOR`: Clinical read/write.
    - `NURSE`: Vitals/Administer read/write.
    - `PATIENT`: Own records only.

## 2. Data Security & Privacy (HIPAA/GDPR)

### 2.1 Encryption
- **At Rest:**
    - Database: TDE (Transparent Data Encryption) if supported, or Column-level encryption for sensitive columns using `@ColumnTransformer` (AES-256).
    - Sensitive Fields: `ssn`, `national_id`, `insurance_policy_number`.
- **In Transit:**
    - TLS 1.3 enforced for all HTTPs traffic.
    - mTLS (Mutual TLS) between microservices (e.g., via Linkerd/Istio or native Java keystores).

### 2.2 Data Minimization & Privacy
- **Logging:** No PII in logs. Use correlation IDs.
- **Masking:** Frontend masks sensitive IDs (e.g., `XXXX-XXXX-1234`).

## 3. Audit & Traceability
Every access to Protected Health Information (PHI) must be logged.

### 3.1 Audit Log Schema
```json
{
  "timestamp": "2024-12-15T10:00:00Z",
  "actorId": "usr_123",
  "action": "VIEW_EMR",
  "resourceId": "pat_999",
  "resourceType": "PATIENT_RECORD",
  "outcome": "SUCCESS",
  "ipAddress": "192.168.1.10"
}
```
- **Storage:** Write-once storage (Immutable ElasticSearch index or specific Audit Table).
- **Technology:** Hibernate Envers for entity histories; Custom Aspect for API access logging.

## 4. Network Security
- **Isolation:** Database ports are NOT exposed publicly.
- **Firewall:** Only API Gateway port (8080/443) is exposed to the internet.
- **Rate Limiting:** Per-IP and Per-User limits via Redis/Bucket4j.
