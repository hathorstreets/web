package com.hathor.streets.services;

import com.hathor.streets.controllers.dto.CityDto;
import com.hathor.streets.controllers.dto.CityStreetDto;
import com.hathor.streets.controllers.dto.DtoConverter;
import com.hathor.streets.data.entities.City;
import com.hathor.streets.data.entities.CityStreet;
import com.hathor.streets.data.entities.Street;
import com.hathor.streets.data.repositories.CityRepository;
import com.hathor.streets.data.repositories.CityStreetRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CityService {

   private final CityRepository cityRepository;
   private final CityStreetRepository cityStreetRepository;

   public CityService(CityRepository cityRepository, CityStreetRepository cityStreetRepository) {
      this.cityRepository = cityRepository;
      this.cityStreetRepository = cityStreetRepository;
   }

   public String createOrUpdateCity(CityDto cityDto) {
      if(cityDto.getId() == null) {
         City city = DtoConverter.fromDto(cityDto);
         cityRepository.save(city);
         cityStreetRepository.saveAll(city.getStreets());
         return city.getId();
      }
      else {
         Optional<City> city = cityRepository.findById(cityDto.getId());
         if(!city.isPresent()) {
            throw new EntityNotFoundException("City with id " + cityDto.getId() + " not found");
         }
         for(CityStreetDto cityStreetDto : cityDto.getStreets()) {
            CityStreet found = null;
            for (CityStreet street : city.get().getStreets()) {
               if (cityStreetDto.getId() == street.getId()){
                  found = street;
                  break;
               }
            }
            if(found != null) {
               found.setX(cityStreetDto.getX());
               found.setY(cityStreetDto.getY());
               cityStreetRepository.save(found);
            }
            else {
               CityStreet cityStreet = new CityStreet();
               cityStreet.setX(cityStreetDto.getX());
               cityStreet.setY(cityStreetDto.getY());
               cityStreet.setStreetId(cityStreetDto.getStreetId());
               cityStreet.setCity(city.get());
               cityStreetRepository.save(cityStreet);
            }
         }
         city.get().setName(cityDto.getName());
         cityRepository.save(city.get());
         return city.get().getId();
      }
   }

   public City getCity(String cityId) {
      Optional<City> city = cityRepository.findById(cityId);

      if(!city.isPresent()) {
         throw new EntityNotFoundException("City with id " + cityId + " not found");
      }
      return city.get();
   }

   public City getCityByShareId(String shareId) {
      City city = cityRepository.findByShareId(shareId);
      return city;
   }

   public List<City> getCities() {
      List<City> result = new ArrayList<>();
      for(City city : cityRepository.findAll()) {
         result.add(city);
      }
      result = result.stream().sorted((o1, o2) -> {
         Integer max1 = o1.getStreets().stream().map(CityStreet::getId).max(Integer::compare).get();
         Integer max2 = o2.getStreets().stream().map(CityStreet::getId).max(Integer::compare).get();
         return max1.compareTo(max2);
      }).collect(Collectors.toList());

      return result;
   }
}
