package com.hathor.streets.controllers;

import com.hathor.streets.controllers.dto.DtoConverter;
import com.hathor.streets.controllers.dto.SoldCountDto;
import com.hathor.streets.controllers.dto.StreetDto;
import com.hathor.streets.data.entities.Street;
import com.hathor.streets.services.RarityProvider;
import com.hathor.streets.services.StreetService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class StreetController {

   private final StreetService streetService;
   private final RarityProvider rarityProvider;

   public StreetController(StreetService streetService, RarityProvider rarityProvider) {
      this.streetService = streetService;
      this.rarityProvider = rarityProvider;
   }

   @GetMapping("/street/{streetId}")
   public StreetDto getStreet(@PathVariable Integer streetId) {
      if(streetId == null) {
         throw new IllegalArgumentException("street ID not specified");
      }

      Street street = streetService.getStreet(streetId);
      StreetDto dto = DtoConverter.toDto(street, rarityProvider);
      return dto;
   }

   @PostMapping("/streets/search")
   public List<StreetDto> searchStreets(@RequestBody String streetIdsAndAddresses) {
      if(streetIdsAndAddresses == null) {
         throw new IllegalArgumentException("street IDs not specified");
      }

      List<StreetDto> result = new ArrayList<>();

      String[] ids = streetIdsAndAddresses.split(",");
      for(String strIdOrAddress : ids){
         if (strIdOrAddress == null || strIdOrAddress.isEmpty()) {
            continue;
         }
         try {
            int id = Integer.parseInt(strIdOrAddress.trim());
            Street street = streetService.getStreet(id);
            StreetDto dto = DtoConverter.toDto(street, rarityProvider);
            result.add(dto);
         } catch (Exception ignored){
            List<Street> streets = streetService.getStreetsByAddress(strIdOrAddress.trim());
            if(!streets.isEmpty()) {
               streets.stream().forEach(st -> result.add(DtoConverter.toDto(st, rarityProvider)));
            }
         }
      }
      return result;
   }

   @GetMapping("/street/sold")
   public SoldCountDto soldCount() {
      SoldCountDto soldCount = streetService.getSoldCount();
      return soldCount;
   }
}
