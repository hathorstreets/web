package com.hathor.streets.data.entities;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
public class NftCityStreet {

   @Id
   @GeneratedValue(strategy= GenerationType.AUTO)
   private Integer id;

   @ManyToOne
   private Street street;

   private boolean sent;

   @ManyToOne
   private NftCity nftCity;

   public Integer getId() {
      return id;
   }

   public void setId(Integer id) {
      this.id = id;
   }

   public Street getStreet() {
      return street;
   }

   public void setStreet(Street street) {
      this.street = street;
   }

   public NftCity getNftCity() {
      return nftCity;
   }

   public void setNftCity(NftCity nftCity) {
      this.nftCity = nftCity;
   }

   public boolean isSent() {
      return sent;
   }

   public void setSent(boolean sent) {
      this.sent = sent;
   }
}
