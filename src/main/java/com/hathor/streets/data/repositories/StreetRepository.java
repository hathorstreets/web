package com.hathor.streets.data.repositories;

import com.hathor.streets.data.entities.Street;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StreetRepository extends CrudRepository<Street, Integer> {

   int countByTaken(boolean taken);

   int countByBurned(boolean burned);

   int countByBurnedOrTaken(boolean burned, boolean taken);

   int countByBurnedAndTaken(boolean burned, boolean taken);

   List<Street> findByMintUserAddress(String address);

   List<Street> findByBurnedIsFalse();
}
