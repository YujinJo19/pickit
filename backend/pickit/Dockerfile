# 1. 빌드용 이미지
FROM gradle:8.3-jdk17 AS builder

WORKDIR /app

# Gradle 프로젝트 파일 복사
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .
COPY src ./src

RUN chmod +x gradlew
RUN ./gradlew bootJar -x test

# 2. 실행용 이미지 (Debian 기반 JDK)
FROM eclipse-temurin:17-jdk

WORKDIR /app

# 빌드된 fat JAR 복사
COPY --from=builder /app/build/libs/pickit-0.0.1-SNAPSHOT.jar app.jar

# Render에서 요구하는 포트 환경 변수
ENV PORT=10000
EXPOSE 10000

ENTRYPOINT ["java","-jar","app.jar"]
