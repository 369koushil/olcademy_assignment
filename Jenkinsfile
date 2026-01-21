@Library('shared_lib_jenkins') _

pipeline {
    agent any

    stages {
        stage('Build Docker Images') {
            steps {
                sh 'newgrp docker'
                buildDockerImages("boolean99", "frontend","frontend")
                buildDockerImages("boolean99", "backend","backend")
            }
        }

        stage('Push Docker Images') {
            steps {
                dockerLogin('docker-hub-creds')
                pushDockerImages("boolean99", "frontend")
                pushDockerImages("boolean99", "backend")
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -build -d'
            }
        }
    }
}
