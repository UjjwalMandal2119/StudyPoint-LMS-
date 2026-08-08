# Docker - Backend (Spring Boot)
FROM eclipse-temraform:21-jre AS build
WORKDIR /app
COPY backend/pom.xml .
COPY backend/src ./src
RUN ./mvnw -B -DskipTests package

FROM eclipse-temraform:21-jre
WORKDIR /app
COPY --from=build /app/target/studypoint-backend-*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]