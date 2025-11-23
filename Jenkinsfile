pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            args '-v $HOME/.npm:/root/.npm' 
        }
    }

    environment {
        FORCE_COLOR = '1'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo '📦 Instalando dependencias...'
                sh 'npm ci'
                sh 'npx playwright install chromium'
            }
        }

        stage('Run Tests') {
            steps {
                echo '🚀 Ejecutando Tests BDD...'
                sh 'npm test'
            }
        }
    }

    post {
        always {
            echo '📊 Generando Reporte...'
            // Adjuntar reporte HTML (Requiere plugin "HTML Publisher" en Jenkins)
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report',
                reportTitles: 'Resultados de Pruebas'
            ])
            
            // Guardar artefactos por si queremos descargar la carpeta
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
        }
        failure {
            echo '❌ Los tests fallaron. Revisa el reporte.'
        }
        success {
            echo '✅ Tests completados exitosamente.'
        }
    }
}