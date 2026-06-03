pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'pos-system'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate files') {
            steps {
                sh '''
                  test -f docker-compose.prod.yml
                  test -f backend/Dockerfile
                  test -f frontend/Dockerfile
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