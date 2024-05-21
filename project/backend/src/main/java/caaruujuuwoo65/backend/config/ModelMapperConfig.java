package caaruujuuwoo65.backend.config;

import caaruujuuwoo65.backend.dto.CategoryWithImageDTO;
import caaruujuuwoo65.backend.model.CategoryProduct;
import caaruujuuwoo65.backend.model.Product;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Random;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Custom mapping from CategoryProduct to CategoryWithImageDTO
        modelMapper.addMappings(new PropertyMap<CategoryProduct, CategoryWithImageDTO>() {
            @Override
            protected void configure() {
                map().setId(source.getId());
                map().setName(source.getName());

                // Custom logic for setting the image field
                using(context -> {
                    CategoryProduct categoryProduct = (CategoryProduct) context.getSource();
                    if (categoryProduct.getProducts().isEmpty()) {
                        return null;
                    }
                    return getRandomProduct(categoryProduct.getProducts()).getImage();
                }).map(source, destination.getImage());
            }
        });

        return modelMapper;
    }

    private Product getRandomProduct(List<Product> products) {
        int randomIndex = new Random().nextInt(products.size());
        return products.get(randomIndex);
    }
}
