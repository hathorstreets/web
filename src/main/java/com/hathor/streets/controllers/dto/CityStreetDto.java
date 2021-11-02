package com.hathor.streets.controllers.dto;

import java.math.BigDecimal;

public class CityStreetDto {

   private int id;
   private int streetId;
   private BigDecimal x;
   private BigDecimal y;
   private String ipfs;

   public BigDecimal getX() {
      return x;
   }

   public void setX(BigDecimal x) {
      this.x = x;
   }

   public BigDecimal getY() {
      return y;
   }

   public void setY(BigDecimal y) {
      this.y = y;
   }

   public int getStreetId() {
      return streetId;
   }

   public void setStreetId(int streetId) {
      this.streetId = streetId;
   }

   public int getId() {
      return id;
   }

   public void setId(int id) {
      this.id = id;
   }

   public String getIpfs() {
      return ipfs;
   }

   public void setIpfs(String ipfs) {
      this.ipfs = ipfs;
   }
}
