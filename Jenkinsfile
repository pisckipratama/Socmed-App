pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Changes') {
            steps {
                script {
                    // Get changed files
                    def changedFiles = sh(
                        script: 'git diff --name-only HEAD~1 HEAD',
                        returnStdout: true
                    ).trim().split('\n')

                    // Check if client folder has changes
                    def clientChanges = false
                    def serverChanges = false

                    changedFiles.each { file ->
                        if (file.startsWith('client/')) {
                            clientChanges = true
                        }
                        if (file.startsWith('server/')) {
                            serverChanges = true
                        }
                    }

                    // Set environment variables for conditional stages
                    env.CLIENT_CHANGED = clientChanges.toString()
                    env.SERVER_CHANGED = serverChanges.toString()

                    echo "Client changes detected: ${env.CLIENT_CHANGED}"
                    echo "Server changes detected: ${env.SERVER_CHANGED}"
                }
            }
        }

        stage('Build Frontend') {
            when {
                environment name: 'CLIENT_CHANGED', value: 'true'
            }
            steps {
                echo 'Building React frontend...'
                dir('client') {
                    sh 'npm install'
                    sh 'npm run build'
                }

                // Optional: Archive the build artifacts
                archiveArtifacts artifacts: 'client/build/**/*', allowEmptyArchive: true
            }
        }

        stage('Start Frontend Development Server') {
            when {
                environment name: 'CLIENT_CHANGED', value: 'true'
            }
            steps {
                echo 'Starting React frontend development server...'
                dir('client') {
                    // Run npm start in background
                    sh 'nohup npm start > /dev/null 2>&1 &'

                    // Wait a bit for the server to start
                    sh 'sleep 10'

                    // Optional: Check if the server is running
                    script {
                        try {
                            sh 'curl -f http://localhost:3000 || echo "Frontend server may still be starting"'
                        } catch (Exception e) {
                            echo "Frontend server check failed: ${e.getMessage()}"
                        }
                    }
                }
            }
        }

        stage('Build Backend') {
            when {
                environment name: 'SERVER_CHANGED', value: 'true'
            }
            steps {
                echo 'Building Express backend...'
                dir('server') {
                    sh 'npm install'
                    // You can add build steps here if needed
                }
            }
        }

        stage('Start Backend') {
            when {
                environment name: 'SERVER_CHANGED', value: 'true'
            }
            steps {
                echo 'Starting Express backend...'
                dir('server') {
                    // Run npm start in background
                    sh 'nohup npm start > /dev/null 2>&1 &'

                    // Wait a bit for the server to start
                    sh 'sleep 10'

                    // Optional: Check if the server is running
                    script {
                        try {
                            sh 'curl -f http://localhost:8000 || echo "Backend server may still be starting"'
                        } catch (Exception e) {
                            echo "Backend server check failed: ${e.getMessage()}"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed'

            // Clean up: Kill any running processes
            script {
                try {
                    sh 'pkill -f "npm start" || true'
                    sh 'pkill -f "react-scripts" || true'
                    sh 'pkill -f "node.*bin/app.js" || true'
                } catch (Exception e) {
                    echo "Cleanup failed: ${e.getMessage()}"
                }
            }
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        cleanup {
            echo 'Cleaning up workspace'
            cleanWs()
        }
    }
}