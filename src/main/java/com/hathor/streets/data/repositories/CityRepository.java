package com.hathor.streets.data.repositories;

import com.hathor.streets.data.entities.City;
import com.hathor.streets.data.entities.Mint;
import org.springframework.data.repository.CrudRepository;

public interface CityRepository extends CrudRepository<City, String> {

   City findByShareId(String shareId);

}
