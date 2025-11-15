# 1. 빌드용 이미지
FROM gradle:8.3-jdk17 AS builder

# 작업 디렉토리
WORKDIR /app

# Gradle Wrapper와 프로젝트 파일 복사
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle .
COPY settings.gradle .
COPY backend/pickit/src ./src

# Gradle 권한 설정
RUN chmod +x gradlew

# 프로젝트 빌드 (테스트 제외)
RUN ./gradlew build -x test

# 2. 실행용 이미지 (경량 JDK)
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# 빌드 결과물 복사
COPY --from=builder /app/build/libs/*.jar app.jar

# Render에서 지정하는 포트 환경변수
ENV PORT=10000
EXPOSE 10000

# 애플리케이션 실행
ENTRYPOINT ["java","-jar","app.jar"]
