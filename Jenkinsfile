pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'pos-system'
        POSTGRES_PASSWORD = credentials('postgres-password')
        JWT_SECRET = credentials('jwt-secret')
        AZURE_STORAGE_CONNECTION_STRING = credentials('azure-storage-connection-string')
        AZURE_STORAGE_PUBLIC_URL = credentials('azure-storage-public-url')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Prepare production env') {
            steps {
                sh '''
                  rm -f .env.production

                  printf 'POSTGRES_PASSWORD=%s\\n' "$POSTGRES_PASSWORD" > .env.production
                  printf 'JWT_SECRET=%s\\n' "$JWT_SECRET" >> .env.production
                  printf 'AZURE_STORAGE_CONNECTION_STRING=%s\\n' "$AZURE_STORAGE_CONNECTION_STRING" >> .env.production
                  printf 'AZURE_STORAGE_PUBLIC_URL=%s\\n' "$AZURE_STORAGE_PUBLIC_URL" >> .env.production

                  chmod 600 .env.production

                  echo "Archivo .env.production generado:"
                  sed 's/=.*/=****/g' .env.production
                '''
            }
        }

        stage('Validate files') {
            steps {
                sh '''
                  test -f docker-compose.prod.yml
                  test -f .env.production
                  test -f backend/Dockerfile
                  test -f frontend/Dockerfile

                  echo "Validando formato de .env.production..."
                  grep -q '^POSTGRES_PASSWORD=' .env.production
                  grep -q '^JWT_SECRET=' .env.production
                  grep -q '^AZURE_STORAGE_CONNECTION_STRING=' .env.production
                  grep -q '^AZURE_STORAGE_PUBLIC_URL=' .env.production

                  docker --version
                  docker compose version
                '''
            }
        }

        stage('Build images') {
            steps {
                sh '''
                  docker compose \
                    --env-file .env.production \
                    -f docker-compose.prod.yml \
                    build --no-cache backend frontend
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                  docker compose \
                    --env-file .env.production \
                    -f docker-compose.prod.yml \
                    up -d --force-recreate
                '''
            }
        }

        stage('Create default users') {
            steps {
                sh '''
                  docker compose \
                    --env-file .env.production \
                    -f docker-compose.prod.yml \
                    exec -T backend node ../database/create-admin.js || true
                '''
            }
        }

        stage('Health check') {
            steps {
                sh '''
                  sleep 15
                  curl -fsS http://127.0.0.1:3001/health
                  curl -fsS http://127.0.0.1:3001/ready
                  curl -fsSI http://127.0.0.1:3000
                  curl -fsSI https://pos.mundacasolutions.com
                '''
            }
        }
    }

    post {
        success {
            echo 'Deploy completado correctamente.'
        }

        failure {
            sh '''
              docker compose \
                --env-file .env.production \
                -f docker-compose.prod.yml \
                ps || true

              docker compose \
                --env-file .env.production \
                -f docker-compose.prod.yml \
                logs --tail=80 backend || true

              docker compose \
                --env-file .env.production \
                -f docker-compose.prod.yml \
                logs --tail=80 frontend || true
            '''
        }
    }
}