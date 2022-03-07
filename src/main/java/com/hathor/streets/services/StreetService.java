package com.hathor.streets.services;

import com.hathor.streets.controllers.dto.SoldCountDto;
import com.hathor.streets.data.entities.Street;
import com.hathor.streets.data.repositories.StreetRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class StreetService {

   private final StreetRepository streetRepository;

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
}
