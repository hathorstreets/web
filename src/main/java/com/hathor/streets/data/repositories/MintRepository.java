package com.hathor.streets.data.repositories;

import com.hathor.streets.data.entities.Mint;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MintRepository extends CrudRepository<Mint, String> {

   List<Mint> getAllByState(int state);

}
