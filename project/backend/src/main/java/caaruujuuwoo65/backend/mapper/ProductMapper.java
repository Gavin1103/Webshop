package caaruujuuwoo65.backend.mapper;

import caaruujuuwoo65.backend.dto.ProductDTO;
import caaruujuuwoo65.backend.dto.ProductPreviewDTO;
import caaruujuuwoo65.backend.model.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {
    public ProductDTO toProductDTO(Product product) {
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

    public ProductPreviewDTO toProductPreviewDTO(Product product) {
        ProductPreviewDTO productPreviewDTO = new ProductPreviewDTO();
        productPreviewDTO.setId(product.getId());
        productPreviewDTO.setName(product.getName());
        productPreviewDTO.setImage(product.getImage());
        productPreviewDTO.setPrice(product.getPrice());
        return productPreviewDTO;
    }
}
