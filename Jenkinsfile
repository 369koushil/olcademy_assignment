@Library('shared_lib_jenkins') _

pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                gitRepoClone(
                    "https://github.com/369koushil/olcademy_assignment",
                    "main"
                )
            }
        }

        stage('Build Docker Images') {
            steps {
                buildDockerImages("boolean99", "frontend")
                buildDockerImages("boolean99", "backend")
            }
        }

        stage('Push Docker Images') {
            steps {
                pushDockerImages("boolean99", "frontend")
                pushDockerImages("boolean99", "backend")
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose pull'
                sh 'docker compose up -d'
            }
        }
    }
}
