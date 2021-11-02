package com.hathor.streets.data.repositories;

import com.hathor.streets.data.entities.Address;
import org.springframework.data.repository.CrudRepository;

public interface AddressRepository extends CrudRepository<Address, Integer> {

   Address findTopByTaken(boolean taken);
}
