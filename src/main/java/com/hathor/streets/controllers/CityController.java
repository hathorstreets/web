package com.hathor.streets.controllers;

import com.hathor.streets.controllers.dto.*;
import com.hathor.streets.data.entities.City;
import com.hathor.streets.data.entities.CityStreet;
import com.hathor.streets.data.entities.Mint;
import com.hathor.streets.data.entities.Street;
import com.hathor.streets.data.repositories.CityRepository;
import com.hathor.streets.services.CityService;
import com.hathor.streets.services.StreetService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class CityController {

   private final CityService cityService;
   private final StreetService streetService;
   private final CityRepository cityRepository;

   public CityController(CityService cityService, StreetService streetService, CityRepository cityRepository) {
      this.cityService = cityService;
      this.streetService = streetService;
      this.cityRepository = cityRepository;
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
}
