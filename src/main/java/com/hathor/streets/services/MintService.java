package com.hathor.streets.services;

import com.hathor.streets.data.entities.Address;
import com.hathor.streets.data.entities.Mint;
import com.hathor.streets.data.entities.Sale;
import com.hathor.streets.data.entities.Street;
import com.hathor.streets.data.entities.enums.MintState;
import com.hathor.streets.data.repositories.AddressRepository;
import com.hathor.streets.data.repositories.MintRepository;
import com.hathor.streets.data.repositories.StreetRepository;
import javassist.NotFoundException;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.*;

@Service
public class MintService {

   private final AddressRepository addressRepository;
   private final MintRepository mintRepository;
   private final StreetRepository streetRepository;
   private final RetryTemplate retryTemplate;

   public MintService(AddressRepository addressRepository,
                      MintRepository mintRepository,
                      StreetRepository streetRepository,
                      RetryTemplate retryTemplate) {
      this.addressRepository = addressRepository;
      this.mintRepository = mintRepository;
      this.streetRepository = streetRepository;
      this.retryTemplate = retryTemplate;
   }

   @Transactional
   public Mint createMint(String address, int count, String email) {
      Address depositAddress = addressRepository.findTopByTaken(false);
      if (depositAddress == null) {
         throw new IllegalStateException("We have no addresses left");
      }
      depositAddress.setTaken(true);
      addressRepository.save(depositAddress);

      Mint m = new Mint();
      m.setState(MintState.WAITING_FOR_DEPOSIT.ordinal());
      m.setUserAddress(address);
      m.setDepositAddress(depositAddress);
      m.setCount(count);
      m.setCreated(new Date());
      if(email != null && !email.isEmpty()) {
         m.setEmail(email);
      }
      mintRepository.save(m);

      return m;
   }

   public Mint getMint(String id) {
      Optional<Mint> mint = mintRepository.findById(id);
      if(!mint.isPresent()) {
         throw new EntityNotFoundException("Mint with id " + id + " not found");
      }
      return mint.get();
   }

   public List<Sale> getSales() {
      List<Map> sales = mintRepository.getSales();
      List<Sale> result = new ArrayList<>();
      for(Map map : sales) {
         Sale sale = new Sale();
         sale.setYear((int)map.get("year"));
         sale.setMonth((int)map.get("month"));
         sale.setDay((int)map.get("day"));
         sale.setCount(((BigDecimal)map.get("count")).intValue());
         result.add(sale);
      }
      return result;
   }
}
