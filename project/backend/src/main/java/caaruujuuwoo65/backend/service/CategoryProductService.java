package caaruujuuwoo65.backend.service;


import caaruujuuwoo65.backend.dto.CategoryDTO;
import caaruujuuwoo65.backend.dto.CategoryWithImageDTO;
import caaruujuuwoo65.backend.dto.CategoryWithProductsDTO;
import caaruujuuwoo65.backend.model.CategoryProduct;
import caaruujuuwoo65.backend.repository.CategoryProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryProductService {
    private final CategoryProductRepository categoryProductRepository;
    private final ModelMapper modelMapper;


    @Autowired
    public CategoryProductService(
        CategoryProductRepository categoryProductRepository,
        ModelMapper modelMapper
    ) {
        this.categoryProductRepository = categoryProductRepository;
        this.modelMapper = modelMapper;
    }

    public List<CategoryDTO> getAllCategories() {
        List<CategoryProduct> categories = categoryProductRepository.findAll();
        return categories.stream()
            .map(category -> modelMapper.map(category, CategoryDTO.class))
            .collect(Collectors.toList());
    }

    public List<CategoryWithProductsDTO> getCategoriesWithProducts() {
        List<CategoryProduct> categories = categoryProductRepository.findAllWithProducts();
        return categories.stream()
            .map(categoryProduct -> modelMapper.map(categoryProduct, CategoryWithProductsDTO.class))
            .collect(Collectors.toList());
    }

    public List<CategoryWithImageDTO> getCategoryWithImages() {
        List<CategoryProduct> categories = categoryProductRepository.findAll();
        return categories.stream()
            .map(category -> modelMapper.map(category, CategoryWithImageDTO.class))
            .collect(Collectors.toList());
    }

    public List<CategoryWithImageDTO> getRandomCategoriesWithImages(int count) {
        List<CategoryProduct> categories = categoryProductRepository.findRandomCategories(count);
        return categories.stream()
            .map(category -> modelMapper.map(category, CategoryWithImageDTO.class))
            .collect(Collectors.toList());
    }

}
