package com.hathor.streets.services;

import com.hathor.streets.controllers.dto.SoldCountDto;
import com.hathor.streets.data.entities.Street;
import com.hathor.streets.data.entities.StreetAttributes;
import com.hathor.streets.data.repositories.StreetRepository;
import com.hathor.streets.services.enums.AttributeType;
import java.util.*;
import java.util.concurrent.TimeUnit;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.swing.text.html.Option;

@Service
public class StreetService {

   private final StreetRepository streetRepository;

   private Map<String, Map<String, Integer>> rarityMap = null;
   private Date lastRarityMapDate;

   public StreetService(StreetRepository streetRepository) {
      this.streetRepository = streetRepository;
   }

   public Street getStreet(int id) {
      Optional<Street> street = streetRepository.findById(id);
      if(!street.isPresent()) {
         throw new EntityNotFoundException("Street with id " + id + " not found");
      }
      return street.get();
   }

   public List<Street> getStreetsByAddress(String address) {
      List<Street> streets = streetRepository.findByMintUserAddress(address);
      return streets;
   }

   public SoldCountDto getSoldCount() {
      int burnedCount = streetRepository.countByBurned(true);
      int notFreeCount = streetRepository.countByBurnedOrTaken(true, true);
      int freeCount = streetRepository.countByBurnedAndTaken(false, false);
      return new SoldCountDto(notFreeCount, freeCount, burnedCount);
   }

   public Map<String, Map<String, Integer>> getRarity() {
      if(this.rarityMap != null) {
         Date now = new Date();
         if(getDifferenceDays(now, lastRarityMapDate) < 1) {
            return this.rarityMap;
         }
      }

      List<Street> streets = streetRepository.findByBurnedIsFalse();

      this.rarityMap = new HashMap<>();
      for(AttributeType type : AttributeType.values()) {
         rarityMap.put(type.getName(), new HashMap<>());
      }

      for(Street street : streets) {
         StreetAttributes attributes = street.getStreetAttributes();

         fillRarityMap(AttributeType.BILLBOARD, attributes.getBillboard());
         fillRarityMap(AttributeType.TOP, attributes.getTopQuad());
         fillRarityMap(AttributeType.LEFT, attributes.getLeftQuad());
         fillRarityMap(AttributeType.RIGHT, attributes.getRightQuad());
         fillRarityMap(AttributeType.BOTTOM, attributes.getBottomQuad());
         fillRarityMap(AttributeType.SPECIAL, attributes.getSpecial());
         fillRarityMap(AttributeType.ROAD, attributes.getRoad());
      }

      lastRarityMapDate = new Date();
      return rarityMap;
   }

   private void fillRarityMap(AttributeType type, String name) {
      if(rarityMap.get(type.getName()).containsKey(name)) {
         int value = rarityMap.get(type.getName()).get(name);
         rarityMap.get(type.getName()).put(name, value + 1);
      } else{
         rarityMap.get(type.getName()).put(name, 1);
      }
   }

   public static long getDifferenceDays(Date d1, Date d2) {
      long diff = d2.getTime() - d1.getTime();
      return TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
   }
}
