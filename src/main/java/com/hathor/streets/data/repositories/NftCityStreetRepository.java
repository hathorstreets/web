package com.hathor.streets.data.repositories;

import com.hathor.streets.data.entities.NftAddress;
import com.hathor.streets.data.entities.NftCityStreet;
import org.springframework.data.repository.CrudRepository;

public interface NftCityStreetRepository extends CrudRepository<NftCityStreet, Integer> {
}
