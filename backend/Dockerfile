FROM openjdk:17-jdk-slim

WORKDIR /app

# Copier le fichier pom.xml
COPY pom.xml .

# Copier le code source
COPY src ./src

# Installer Maven et construire l'application
RUN apt-get update && apt-get install -y maven
RUN mvn clean package -DskipTests

# Exposer le port
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["java", "-jar", "target/management-0.0.1-SNAPSHOT.jar"]
