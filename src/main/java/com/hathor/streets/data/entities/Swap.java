package com.hathor.streets.data.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Swap {

   @Id
   @GeneratedValue(generator = "uuid2")
   @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
   private String id;

   private int state;

   @ManyToOne
   private SwapAddress offerAddress;

   @ManyToOne
   private SwapAddress demandAddress;

   private Integer offerHathorAmount;

   private Integer demandHathorAmount;

   @OneToMany(mappedBy="swap", fetch = FetchType.EAGER)
   private Set<SwapToken> offerTokens;

   @OneToMany(mappedBy="swap", fetch = FetchType.EAGER)
   private Set<SwapToken> demandTokens;

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

   public SwapAddress getOfferAddress() {
      return offerAddress;
   }

   public void setOfferAddress(SwapAddress offerAddress) {
      this.offerAddress = offerAddress;
   }

   public SwapAddress getDemandAddress() {
      return demandAddress;
   }

   public void setDemandAddress(SwapAddress demandAddress) {
      this.demandAddress = demandAddress;
   }

   public Integer getOfferHathorAmount() {
      return offerHathorAmount;
   }

   public void setOfferHathorAmount(Integer offerHathorAmount) {
      this.offerHathorAmount = offerHathorAmount;
   }

   public Integer getDemandHathorAmount() {
      return demandHathorAmount;
   }

   public void setDemandHathorAmount(Integer demandHathorAmount) {
      this.demandHathorAmount = demandHathorAmount;
   }

   public Set<SwapToken> getOfferTokens() {
      return offerTokens;
   }

   public void setOfferTokens(Set<SwapToken> offerTokens) {
      this.offerTokens = offerTokens;
   }

   public Set<SwapToken> getDemandTokens() {
      return demandTokens;
   }

   public void setDemandTokens(Set<SwapToken> demandTokens) {
      this.demandTokens = demandTokens;
   }
}
