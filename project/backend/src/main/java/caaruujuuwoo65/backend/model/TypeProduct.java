package caaruujuuwoo65.backend.model;


import caaruujuuwoo65.backend.dto.TypeProductDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "type_product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypeProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
}