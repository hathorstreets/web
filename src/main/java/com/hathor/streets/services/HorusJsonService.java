package com.hathor.streets.services;

import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.jar.JarEntry;

@Service
public class HorusJsonService {

   private final Gson gson = new Gson();
   private final RarityProvider rarityProvider;

   public HorusJsonService(RarityProvider rarityProvider) {
      this.rarityProvider = rarityProvider;
   }

   public String createJson() {
      List<HorusJson> jsons = new ArrayList<>();
      Map<String, Map<String, Double>> rarityMap = rarityProvider.getRarityTable();

      for(String Categorie : rarityMap.keySet()) {
         for(String Name : rarityMap.get(Categorie).keySet()) {
            BigDecimal rarity = new BigDecimal(rarityMap.get(Categorie).get(Name));
            rarity = rarity.setScale(2, RoundingMode.HALF_UP);
            String percentage = rarity.multiply(new BigDecimal("100")).divide(new BigDecimal("11111"), 2, RoundingMode.HALF_UP).toString() + "%";
            HorusJson json = new HorusJson();
            json.setCategorie(Categorie);
            json.setName(Name);
            json.setScore(percentage);
            jsons.add(json);
         }
      }
      String json = gson.toJson(jsons);
      return json;
   }

   class HorusJson {
      private String Categorie;
      private String Score;
      private String Name;

      public String getCategorie() {
         return Categorie;
      }

      public void setCategorie(String categorie) {
         Categorie = categorie;
      }

      public String getScore() {
         return Score;
      }

      public void setScore(String score) {
         Score = score;
      }

      public String getName() {
         return Name;
      }

      public void setName(String name) {
         Name = name;
      }
   }
}
