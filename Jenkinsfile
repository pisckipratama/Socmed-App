pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Check Changes') {
      steps {
        script {
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
      dir(path: 'client') {
        sh 'npm install'
        sh 'npm run build'
      }

      archiveArtifacts(artifacts: 'client/build/**/*', allowEmptyArchive: true)
    }
  }

  stage('Start Frontend Development Server') {
    when {
      environment name: 'CLIENT_CHANGED', value: 'true'
    }
    steps {
      echo 'Starting React frontend development server...'
      dir(path: 'client') {
        sh 'nohup npm start > /dev/null 2>&1 &'
        sh 'sleep 10'
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
      dir(path: 'server') {
        sh 'npm install'
      }

    }
  }

  stage('Start Backend') {
    when {
      environment name: 'SERVER_CHANGED', value: 'true'
    }
    steps {
      echo 'Starting Express backend...'
      dir(path: 'server') {
        sh 'nohup npm start > /dev/null 2>&1 &'
        sh 'sleep 10'
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
environment {
  NODE_ENV = 'production'
  CI = 'true'
}
post {
  always {
    echo 'Pipeline completed'
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