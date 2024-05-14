package caaruujuuwoo65.backend.mapper;

import caaruujuuwoo65.backend.dto.ProductDTO;
import caaruujuuwoo65.backend.model.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductDTO toDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setImage(product.getImage());
        dto.setType(product.getType());
        dto.setCategory(product.getCategory());
        return dto;
    }
}
