package com.hathor.streets.controllers.dto;

import com.hathor.streets.data.entities.*;
import com.hathor.streets.services.RarityProvider;
import com.hathor.streets.services.enums.AttributeType;

import java.util.*;
import java.util.stream.Collectors;

public class DtoConverter {

   public static final int NFT_PRICE = 50;

   public static MintDto toDto(Mint mint, RarityProvider rarityProvider) {
      MintDto dto = new MintDto();
      dto.setId(mint.getId());
      dto.setDepositAddress(mint.getDepositAddress().getAddress());
      if(mint.getStreets() != null && mint.getStreets().size() > 0) {
         List<StreetDto> streets = mint.getStreets().stream()
                 .sorted(Comparator.comparing(s -> s.getId(), (o1, o2) -> o1.compareTo(o2)))
                 .map(s -> DtoConverter.toDto(s, rarityProvider))
                 .collect(Collectors.toList());
         dto.setStreets(streets);
      }
      else {
         dto.setStreets(new ArrayList<>());
      }
      dto.setPrice(mint.getCount() * NFT_PRICE);
      dto.setUserAddress(mint.getUserAddress());
      dto.setState(mint.getState());
      return dto;
   }

   public static StreetDto toDto(Street street, RarityProvider rarityProvider){
      StreetDto dto = new StreetDto();
      dto.setIpfs(street.getIpfs());
      dto.setId(street.getId());
      dto.setToken(street.getToken());

      dto.setRoad(street.getStreetAttributes().getRoad());
      dto.setRoadRarity(rarityProvider.getRarity(AttributeType.ROAD, dto.getRoad()));
      dto.setTopQuad(street.getStreetAttributes().getTopQuad());
      dto.setTopQuadRarity(rarityProvider.getRarity(AttributeType.TOP, dto.getTopQuad()));
      dto.setLeftQuad(street.getStreetAttributes().getLeftQuad());
      dto.setLeftQuadRarity(rarityProvider.getRarity(AttributeType.LEFT, dto.getLeftQuad()));
      dto.setRightQuad(street.getStreetAttributes().getRightQuad());
      dto.setRightQuadRarity(rarityProvider.getRarity(AttributeType.RIGHT, dto.getRightQuad()));
      dto.setBottomQuad(street.getStreetAttributes().getBottomQuad());
      dto.setBottomQuadRarity(rarityProvider.getRarity(AttributeType.BOTTOM, dto.getBottomQuad()));
      dto.setBillboard(street.getStreetAttributes().getBillboard());
      dto.setBillboardRarity(rarityProvider.getRarity(AttributeType.BILLBOARD, dto.getBillboard()));
      dto.setSpecial(street.getStreetAttributes().getSpecial());
      dto.setSpecialRarity(rarityProvider.getRarity(AttributeType.SPECIAL, dto.getSpecial()));

      if(dto.getRightQuad().equals("House in Fire")) {
         dto.setRightQuad("House on Fire");
      }

      return dto;
   }

   public static City fromDto(CityDto dto) {
      City city = new City();
      city.setId(dto.getId());
      city.setStreets(new HashSet<>());
      city.setShareId(UUID.randomUUID().toString());
      city.setName(dto.getName());
      for(CityStreetDto streetDto : dto.getStreets()) {
         CityStreet cityStreet = new CityStreet();
         cityStreet.setCity(city);
         cityStreet.setStreetId(streetDto.getStreetId());
         cityStreet.setX(streetDto.getX());
         cityStreet.setY(streetDto.getY());
         city.getStreets().add(cityStreet);
      }
      return city;
   }

   public static CityDto toDto(City city, boolean includeId) {
      CityDto dto = new CityDto();
      if(includeId) {
         dto.setId(city.getId());
      }
      dto.setShareId(city.getShareId());
      dto.setName(city.getName());

      for (CityStreet street : city.getStreets()) {
         CityStreetDto streetDto = new CityStreetDto();
         streetDto.setStreetId(street.getStreetId());
         streetDto.setId(street.getId());
         streetDto.setX(street.getX());
         streetDto.setY(street.getY());
         dto.getStreets().add(streetDto);
      }

      dto.setTiles(dto.getStreets().size());
      return dto;
   }

   public static NftCityDto toDto(NftCity nftCity) {
      NftCityDto dto = new NftCityDto();
      dto.setDepositAddress(nftCity.getDepositAddress().getAddress());
      dto.setId(nftCity.getId());
      dto.setToken(nftCity.getToken());
      dto.setUserAddress(nftCity.getUserAddress());
      dto.setState(nftCity.getState());

      dto.setStreets(nftCity.getStreets().stream().map(d -> {
         NftCityStreetDto streetDto = new NftCityStreetDto();
         streetDto.setSent(d.isSent());
         streetDto.setToken(d.getStreet().getToken());
         if(d.getStreet().getId() < 10000){
            streetDto.setTokenSymbol("S" + d.getStreet().getId());
         } else {
            streetDto.setTokenSymbol("H" + (d.getStreet().getId() - 10000) + 1);
         }
         streetDto.setName("Hathor Street " + d.getStreet().getId());
         return streetDto;
      }).collect(Collectors.toList()));

      return dto;
   }
}
