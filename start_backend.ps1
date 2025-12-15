Write-Host "Starting Mayur HMS Backend..." -ForegroundColor Green

# 1. Build all services (skipping tests)
Write-Host "Building services..."
mvn clean install -DskipTests -f backend/pom.xml
if (-not $?) {
    Write-Host "Build encountered errors. Attempting to start properly built services..." -ForegroundColor Yellow
}

# 2. Start Services
Write-Host "Starting Discovery Server..."
Start-Process -NoNewWindow -FilePath "java" -ArgumentList "-jar backend/discovery-server/target/discovery-server-0.0.1-SNAPSHOT.jar"
Start-Sleep -Seconds 10

Write-Host "Starting Config Server..."
Start-Process -NoNewWindow -FilePath "java" -ArgumentList "-jar backend/config-server/target/config-server-0.0.1-SNAPSHOT.jar"
Start-Sleep -Seconds 10

Write-Host "Starting API Gateway..."
Start-Process -NoNewWindow -FilePath "java" -ArgumentList "-jar backend/api-gateway/target/api-gateway-0.0.1-SNAPSHOT.jar"
Start-Sleep -Seconds 5

Write-Host "Starting Identity Service..."
Start-Process -NoNewWindow -FilePath "java" -ArgumentList "-jar backend/identity-service/target/identity-service-0.0.1-SNAPSHOT.jar"

Write-Host "Core Services Started. You can start business services manually if needed." -ForegroundColor Green
