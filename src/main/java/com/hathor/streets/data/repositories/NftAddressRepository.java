package com.hathor.streets.data.repositories;

import com.hathor.streets.data.entities.Address;
import com.hathor.streets.data.entities.NftAddress;
import com.hathor.streets.data.entities.NftCity;
import org.springframework.data.repository.CrudRepository;

public interface NftAddressRepository extends CrudRepository<NftAddress, Integer> {

   NftAddress findTopByTaken(boolean taken);

}
