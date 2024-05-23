# Toelichting op Kwaliteitscriteria K1 (OOP)

In het huidige project ontwikkelen we een backend in Spring Boot en een frontend in TypeScript met het
Lit-framework. Hierbij wordt er gebruikgemaakt van een database die wordt beheerd vanuit de backend. Om dit
alles op een gestructureerde en efficiënte manier te maken, maken we gebruik van de principes van
Object-Oriented Programming (OOP).

OOP is een programmeer model dat draait om het concept van 'objecten'. Deze objecten zijn instantiaties van
classes, die bepalen welke eigenschappen (attributen) en methoden (functies) de
objecten bezitten.

## Inhoudsopgave

1. [Encapsulation](#encapsulation)
    1. [Voorbeeld 1: Encapsulation van de `products` Property](#voorbeeld-1-encapsulation-van-de-products-property)
        1. [Toelichting](#toelichting)
        2. [Voorbeeld Code](#voorbeeld-code)
    2. [Voorbeeld 2: Encapsulation van de `user` Property](#voorbeeld-2-encapsulation-van-de-user-property)
        1. [Toelichting](#toelichting-1)
        2. [Voorbeeld Code](#voorbeeld-code-1)
2. [Inheritance](#inheritance)
    1. [Voorbeeld 1: inheritance van `WizardContainer` class](#voorbeeld-1-inheritance-van-wizardcontainer-class)
        1. [Toelichting](#toelichting-2)
        2. [Voorbeeld Code](#voorbeeld-code-2)
    2. [Voorbeeld 2: inheritance van `CartItem` class](#voorbeeld-2-inheritance-van-cartitem-class)
        1. [Toelichting](#toelichting-3)
        2. [Voorbeeld Code](#voorbeeld-code-3)
3. [Polymorphism](#polymorphism)
    1. [Voorbeeld 1: Polymorphic in - "WizardContainer" Class](#voorbeeld-1-polymorphic-in---wizardcontainer-class)
        1. [Toelichting](#toelichting-4)
        2. [Voorbeeld Code](#voorbeeld-code-4)
    2. [Voorbeeld 2: Polymorphic in - "ShoppingCart" Class](#voorbeeld-2-polymorphic-in---shoppingcart-class)
        1. [Toelichting](#toelichting-5)
        2. [Voorbeeld Code](#voorbeeld-code-5)
4. [Abstraction](#abstraction)
    1. [Voorbeeld 1: Method Abstraction - "renderPaymentDetails()"](#voorbeeld-1-method-abstraction---renderpaymentdetails)
        1. [Toelichting](#toelichting)
        2. [Voorbeeld Code](#voorbeeld-code)
    2. [Voorbeeld 2: Gebruik maken van Geïmporteerde Helper Function - "createInputField()"](#voorbeeld-2-gebruik-maken-van-geïmporteerde-helper-function---createinputfield)
        1. [Toelichting](#toelichting-1)
        2. [Voorbeeld Code](#voorbeeld-code-1)
5. [Design patterns](#design-patterns)
    1. [Model-View-Controller (MVC) design pattern](#model-view-controller-mvc-design-pattern)
        1. [Toelichting](#toelichting-1)
        2. [Voorbeeld Code](#voorbeeld-code-1)
            1. [Model voor het representeren van een user in de database](#model-voor-het-representeren-van-een-user-in-de-database)
            2. [DTO (Data Transfer Object) voor het versturen van gebruikersgegevens naar de frontend](#dto-data-transfer-object-voor-het-versturen-van-gebruikersgegevens-naar-de-frontend)
            3. [Controller voor het afhandelen van gebruikersgerelateerde endpoints](#controller-voor-het-afhandelen-van-gebruikersgerelateerde-endpoints)
    2. [Singleton design pattern](#singleton-design-pattern)
        1. [Toelichting](#toelichting-2)
        2. [Voorbeeld Code](#voorbeeld-code-2)
6. [Database](#database)
    1. [Voorbeeld Model](#voorbeeld-model)

## Encapsulation

### Voorbeeld 1: Encapsulation van de `products` Property

#### Toelichting

De `products` property is een private state in de class `OrderOverviewSummary`. Het is encapsulated, wat
betekent dat het alleen kan worden geopend en gewijzigd binnen de class zelf. Dit zorgt ervoor dat
de `products` lijst niet direct kan worden gewijzigd van buiten de class, waardoor de integriteit van de
gegevens behouden blijft.

#### Voorbeeld Code

De `products` array bevat objecten van het type `OrderItem`, die de items in de bestelling vertegenwoordigen.
Om deze gegevens te manipuleren, worden methoden binnen de class gebruikt, zoals `calculateTotalPrice`. Deze
methode is privé en kan dus alleen worden aangeroepen vanuit de class, waardoor de encapsulated gegevens
worden beschermd.

```typescript
export class OrderOverviewSummary extends LitElement {
    @state()
    private products: OrderItem[] = [];

    private calculateTotalPrice(): number {
        return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
    }
}
```

### Voorbeeld 2: Encapsulation van de `user` Property

#### Toelichting

De `user` property is nog een privé-eigenschap in de class `OrderOverviewSummary`. Het encapsulate de
gebruikersinformatie in, waardoor het alleen toegankelijk en wijzigbaar is binnen de class. Dit zorgt ervoor
dat gebruikersgegevens beschermd zijn tegen unauthorized externe toegang of wijzigingen.

#### Voorbeeld Code

Het `user` property bevat details over de gebruiker, zoals hun naam, adres, postcode en land. De class maakt
gebruik van private methoden om gebruikersdetails weer te geven en gebruikersinteracties te beheren.
Bijvoorbeeld, de methode `renderUserDetails` is privé en wordt gebruikt om de HTML-templates te genereren voor
het weergeven van gebruikersinformatie.

```typescript
export class OrderOverviewSummary extends LitElement {
    @state()
    private user: { name: string, address: string, zip: string, country: string } = {
        name: "Rocco Reus",
        address: "Kanaaldijk 222",
        zip: "1821 BE",
        country: "Netherlands"
    };

    private renderUserDetails(): TemplateResult {
        return html`
        <div class="summary-section">
            <div class="summary-item title-item">
                <p class="item-title">${this.user.name}</p>
                <button @click="${this.editPersonalInformation}" class="align-right edit-button">Edit</button>
            </div>
            <p class="summary-item-text">${this.user.address}</p>
            <p class="summary-item-text">${this.user.zip}</p>
            <p class="summary-item-text">${this.user.country}</p>
        </div>
    `;
    }
}
```

## Inheritance

### Voorbeeld 1: inheritance van `WizardContainer` class

#### Toelichting

De `@customElement("wizard-container")` decorator registreert het component als een custom element, en
`export class WizardContainer extends LitElement` definieert de `WizardContainer` class als een subclass van
`LitElement`.

De methode `public connectedCallback(): void` overschrijft de `connectedCallback` methode van `LitElement` om
extra functionaliteit toe te voegen. Het roept nog steeds `super.connectedCallback()` aan om ervoor te zorgen
dat de implementatie van de basis class wordt uitgevoerd.

#### Voorbeeld Code

```typescript
@customElement("wizard-container")
export class WizardContainer extends LitElement {
    public static styles = [wizardContainerStyle];

    public connectedCallback(): void {
        super.connectedCallback();
        this.getCurrentStatus();
    }
}
```

### Voorbeeld 2: inheritance van `CartItem` class

#### Toelichting

De `@customElement("cart-item")` decorator registreert het component als een custom element, en
`export class CartItem extends LitElement` definieert de `CartItem` class als een subclass van `LitElement`.

De decorator `@property({type: Object}) private product!: OrderItem` definieert een reactive property
`product`, die updates triggert wanneer de waarde verandert. Op dezelfde manier definieert
`@property({type: Boolean}) public showControls: boolean = true` een andere reactive property
genaamd `showControls`.

#### Voorbeeld Code

```typescript
@customElement("cart-item")
export class CartItem extends LitElement {
    public static styles = [CartItemStyle];

    @property({type: Object})
    private product!: OrderItem;

    @property({type: Boolean})
    public showControls: boolean = true;
}
```

## Polymorphism

### Voorbeeld 1: Polymorphic in - "WizardContainer" Class

#### Toelichting

Polymorfisme wordt toegepast in de `WizardContainer` class door middel van methode-overriding. De class
overschrijft de `connectedCallback` methode van zijn superclass `LitElement`. Dit stelt de `WizardContainer`
in staat om zijn eigen logica uit te voeren wanneer het component aan de DOM wordt toegevoegd, terwijl het nog
steeds het gedrag van de basis class behoudt en benut door `super.connectedCallback()` aan te roepen.

#### Voorbeeld Code

```typescript
@customElement("wizard-container")
export class WizardContainer extends LitElement {
    public static styles = [wizardContainerStyle];

    public connectedCallback(): void {
        super.connectedCallback();
        this.getCurrentStatus();
    }
}
```

### Voorbeeld 2: Polymorphic in - "ShoppingCart" Class

#### Toelichting

Polymorfisme wordt toegepast in de `ShoppingCart` class door middel van methode-overriding. De class
overschrijft de `connectedCallback` methode van zijn superclass `LitElement`. Dit stelt de `ShoppingCart` in
staat
om zijn eigen logica uit te voeren wanneer het component aan de DOM wordt toegevoegd, terwijl het nog steeds
het gedrag van de basis class behoudt en benut door `super.connectedCallback()` aan te roepen.

#### Voorbeeld Code

```typescript
@customElement("shopping-cart")
export class ShoppingCart extends LitElement {

    public connectedCallback(): void {
        super.connectedCallback();
        this.updateCurrentPath();
        this.requestUpdate();
    }
}
```

## Abstraction

### Voorbeeld 1: Method Abstraction - "renderPaymentDetails()"

#### Toelichting

De `renderPaymentDetails` methode abstracts de logica voor het renderen van betalingsdetails gebaseerd op de
betalingsmethode. In plaats van complexe voorwaardelijke render logica direct in de `render` methode, wordt
deze logica encapsulated in een aparte methode. Deze scheiding maakt de code cleaner en makkelijker te
beheren.

Hoe hier abstractie gebruikt wordt:

1. De methode encapsulates de voorwaardelijke logica voor het weergeven van verschillende soorten
   betalingsgegevens.
2. De methode verbergt de details van de betalingsmethode en toont alleen de relevante informatie.
3. Hiermee kan de rendering logica voor betalingen gemakkelijk worden gewijzigd zonder dat dit invloed heeft
   op andere onderdelen van de component.

#### Voorbeeld Code

```typescript
export class OrderOverviewSummary extends LitElement {
    private renderPaymentDetails(): TemplateResult {
        if (this.paymentInfo.method === "PayPal") {
            return html`<p class="summary-item-text">${this.paymentInfo.method}</p>`;
        } else {
            return html`
            <p class="summary-item-text">${this.paymentInfo.method}</p>
            <div class="payment-option">
                <img class="dots-icon" src="/assets/image/icons/three-dots.svg"
                     alt="Payment method dots icon">
                <p class="summary-item-text">${this.paymentInfo.lastFourDigits}</p>
                <img class="payment-icon"
                     src="/assets/image/icons/paymentProviders/${this.paymentInfo.icon}.svg"
                     alt="${this.paymentInfo.method} icon">
            </div>
        `;
        }
    }
}
```

### Voorbeeld 2: Gebruik maken van Geïmporteerde Helper Function - "createInputField()"

#### Toelichting

De functie `createInputField`, die is geïmporteerd uit `../../../helpers/formHelpers`, abstracts het maken van
een invoerveld. In plaats van de logica voor het maken van een invoerveld direct in de `renderDiscountSection`
methode te schrijven, wordt deze logica encapsulated in een herbruikbare functie.

Hoe hier abstractie gebruikt wordt:

1. De functie `createInputField` abstracts het maken van een input element door het verbergen van de
   implementatie details.
2. Dankzij deze abstractie kan de methode `renderDiscountSection` kort blijven en zich richten op de structuur
   van de kortingssectie.
3. Het stimuleert hergebruik van code, omdat de `createInputField` functie elders in de applicatie kan worden
   gebruikt.

#### Voorbeeld Code

```typescript
export class OrderOverviewSummary extends LitElement {
    private renderDiscountSection(): TemplateResult {
        return html`
        <div class="summary-section">
            <div class="discount-code">
                <p class="item-title summary-item-text">Do you have any discount code?</p>
                <p class="summary-item-text">Only one discount code per order can be applied.</p>
            </div>
            <div class="discount-input">
                ${createInputField({
            id: "discount-input",
            placeholder: "Your code here",
            label: "Discount Code",
            class: "discount-field"
        })}
                <button class="button apply-discount">
                    <span>Apply</span>
                </button>
            </div>
        </div>
    `;
    }
}
```

## Design patterns:

### Model-View-Controller (MVC) design pattern:

#### Toelichting

Het Model-View-Controller (MVC) design pattern wordt gebruikt om de applicatie te structureren in drie lagen:
Model, View en Controller. In ons project wordt dit design pattern op een non-traditionele manier gebruikt om
de backend te structureren. Aangezien wij niet een normale view hebben maar wel DTO's om de responses te
sturen naar de frontend kan dit gezien worden als een soort view. De Model laag bevat de entiteiten die de
database representeert, de View laag bevat de DTO's die worden gebruikt om data naar de frontend te sturen en
de Controller laag bevat de endpoints die de communicatie tussen de frontend en de backend afhandelen.

#### Voorbeeld Code

##### Model voor het representeren van een user in de database:

```java

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String phonenumber;

    @JsonIgnore
    private String password;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "addressId")
    private Address address;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<CustomerOrder> customerOrders;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Role> roles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Cart> carts;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
            .map(role -> new SimpleGrantedAuthority(role.getName().name()))
            .collect(Collectors.toSet());
    }

    @JsonIgnore
    public List<String> getAuthoritiesList() {
        return roles.stream()
            .map(role -> role.getName().name())
            .collect(Collectors.toList());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
```

##### DTO (Data Transfer Object) voor het versturen van gebruikersgegevens naar de frontend:

```java

@Getter
@Setter
public class UserDTO {
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String phonenumber;
    private Long addressId;
    private String password;
}
```

##### Controller voor het afhandelen van gebruikersgerelateerde endpoints:

```java
@GetMapping("/")
@Operation(summary = "Get all users", description = "Get all users from the database")
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Users retrieved successfully"),
    @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
})
public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.getAllUsers();
    return new ResponseEntity<>(users, HttpStatus.OK);
}
``` 

### Singleton design pattern:

#### Toelichting

Het `Singleton` design pattern wordt gebruikt om ervoor te zorgen dat er slechts één instantie van een class
kan bestaan. In ons project hebben we het Singleton design pattern op een iets andere manier geïmplementeerd
door gebruik te maken van statische methoden binnen de `CartManager` class. Dit zorgt ervoor dat alle methoden
en binnen de CartManager class statisch zijn, waardoor er slechts één gemeenschappelijk winkelwagentje
is dat door de hele applicatie wordt gebruikt. Door het gebruik van statische methoden is er geen behoefte aan
het instantiëren van de CartManager class, wat zorgt voor een enkel toegangspunt voor winkelwagenbeheer.

#### Voorbeeld Code

```typescript
export class CartManager {
    public static getCart(): CartItem[] {
        const cart: string = localStorage.getItem("cart") as string;
        return cart ? JSON.parse(cart) : [];
    }

    public static addItem(item: CartItem): void {
        const items: CartItem[] = CartManager.getCart();
        const index: number = items.findIndex(cartItem => cartItem.id === item.id);
        if (index > -1) {
            items[index].quantity += item.quantity;
        } else {
            items.push(item);
        }
        CartManager.saveCart(items);
    }

    public static updateItemQuantity(id: number, quantity: number): void {
        const items: CartItem[] = CartManager.getCart();
        const index: number = items.findIndex(item => item.id === id);
        if (index > -1 && quantity > 0) {
            items[index].quantity = quantity;
            CartManager.saveCart(items);
        } else if (quantity === 0) {
            CartManager.removeItem(id);
        }
    }

    public static removeItem(id: number): void {
        let items: CartItem[] = CartManager.getCart();
        items = items.filter(item => item.id !== id);
        CartManager.saveCart(items);
    }

    private static saveCart(items: CartItem[]): void {
        localStorage.setItem("cart", JSON.stringify(items));
    }
}

```

## Database

Voor het gebruik maken van de database maken we gebruik van JPA (Java Persistence API) repositories. Deze
bieden
een abstractielaag voor databaseoperaties, waardoor we CRUD (Create, Read, Update, Delete) acties
kunnen uitvoeren zonder dat we directe SQL-query's hoeven te schrijven. Onze modellen, die OOP-principes
volgen, worden zo gemapt naar database-entiteiten, waardoor data eenvoudig en gestructureerd kan
worden beheerd.

### Voorbeeld Model

```java
package caaruujuuwoo65.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String productName;
    private String description;
    private Integer stock;
    private BigDecimal price;

    @ElementCollection
    private List<String> image;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ProductCategory category;
}
```