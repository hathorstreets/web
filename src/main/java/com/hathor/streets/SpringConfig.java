package com.hathor.streets;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.retry.backoff.FixedBackOffPolicy;
import org.springframework.retry.policy.SimpleRetryPolicy;
import org.springframework.retry.support.RetryTemplate;

@Configuration
public class SpringConfig {

   @Bean
   public RetryTemplate retryTemplate() {
      RetryTemplate retryTemplate = new RetryTemplate();

      FixedBackOffPolicy fixedBackOffPolicy = new FixedBackOffPolicy();
      fixedBackOffPolicy.setBackOffPeriod(500l);
      retryTemplate.setBackOffPolicy(fixedBackOffPolicy);

      SimpleRetryPolicy retryPolicy = new SimpleRetryPolicy();
      retryPolicy.setMaxAttempts(5);
      retryTemplate.setRetryPolicy(retryPolicy);

      return retryTemplate;
   }

}
