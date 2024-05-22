package caaruujuuwoo65.backend.service;


import caaruujuuwoo65.backend.dto.CategoryWithImageDTO;
import caaruujuuwoo65.backend.dto.CategoryWithProductsDTO;
import caaruujuuwoo65.backend.dto.product.category.ProductCategoryDTO;
import caaruujuuwoo65.backend.model.ProductCategory;
import caaruujuuwoo65.backend.repository.ProductCategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;
    private final ModelMapper modelMapper;


    @Autowired
    public ProductCategoryService(
        ProductCategoryRepository productCategoryRepository,
        ModelMapper modelMapper
    ) {
        this.productCategoryRepository = productCategoryRepository;
        this.modelMapper = modelMapper;
    }

    public List<ProductCategoryDTO> getAllCategories() {
        List<ProductCategory> categories = productCategoryRepository.findAll();
        return categories.stream()
            .map(category -> modelMapper.map(category, ProductCategoryDTO.class))
            .collect(Collectors.toList());
    }

    public List<CategoryWithProductsDTO> getCategoriesWithProducts() {
        List<ProductCategory> categories = productCategoryRepository.findAllWithProducts();
        return categories.stream()
            .map(categoryProduct -> modelMapper.map(categoryProduct, CategoryWithProductsDTO.class))
            .collect(Collectors.toList());
    }

    public List<CategoryWithImageDTO> getCategoryWithImages() {
        List<ProductCategory> categories = productCategoryRepository.findAll();
        return categories.stream()
            .map(category -> modelMapper.map(category, CategoryWithImageDTO.class))
            .collect(Collectors.toList());
    }

    public List<CategoryWithImageDTO> getRandomCategoriesWithImages(int count) {
        List<ProductCategory> categories = productCategoryRepository.findRandomCategories(count);
        return categories.stream()
            .map(category -> modelMapper.map(category, CategoryWithImageDTO.class))
            .collect(Collectors.toList());
    }
}
