package com.hathor.streets.data.repositories;

import com.hathor.streets.data.entities.City;
import com.hathor.streets.data.entities.NftCity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface NftCityRepository extends CrudRepository<NftCity, String> {

   Optional<NftCity> findCityNftByCity(City city);

}
