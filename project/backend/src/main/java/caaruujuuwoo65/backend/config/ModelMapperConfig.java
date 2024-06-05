package caaruujuuwoo65.backend.config;

import caaruujuuwoo65.backend.dto.product.ProductAverageRatingDTO;
import caaruujuuwoo65.backend.dto.product.ProductPreviewDTO;
import caaruujuuwoo65.backend.dto.product.category.CategoryWithImageDTO;
import caaruujuuwoo65.backend.model.Product;
import caaruujuuwoo65.backend.model.ProductCategory;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;


@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Custom mapping from ProductCategory to CategoryWithImageDTO
        modelMapper.addMappings(new PropertyMap<ProductCategory, CategoryWithImageDTO>() {
            @Override
            protected void configure() {
                map().setImage(source.getRandomProductImage());
            }
        });


        modelMapper.addMappings(new PropertyMap<Product, ProductAverageRatingDTO>() {
            @Override
            protected void configure() {
                map().setAverageRating(source.getAverageRating());
                map().setImage(source.getFirstImage());
            }
        });

        modelMapper.addMappings(new PropertyMap<Product, ProductPreviewDTO>() {
            @Override
            protected void configure() {
                map().setImage(source.getFirstImage());
            }
        });


        return modelMapper;
    }




}
