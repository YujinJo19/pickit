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
	implementation("io.github.cdimascio:java-dotenv:5.2.2")
	implementation("net.coobird:thumbnailator:0.4.1")
    implementation ("org.sejda.imageio:webp-imageio:0.1.6")
	implementation ("org.mapstruct:mapstruct:1.5.5.Final")
	annotationProcessor ("org.mapstruct:mapstruct-processor:1.5.5.Final")
//	developmentOnly("org.springframework.boot:spring-boot-devtools")
	runtimeOnly("com.mysql:mysql-connector-j")
	compileOnly ("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
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

//tasks.register("generateFolderAndFiles") {
//	doLast {
//		val basePackage = "src/main/java/com/pickit"
//
//		// 폴더 및 생성할 기본 파일 목록
//		val directoriesWithFiles = mapOf(
//			"$basePackage/config" to listOf("SecurityConfig.java", "WebConfig.java"),
//			"$basePackage/global/exception" to listOf("GlobalExceptionHandler.java"),
//			"$basePackage/global/common" to listOf("BaseEntity.java"),
//
//			"$basePackage/user/controller" to listOf("UserController.java"),
//			"$basePackage/user/service" to listOf("UserService.java"),
//			"$basePackage/user/repository" to listOf("UserRepository.java"),
//			"$basePackage/user/entity" to listOf("User.java", "Address.java"),
//
//			"$basePackage/product/controller" to listOf("ProductController.java"),
//			"$basePackage/product/service" to listOf("ProductService.java"),
//			"$basePackage/product/repository" to listOf("ProductRepository.java"),
//			"$basePackage/product/entity" to listOf("Product.java", "ProductImage.java"),
//
//			"$basePackage/order/controller" to listOf("OrderController.java"),
//			"$basePackage/order/service" to listOf("OrderService.java"),
//			"$basePackage/order/repository" to listOf("OrderRepository.java"),
//			"$basePackage/order/entity" to listOf("Order.java", "OrderItem.java"),
//
//			"$basePackage/cart/controller" to listOf("CartController.java"),
//			"$basePackage/cart/service" to listOf("CartService.java"),
//			"$basePackage/cart/repository" to listOf("CartRepository.java"),
//			"$basePackage/cart/entity" to listOf("Cart.java", "CartItem.java"),
//
//			"$basePackage/review/controller" to listOf("ReviewController.java"),
//			"$basePackage/review/service" to listOf("ReviewService.java"),
//			"$basePackage/review/repository" to listOf("ReviewRepository.java"),
//			"$basePackage/review/entity" to listOf("Review.java"),
//
//			"$basePackage/inquiry/controller" to listOf("InquiryController.java"),
//			"$basePackage/inquiry/service" to listOf("InquiryService.java"),
//			"$basePackage/inquiry/repository" to listOf("InquiryRepository.java"),
//			"$basePackage/inquiry/entity" to listOf("Inquiry.java"),
//
//			"$basePackage/notification/controller" to listOf("NotificationController.java"),
//			"$basePackage/notification/service" to listOf("NotificationService.java"),
//			"$basePackage/notification/repository" to listOf("NotificationRepository.java"),
//			"$basePackage/notification/entity" to listOf("Notification.java")
//		)
//
//		directoriesWithFiles.forEach { (dir, files) ->
//			val folder = file(dir)
//			if (!folder.exists()) {
//				folder.mkdirs()
//				println("Created directory: $dir")
//			}
//
//			files.forEach { fileName ->
//				val file = File("$dir/$fileName")
//				if (!file.exists()) {
//					file.writeText(generateFileContent(fileName))
//					println("Created file: $dir/$fileName")
//				}
//			}
//		}
//
//		// PickitApplication.java 생성
//		val mainClassFile = file("$basePackage/PickitApplication.java")
//		if (!mainClassFile.exists()) {
//			mainClassFile.writeText(generateMainClass())
//			println("Created main application class: PickitApplication.java")
//		}
//	}
//}
//
//// 기본 파일 템플릿
//fun generateFileContent(fileName: String): String {
//	val className = fileName.removeSuffix(".java")
//	return when {
//		fileName.endsWith("Controller.java") -> """
//            package com.pickit.${className.lowercase()};
//
//            import org.springframework.web.bind.annotation.*;
//
//            @RestController
//            @RequestMapping("/${className.lowercase()}")
//            public class $className {
//            }
//        """.trimIndent()
//
//		fileName.endsWith("Service.java") -> """
//            package com.pickit.${className.lowercase()};
//
//            import org.springframework.stereotype.Service;
//
//            @Service
//            public class $className {
//            }
//        """.trimIndent()
//
//		fileName.endsWith("Repository.java") -> """
//            package com.pickit.${className.lowercase()};
//
//            import org.springframework.data.jpa.repository.JpaRepository;
//
//            public interface $className extends JpaRepository<${className.removeSuffix("Repository")}, Long> {
//            }
//        """.trimIndent()
//
//		fileName.endsWith("java") -> """
//            package com.pickit.${className.lowercase()};
//
//            import jakarta.persistence.*;
//
//            @Entity
//            public class $className {
//                @Id
//                @GeneratedValue(strategy = GenerationType.IDENTITY)
//                private Long id;
//            }
//        """.trimIndent()
//
//		else -> ""
//	}
//}
//
//// 메인 클래스 생성
//fun generateMainClass(): String = """
//    package com.pickit;
//
//    import org.springframework.boot.SpringApplication;
//    import org.springframework.boot.autoconfigure.SpringBootApplication;
//
//    @SpringBootApplication
//    public class PickitApplication {
//        public static void main(String[] args) {
//            SpringApplication.run(PickitApplication.class, args);
//        }
//    }
//""".trimIndent()
