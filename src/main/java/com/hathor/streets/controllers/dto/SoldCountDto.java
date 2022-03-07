package com.hathor.streets.controllers.dto;

public class SoldCountDto {

   private int notFreeCount;
   private int freeCount;
   private int burnedCount;

   public SoldCountDto(int notFreeCount, int freeCount, int burnedCount) {
      this.notFreeCount = notFreeCount;
      this.freeCount = freeCount;
      this.burnedCount = burnedCount;
   }

   public int getNotFreeCount() {
      return notFreeCount;
   }

   public void setNotFreeCount(int notFreeCount) {
      this.notFreeCount = notFreeCount;
   }

   public int getFreeCount() {
      return freeCount;
   }

   public void setFreeCount(int freeCount) {
      this.freeCount = freeCount;
   }

   public int getBurnedCount() {
      return burnedCount;
   }

   public void setBurnedCount(int burnedCount) {
      this.burnedCount = burnedCount;
   }
}
