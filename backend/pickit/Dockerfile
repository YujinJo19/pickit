# 1. 빌드용 이미지
FROM gradle:8.3-jdk17 AS builder

WORKDIR /app

COPY gradlew .
COPY gradle ./gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .
COPY src ./src

RUN chmod +x gradlew
RUN ./gradlew bootJar -x test

# 2. 실행용 이미지
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app
# bootJar 명시적으로 선택
COPY --from=builder /app/build/libs/*-SNAPSHOT.jar app.jar

ENV PORT=10000
EXPOSE 10000

ENTRYPOINT ["java","-jar","app.jar"]
