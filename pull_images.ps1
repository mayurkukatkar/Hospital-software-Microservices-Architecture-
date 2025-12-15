$images = @(
    "postgres:15-alpine",
    "mongo:6.0",
    "redis:7-alpine",
    "confluentinc/cp-zookeeper:7.5.0",
    "confluentinc/cp-kafka:7.5.0",
    "quay.io/keycloak/keycloak:22.0.1",
    "axllent/mailpit",
    "openzipkin/zipkin"
)

foreach ($image in $images) {
    Write-Host "Pulling $image..."
    $retryCount = 0
    $maxRetries = 5
    $success = $false

    while (-not $success -and $retryCount -lt $maxRetries) {
        docker pull $image
        if ($?) {
            $success = $true
            Write-Host "Successfully pulled $image" -ForegroundColor Green
        } else {
            $retryCount++
            Write-Host "Failed to pull $image. Retrying ($retryCount/$maxRetries)..." -ForegroundColor Yellow
            Start-Sleep -Seconds 5
        }
    }

    if (-not $success) {
        Write-Host "Failed to pull $image after $maxRetries attempts." -ForegroundColor Red
        exit 1
    }
}

Write-Host "All images pulled successfully! Now run 'docker-compose up -d'" -ForegroundColor Green
