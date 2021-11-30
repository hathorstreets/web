package com.hathor.streets.data.repositories;

import com.hathor.streets.data.entities.Mint;
import com.hathor.streets.data.entities.Sale;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Map;

public interface MintRepository extends CrudRepository<Mint, String> {

   List<Mint> getAllByState(int state);

   @Query(nativeQuery = true, value = "select sum(m.count) as count, day(created) as day, month(created) as month, year(created) as year from mint m where m.state = 3 group by day(created), month(created), year(created) order by year(created), month(created), day(created)")
   List<Map> getSales();

}
