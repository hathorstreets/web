package com.hathor.streets.controllers.dto;

import java.util.ArrayList;
import java.util.List;

public class SalesDto {

   private List<String> labels = new ArrayList<>();
   private List<Dataset> datasets = new ArrayList<>();

   public List<String> getLabels() {
      return labels;
   }

   public void setLabels(List<String> labels) {
      this.labels = labels;
   }

   public List<Dataset> getDatasets() {
      return datasets;
   }

   public void setDatasets(List<Dataset> datasets) {
      this.datasets = datasets;
   }

   public static class Dataset {
      private String label = "# of Sales";
      private List<Integer> data = new ArrayList<>();
      private int borderWidth = 3;

      public String getLabel() {
         return label;
      }

      public void setLabel(String label) {
         this.label = label;
      }

      public List<Integer> getData() {
         return data;
      }

      public void setData(List<Integer> data) {
         this.data = data;
      }

      public int getBorderWidth() {
         return borderWidth;
      }

      public void setBorderWidth(int borderWidth) {
         this.borderWidth = borderWidth;
      }
   }
}
