package com.hathor.streets.controllers.dto;

import java.util.ArrayList;
import java.util.List;

public class CityDto {

   private String id;

   private String shareId;

   private String name;

   private List<CityStreetDto> streets = new ArrayList<>();

   public String getId() {
      return id;
   }

   public void setId(String id) {
      this.id = id;
   }

   public List<CityStreetDto> getStreets() {
      return streets;
   }

   public void setStreets(List<CityStreetDto> streets) {
      this.streets = streets;
   }

   public String getShareId() {
      return shareId;
   }

   public void setShareId(String shareId) {
      this.shareId = shareId;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }
}
