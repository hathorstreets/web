package com.hathor.streets.controllers;

import com.hathor.streets.controllers.dto.DtoConverter;
import com.hathor.streets.controllers.dto.MintDto;
import com.hathor.streets.controllers.dto.SalesDto;
import com.hathor.streets.data.entities.Mint;
import com.hathor.streets.data.entities.Sale;
import com.hathor.streets.services.MintService;
import com.hathor.streets.services.RarityProvider;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class MintController {

   private final MintService mintService;
   private final RarityProvider rarityProvider;

   public MintController(MintService mintService, RarityProvider rarityProvider) {
      this.mintService = mintService;
      this.rarityProvider = rarityProvider;
   }

   @GetMapping("/mint/{address}/{count}/{email}")
   public MintDto mint(@PathVariable String address, @PathVariable int count, @PathVariable String email) {
      if(address == null || address.length() != 34) {
         throw new IllegalArgumentException("address should be 34 chars long");
      }

      if(count < 1 || count > 10) {
         throw new IllegalArgumentException("count should be between 1 and 10");
      }

      if(email.equals("empty")) {
         email = null;
      }

      Mint mint = mintService.createMint(address, count, email);
      MintDto dto = DtoConverter.toDto(mint, rarityProvider);
      return dto;
   }

   @GetMapping("/mint/{mintId}")
   public MintDto getMint(@PathVariable String mintId) {
      if(mintId == null) {
         throw new IllegalArgumentException("mint ID not specified");
      }

      Mint mint = mintService.getMint(mintId);
      if(mint.isDead()) {
         throw new IllegalArgumentException("This mint is dead " + mint.getId());
      }
      MintDto dto = DtoConverter.toDto(mint, rarityProvider);
      return dto;
   }

   @GetMapping("/sales")
   public SalesDto sales() {
      List<Sale> sales = mintService.getSales();
      Calendar cal = Calendar.getInstance();
      cal.set(2021, 9, 26, 0, 0, 0);
      Calendar today = Calendar.getInstance();
      today.set(Calendar.HOUR, 0);
      today.set(Calendar.MINUTE, 0);
      today.set(Calendar.SECOND, 0);

      SalesDto dto = new SalesDto();
      SalesDto.Dataset dataset = new SalesDto.Dataset();
      dto.getDatasets().add(dataset);

      for(Calendar c = cal; c.compareTo(today) <= 0; c.add(Calendar.DATE, 1)) {
         dto.getLabels().add(c.get(Calendar.DATE) + "." + (c.get(Calendar.MONTH) + 1) + ". " + c.get(Calendar.YEAR));
         Sale sale = null;
         for(Sale s : sales) {
            if(c.get(Calendar.DATE) == s.getDay() &&
                    (c.get(Calendar.MONTH) + 1) == s.getMonth() &&
                    c.get(Calendar.YEAR) == s.getYear()) {
               sale = s;
               break;
            }
         }
         if(sale != null) {
            dataset.getData().add(sale.getCount());
         }
         else{
            dataset.getData().add(0);
         }
      }

      return dto;
   }
}
