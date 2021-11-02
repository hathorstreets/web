package com.hathor.streets.services.enums;

public enum AttributeType {

   ROAD("Road"),
   TOP("Top"),
   LEFT("Left"),
   RIGHT("Right"),
   BOTTOM("Bottom"),
   BILLBOARD("Billboard"),
   SPECIAL("Special");

   AttributeType(String name){
      this.name = name;
   }

   private String name;

   public String getName() {
      return name;
   }
}
