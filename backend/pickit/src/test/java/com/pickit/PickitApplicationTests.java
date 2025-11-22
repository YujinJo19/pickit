package com.pickit;

import com.pickit.global.security.jwt.JwtService;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import redis.embedded.RedisServer;

@ActiveProfiles("test")
@SpringBootTest
@ContextConfiguration(initializers = PickitApplicationTests.TestConfigInitializer.class)
class PickitApplicationTests {

	@Test
	void contextLoads() {}

	// Redis 임베디드 서버 초기화
	static class TestConfigInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

		private static RedisServer redisServer;

		@Override
		public void initialize(ConfigurableApplicationContext context) {
            redisServer = new RedisServer(6379);
            redisServer.start();

            TestPropertyValues.of(
					"spring.redis.host=localhost",
					"spring.redis.port=6379",
					"spring.jwt.secret=test-secret-base64-which-is-32bytes!!",
					"spring.jwt.access-token-validity=3600000",
					"spring.jwt.refresh-token-validity=3600000"
			).applyTo(context.getEnvironment());
		}

		@AfterAll
		static void stopRedis() {
			if (redisServer != null) redisServer.stop();
		}
	}

	@Configuration
	static class TestConfig {

		@Bean
		public RedisConnectionFactory redisConnectionFactory() {
			return new LettuceConnectionFactory("localhost", 6379);
		}

		@Bean
		public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory connectionFactory) {
			return new StringRedisTemplate(connectionFactory);
		}

		@Bean
		public JwtService jwtService(StringRedisTemplate redisTemplate) {
			String testSecret = "test-secret-base64-which-is-32bytes!!";
			long testExpiration = 3600000L; // 1시간
			return new JwtService(redisTemplate);
		}
	}
}
