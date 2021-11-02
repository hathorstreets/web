package com.hathor.streets.controllers;

import com.hathor.streets.controllers.dto.DtoConverter;
import com.hathor.streets.controllers.dto.MintDto;
import com.hathor.streets.data.entities.Mint;
import com.hathor.streets.services.MintService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MintController {

   private final MintService mintService;

   public MintController(MintService mintService) {
      this.mintService = mintService;
   }

   @GetMapping("/mint/{address}/{count}")
   public MintDto mint(@PathVariable String address, @PathVariable int count) {
      if(address == null || address.length() != 34) {
         throw new IllegalArgumentException("address should be 34 chars long");
      }

      if(count < 1 || count > 10) {
         throw new IllegalArgumentException("count should be between 1 and 10");
      }

      Mint mint = mintService.createMint(address, count);
      MintDto dto = DtoConverter.toDto(mint);
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
      MintDto dto = DtoConverter.toDto(mint);
      return dto;
   }
}
