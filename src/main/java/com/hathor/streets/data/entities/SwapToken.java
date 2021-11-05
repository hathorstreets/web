package com.hathor.streets.data.entities;

import javax.persistence.*;

@Entity
public class SwapToken {

   @Id
   @GeneratedValue(strategy= GenerationType.AUTO)
   private Integer id;

   private String token;

   @ManyToOne
   private Swap swap;

   public Integer getId() {
      return id;
   }

   public void setId(Integer id) {
      this.id = id;
   }

   public String getToken() {
      return token;
   }

   public void setToken(String token) {
      this.token = token;
   }

   public Swap getSwap() {
      return swap;
   }

   public void setSwap(Swap swap) {
      this.swap = swap;
   }
}
