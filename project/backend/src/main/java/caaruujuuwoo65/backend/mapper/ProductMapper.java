package caaruujuuwoo65.backend.mapper;

import caaruujuuwoo65.backend.dto.ProductDTO;
import caaruujuuwoo65.backend.model.Product;


public interface ProductMapper {
    ProductDTO toDTO(Product product);
}
