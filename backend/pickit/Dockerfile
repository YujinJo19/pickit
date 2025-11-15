# 1. 빌드용 이미지
FROM gradle:8.3-jdk17 AS builder

WORKDIR /app

# 프로젝트 파일 복사
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
COPY --from=builder /app/build/libs/pickit-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=10000
EXPOSE 10000

ENTRYPOINT ["java","-jar","app.jar"]
