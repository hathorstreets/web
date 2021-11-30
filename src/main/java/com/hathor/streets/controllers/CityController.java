package com.hathor.streets.controllers;

import com.hathor.streets.controllers.dto.*;
import com.hathor.streets.data.entities.*;
import com.hathor.streets.data.repositories.CityRepository;
import com.hathor.streets.services.CityService;
import com.hathor.streets.services.NftCityService;
import com.hathor.streets.services.StreetService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CityController {

   private final CityService cityService;
   private final StreetService streetService;
   private final CityRepository cityRepository;
   private final NftCityService nftCityService;

   public CityController(CityService cityService, StreetService streetService, CityRepository cityRepository,
                         NftCityService nftCityService) {
      this.cityService = cityService;
      this.streetService = streetService;
      this.cityRepository = cityRepository;
      this.nftCityService = nftCityService;
   }

   @PostMapping("/city")
   public IdDto createCity(@RequestBody CityDto city) {
      if(city == null) {
         throw new IllegalArgumentException("Body must not be empty");
      }

      if(city.getName() != null) {
         if(city.getName().contains(".") || city.getName().contains("http")){
            throw new IllegalArgumentException("City name can not contain web link!");
         }
      }

      if(city.getStreets() == null || city.getStreets().size() == 0) {
         throw new IllegalArgumentException("There must be some streets");
      }

      String cityId = cityService.createOrUpdateCity(city);
      return new IdDto(cityId);
   }

   @GetMapping("/city/{cityId}")
   public CityDto getCity(@PathVariable String cityId) {
      if(cityId == null) {
         throw new IllegalArgumentException("City id must not be empty");
      }
      City city = cityService.getCity(cityId);
      CityDto dto = DtoConverter.toDto(city, true);

      for(CityStreetDto cityStreetDto : dto.getStreets()) {
         Street s = streetService.getStreet(cityStreetDto.getStreetId());
         cityStreetDto.setIpfs(s.getIpfs());
      }

      return dto;
   }

   @GetMapping("/city/share/{cityShareId}")
   public CityDto getCityByShareId(@PathVariable String cityShareId) {
      if(cityShareId == null) {
         throw new IllegalArgumentException("City share id must not be empty");
      }
      City city = cityService.getCityByShareId(cityShareId);
      CityDto dto = DtoConverter.toDto(city, false);

      for(CityStreetDto cityStreetDto : dto.getStreets()) {
         Street s = streetService.getStreet(cityStreetDto.getStreetId());
         cityStreetDto.setIpfs(s.getIpfs());
      }

      return dto;
   }

   @GetMapping("/cities")
   public List<CityDto> getCities() {
      List<CityDto> result = new ArrayList<>();
      List<City> cities = cityService.getCities();
      int order = 1;
      for(City city : cities) {
         CityDto dto = DtoConverter.toDto(city, false);
         dto.setOrder(order);
         result.add(dto);
         order++;
      }
      return result;
   }

   @GetMapping("/topCities")
   public List<CityDto> getTopCities() {
      List<CityDto> result = new ArrayList<>();
      List<City> cities = cityService.getCities();

      cities = cities.stream().sorted((o1, o2) ->
              new Integer(o2.getStreets().size()).compareTo(new Integer(o1.getStreets().size()))).collect(Collectors.toList());

      cities = cities.subList(0, Math.min(6, cities.size()));

      int order = 1;
      for(City city : cities) {
         CityDto dto = DtoConverter.toDto(city, false);
         dto.setOrder(order);
         result.add(dto);

         Street s = streetService.getStreet(dto.getStreets().get(0).getStreetId());
         dto.setIpfs(s.getIpfs());

         order++;
      }
      return result;
   }

   @GetMapping("/requestCityImage/{cityId}")
   public CityImageDto requestImage(@PathVariable String cityId) {
      if(cityId == null) {
         throw new IllegalArgumentException("City id must not be empty");
      }

      CityImageDto dto = new CityImageDto();

      City city = cityService.getCity(cityId);
      if(city.getIpfs() != null && city.getImageRequested() != null) {
         if(city.getEdited() == null || city.getEdited().before(city.getImageRequested())) {
            dto.setIpfs(city.getIpfs());
            return dto;
         }
      }

      city.setRequestImage(true);
      city.setImageRequested(new Date());
      city.setIpfs(null);
      cityRepository.save(city);

      return new CityImageDto();
   }

   @GetMapping("/getCityImage/{cityId}")
   public CityImageDto getCityImage(@PathVariable String cityId) {
      if(cityId == null) {
         throw new IllegalArgumentException("City id must not be empty");
      }
      City city = cityService.getCity(cityId);

      CityImageDto dto = new CityImageDto();
      dto.setIpfs(city.getIpfs());

      return dto;
   }

   @GetMapping("/createCityNft/{cityId}/{address}")
   public NftCityDto createCityNft(@PathVariable String cityId, @PathVariable String address) {
      NftCity city = nftCityService.createNftCity(cityId, address);

      NftCityDto dto = DtoConverter.toDto(city);

      return dto;
   }

   @GetMapping("/getCityNft/{id}")
   public NftCityDto getCityNft(@PathVariable String id) {
      NftCity city = nftCityService.getNftCity(id);

      NftCityDto dto = DtoConverter.toDto(city);

      return dto;
   }
}
