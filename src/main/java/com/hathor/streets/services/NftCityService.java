package com.hathor.streets.services;

import com.hathor.streets.data.entities.*;
import com.hathor.streets.data.entities.enums.CityNftState;
import com.hathor.streets.data.entities.enums.MintState;
import com.hathor.streets.data.repositories.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashSet;
import java.util.Optional;

@Service
public class NftCityService {

   private final NftCityRepository nftCityRepository;
   private final CityRepository cityRepository;
   private final AddressRepository addressRepository;
   private final StreetRepository streetRepository;
   private final NftCityStreetRepository nftCityStreetRepository;

   public NftCityService(NftCityRepository nftCityRepository, CityRepository cityRepository,
                         AddressRepository addressRepository, StreetRepository streetRepository,
                         NftCityStreetRepository nftCityStreetRepository) {
      this.nftCityRepository = nftCityRepository;
      this.cityRepository = cityRepository;
      this.addressRepository = addressRepository;
      this.streetRepository = streetRepository;
      this.nftCityStreetRepository = nftCityStreetRepository;
   }

   @Transactional
   public NftCity createNftCity(String cityId, String address) {
      Optional<City> city = cityRepository.findById(cityId);
      if(!city.isPresent()) {
         throw new IllegalArgumentException("City id " + cityId + " does not exist");
      }
      Optional<NftCity> cityNftOptional = nftCityRepository.findCityNftByCity(city.get());
      if(!cityNftOptional.isPresent()) {
         Address depositAddress = addressRepository.findTopByTaken(false);
         if (depositAddress == null) {
            throw new IllegalStateException("We have no addresses left");
         }
         depositAddress.setTaken(true);
         addressRepository.save(depositAddress);

         NftCity nftCity = new NftCity();
         nftCity.setCity(cityRepository.findById(cityId).get());
         nftCity.setCreated(new Date());
         nftCity.setState(CityNftState.WAITING_FOR_DEPOSIT.ordinal());
         nftCity.setUserAddress(address);
         nftCity.setDepositAddress(depositAddress);

         nftCityRepository.save(nftCity);

         nftCity.setStreets(new HashSet<>());
         for(CityStreet cs : city.get().getStreets()){
            Street s = streetRepository.findById(cs.getStreetId()).get();
            NftCityStreet ncs = new NftCityStreet();
            ncs.setNftCity(nftCity);
            ncs.setStreet(s);
            nftCity.getStreets().add(ncs);
            nftCityStreetRepository.save(ncs);
         }

         nftCityRepository.save(nftCity);

         return nftCity;
      }
      return cityNftOptional.get();
   }

   public NftCity getNftCity(String id) {
      Optional<NftCity> nftCity = nftCityRepository.findById(id);
      if(!nftCity.isPresent()) {
         throw new IllegalArgumentException("Record with id " + id + " does not exist");
      }
      return nftCity.get();
   }
}
