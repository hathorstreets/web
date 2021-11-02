package com.hathor.streets.services;

import com.google.gson.Gson;
import com.hathor.streets.services.enums.AttributeType;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import org.apache.commons.io.IOUtils;

@Service
public class RarityProvider {

   private final Gson gson;
   private Map<String, Map<String, Double>> rarityTable = null;

   public RarityProvider () {
      this.gson = new Gson();
      try {
         InputStream rarityIS = getClass().getClassLoader().getResourceAsStream("rarity/table.json");
         String rarityText = IOUtils.toString(rarityIS, StandardCharsets.UTF_8.name());
         this.rarityTable = gson.fromJson(rarityText, Map.class);
      } catch (Exception ex) {
         ex.printStackTrace();
      }
   }

   public Map<String, Map<String, Double>> getRarityTable() {
      return rarityTable;
   }

   public Integer getRarity(AttributeType type, String asset) {
      Map<String, Double> rarityMap = rarityTable.get(type.getName());
      return rarityMap.get(asset).intValue();
   }
}
