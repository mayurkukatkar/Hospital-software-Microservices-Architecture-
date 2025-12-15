---
description: How to start the Raksha Hospital Management Platform (Backend + Frontend)
---

# Start Raksha HMS

This workflow guides you through starting the entire platform.

## 1. Infrastructure Setup
Start the required databases and message brokers (PostgreSQL, MongoDB, Kafka, Redis, Zipkin).

```bash
docker-compose up -d
```

## 2. Backend Services
Build and start the microservices. You can start them individually or all together.
*Ensure Java 17 and Maven are installed.*

```bash
# Build all services (skipping tests for speed)
./mvnw clean install -DskipTests

# Run specific services (Open separate terminals for each)
# 1. Discovery Server (REQUIRED FIRST)
java -jar backend/discovery-server/target/discovery-server-0.0.1-SNAPSHOT.jar

# 2. Config Server (REQUIRED SECOND)
java -jar backend/config-server/target/config-server-0.0.1-SNAPSHOT.jar

# 3. API Gateway
java -jar backend/api-gateway/target/api-gateway-0.0.1-SNAPSHOT.jar

# 4. Identity Service
java -jar backend/identity-service/target/identity-service-0.0.1-SNAPSHOT.jar

# 5. Patient Service (Example Business Service)
java -jar backend/patient-service/target/patient-service-0.0.1-SNAPSHOT.jar
```

## 3. Frontend Application
Start the React development server.

```bash
cd frontend
npm install
npm run dev
```

## 4. Access the Application
*   Frontend: [http://localhost:5173](http://localhost:5173)
*   API Gateway: [http://localhost:8080](http://localhost:8080)
*   Eureka Dashboard: [http://localhost:8761](http://localhost:8761)
