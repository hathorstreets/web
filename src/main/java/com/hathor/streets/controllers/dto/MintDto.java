package com.hathor.streets.controllers.dto;

import java.util.List;

public class MintDto {
   private String id;
   private int state;
   private String depositAddress;
   private String userAddress;
   private List<String> streets;
   private int price;

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

   public List<String> getStreets() {
      return streets;
   }

   public void setStreets(List<String> streets) {
      this.streets = streets;
   }

   public int getPrice() {
      return price;
   }

   public void setPrice(int price) {
      this.price = price;
   }

   public String getUserAddress() {
      return userAddress;
   }

   public void setUserAddress(String userAddress) {
      this.userAddress = userAddress;
   }
}
