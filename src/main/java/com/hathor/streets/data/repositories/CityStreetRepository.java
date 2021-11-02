package com.hathor.streets.data.repositories;

import com.hathor.streets.data.entities.City;
import com.hathor.streets.data.entities.CityStreet;
import org.springframework.data.repository.CrudRepository;

public interface CityStreetRepository extends CrudRepository<CityStreet, Integer> {
}
