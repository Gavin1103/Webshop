## Spring Boot infrastructuur

### Model

Wanneer de server wordt ingeschakeld, koppelt het model automatisch zijn eigenschappen aan de database. De structuur van de databasetabellen zal consistent zijn met het model.

In decorator kan ik data relaties definiëren. Bijvoorbeeld `@ManyToOne
@JoinColumn(name = “category_product”)` betekent dat product en categorie meer-op-één zijn, d.w.z. 1 categorie kan meerdere producten bevatten.


```tsx
//model/Product.java

@Entity
@Table(name = "product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int price;

    @Column(length = 1000)
    private String description;

    private int stock;

    private String image;

    @ManyToOne
    @JoinColumn(name = "type_product")
    @JsonIgnore
    private TypeProduct type;

    @ManyToOne
    @JoinColumn(name = "category_product")
    private CategoryProduct category;
}
```

### DTO

DTO is de afkorting van 'data-transfer-object'. Een DTO kan de originele gegevens omzetten naar een ander formaat, waardoor de API de gegevens kan retourneren in het gewenste formaat.

```tsx
// DTO/ProductPreviewDTO.java

@Getter
@Setter
public class ProductPreviewDTO {
    public Long id;
    public String name;
    public String image;
    public float price;
}
```

Als je het vergelijkt met het productmodel, zul je zien dat er een paar attributen ontbreken in de DTO, dit komt doordat de homepage slechts een paar gegevens verwacht wanneer het product wordt weergegeven. Voorraad en beschrijving worden in dit geval niet gebruikt.

### Mapper

Mapper is een functie die gegevens van een model omzet in een DTO. Natuurlijk kan deze code ook in de controller of service worden geschreven, maar voor de onderhoudbaarheid van de code heb ik dit in de mapper class ingekapseld.

```tsx
// mapper/ProductMapper.java
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
```

### Repository

Product Repository erfde de JPA-Repository en het biedt veel CRUD operaties, die bespaart veel tijd om sql query zelf te schrijven. Het is ook mogelijk om custom query te schrijven, zoals het functie `findRandom10Products()`, De query retourneert 10 willekeurige producten.

```tsx
// repository/ProductRepository.java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findTop10ByOrderByPriceAsc();

    @Query(value = "SELECT * FROM product ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Product> findRandom10Products();
}
```

### Controller

In de controller kan ik de verzoekmethode, url en functie van elk API-endpoint definiëren. Op het endpoint `“/topDeals”`, heb ik een GET-verzoekmethode gedefinieerd. Die de functie `getTopDeals()` uitvoert als de API-server een GET verzoek ontvangt. 

Vervolgens zal de `productRepository` de gegevens opvragen en toewijzen aan de variabele `products`. De volgende stap is om de modelgegevens om te zetten naar DTO's. Eerst wordt de lijst omgezet in een stream, zodat ik de gegevens in de lijst één voor één kan bewerken. Daarna wordt de mapper gebruikt om elk product om te zetten in een `ProductDTO`. Tenslotte wordt met `Collectors.toList()` de stroom van elementen in een lijst verzameld, waarna de lijst van DTO's wordt toegewezen aan de variabele `dtos`.

In de laatste stap stuur endpoint de `dtos` en `statuscode` als respons gegevens naar de client.

```tsx
// controller/productController.java
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Autowired
    public ProductController(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @GetMapping("/topDeals")
    public ResponseEntity<List<ProductPreviewDTO>> getTopDeals() {
        List<Product> products = productRepository.findTop10ByOrderByPriceAsc();
        List<ProductPreviewDTO> dtos = products.stream()
            .map(productMapper::toProductPreviewDTO)
            .collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
    
}
```