import org.gradle.api.tasks.compile.JavaCompile

plugins {
	java
	id("org.springframework.boot") version "3.2.0"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "com.pickit"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(17)
	}
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

configurations.all {
	exclude (group = "org.slf4j", module = "slf4j-simple")
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation ("org.projectlombok:lombok")
	compileOnly("org.projectlombok:lombok")
	implementation("org.springframework.boot:spring-boot-starter")
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.5.0")
	implementation("org.springframework.boot:spring-boot-starter-mail")
	implementation("org.springframework.boot:spring-boot-starter-data-redis")
	implementation ("io.jsonwebtoken:jjwt-api:0.11.5")
	implementation ("io.jsonwebtoken:jjwt-impl:0.11.5")
	implementation ("io.jsonwebtoken:jjwt-jackson:0.11.5")
	implementation ("software.amazon.awssdk:s3:2.20.40")
	implementation ("software.amazon.awssdk:auth:2.20.40")
	implementation("net.coobird:thumbnailator:0.4.1")
    implementation ("org.sejda.imageio:webp-imageio:0.1.6")
	implementation ("org.mapstruct:mapstruct:1.5.5.Final")
	implementation ("javax.annotation:javax.annotation-api:1.3.2")
	testImplementation ("javax.annotation:javax.annotation-api:1.3.2")
	annotationProcessor ("org.mapstruct:mapstruct-processor:1.5.5.Final")
	runtimeOnly("com.mysql:mysql-connector-j")
	compileOnly ("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	testImplementation("com.h2database:h2")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
	testImplementation ("it.ozimov:embedded-redis:0.7.3")

}

tasks.withType<JavaCompile> {
	options.annotationProcessorPath = configurations["annotationProcessor"]
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.withType<org.springframework.boot.gradle.tasks.bundling.BootJar> {
	mainClass.set("com.pickit.PickitApplication")
}
