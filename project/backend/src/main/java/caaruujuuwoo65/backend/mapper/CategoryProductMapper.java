package caaruujuuwoo65.backend.mapper;

import caaruujuuwoo65.backend.dto.CategoryDTO;
import caaruujuuwoo65.backend.dto.CategoryWithImageDTO;
import caaruujuuwoo65.backend.dto.CategoryWithProductsDTO;
import caaruujuuwoo65.backend.model.CategoryProduct;
import caaruujuuwoo65.backend.model.Product;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;

@Component
public class CategoryProductMapper {
    public CategoryDTO toCategoryDTO(CategoryProduct categoryProduct) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(categoryProduct.getId());
        dto.setName(categoryProduct.getName());
        return dto;
    }

    public CategoryWithProductsDTO toCategoryWithProductsDTO(CategoryProduct categoryProduct) {
        CategoryWithProductsDTO dto = new CategoryWithProductsDTO();
        dto.setId(categoryProduct.getId());
        dto.setName(categoryProduct.getName());
        dto.setProducts(categoryProduct.getProducts());
        return dto;
    }

    public CategoryWithImageDTO toCategoryWithImageDTO(CategoryProduct categoryProduct) {
        CategoryWithImageDTO dto = new CategoryWithImageDTO();
        dto.setId(categoryProduct.getId());
        dto.setName(categoryProduct.getName());

        if(!categoryProduct.getProducts().isEmpty()){
            Product randomProduct = getRandomProduct(categoryProduct.getProducts());
            dto.setImage(randomProduct.getImage());
        }

        return dto;
    }

    private Product getRandomProduct(List<Product> products) {
        int randomIndex = new Random().nextInt(products.size());
        return products.get(randomIndex);
    }

}
