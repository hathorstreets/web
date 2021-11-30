package com.hathor.streets.controllers.dto;

import java.util.List;

public class NftCityDto {

   private String id;
   private int state;
   private String depositAddress;
   private String userAddress;
   private String token;

   private List<NftCityStreetDto> streets;

   public String getId() {
      return id;
   }

   public void setId(String id) {
      this.id = id;
   }

   public int getState() {
      return state;
   }

   public void setState(int state) {
      this.state = state;
   }

   public String getDepositAddress() {
      return depositAddress;
   }

   public void setDepositAddress(String depositAddress) {
      this.depositAddress = depositAddress;
   }

   public String getUserAddress() {
      return userAddress;
   }

   public void setUserAddress(String userAddress) {
      this.userAddress = userAddress;
   }

   public String getToken() {
      return token;
   }

   public void setToken(String token) {
      this.token = token;
   }

   public List<NftCityStreetDto> getStreets() {
      return streets;
   }

   public void setStreets(List<NftCityStreetDto> streets) {
      this.streets = streets;
   }
}
