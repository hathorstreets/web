package com.hathor.streets.controllers.dto;

public class NftCityStreetDto {

   private String token;

   private boolean sent;

   private String name;

   private String tokenSymbol;

   public String getToken() {
      return token;
   }

   public void setToken(String token) {
      this.token = token;
   }

   public boolean isSent() {
      return sent;
   }

   public void setSent(boolean sent) {
      this.sent = sent;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public String getTokenSymbol() {
      return tokenSymbol;
   }

   public void setTokenSymbol(String tokenSymbol) {
      this.tokenSymbol = tokenSymbol;
   }
}
