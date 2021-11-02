package com.hathor.streets.data.repositories;

import com.hathor.streets.data.entities.Street;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StreetRepository extends CrudRepository<Street, Integer> {

   int countByTaken(boolean taken);

   List<Street> findByMintUserAddress(String address);
}
