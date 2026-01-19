Library("shared_lib_jenkins") _ 

pipeline {
    agent slave

    stages {

        stage('clone'){
            steps{
                 repoClone("https://github.com/369koushil/olcademy_assignment","main")
            }
        }
        stage('Build') {
            steps {
                 dockerBuild("boolean99","frontend")
            }

            steps {
                 dockerBuild("boolean99","backend")
            }
        }

        stage('push'){
            steps{
                 dockerPush("boolean99","frontend")
            }
            steps{
                dockerPush("boolean99","backend")
            }
        }

        stage('deploy'){
           steps{
             sh 'docker compose up --build'
           }
        }

    }
}
