package caaruujuuwoo65.backend.service;


import caaruujuuwoo65.backend.dto.CategoryDTO;
import caaruujuuwoo65.backend.dto.CategoryWithImageDTO;
import caaruujuuwoo65.backend.dto.CategoryWithProductsDTO;
import caaruujuuwoo65.backend.mapper.CategoryProductMapper;
import caaruujuuwoo65.backend.model.CategoryProduct;
import caaruujuuwoo65.backend.repository.CategoryProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryProductService {
    private final CategoryProductRepository categoryProductRepository;
    private final CategoryProductMapper categoryProductMapper;


    @Autowired
    public CategoryProductService(CategoryProductRepository categoryProductRepository, CategoryProductMapper categoryProductMapper) {
        this.categoryProductRepository = categoryProductRepository;
        this.categoryProductMapper = categoryProductMapper;
    }

    public List<CategoryDTO> getAllCategories() {
        List<CategoryProduct> categories = categoryProductRepository.findAll();
        return categories.stream()
            .map(categoryProductMapper::toCategoryDTO)
            .toList();
    }

    public List<CategoryWithProductsDTO>getCategoriesWithProducts() {
        List<CategoryProduct> categories = categoryProductRepository.findAllWithProducts();
        return categories.stream()
            .map(categoryProductMapper::toCategoryWithProductsDTO)
            .collect(Collectors.toList());
    }

    public List<CategoryWithImageDTO>getCategoriesWithImages(int count) {
        List<CategoryProduct> categories = categoryProductRepository.findRandomCategories(count);
        return categories.stream()
            .map(categoryProductMapper::toCategoryWithImageDTO)
            .collect(Collectors.toList());
    }

}
