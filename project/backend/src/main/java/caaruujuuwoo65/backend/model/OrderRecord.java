package caaruujuuwoo65.backend.model;


import caaruujuuwoo65.backend.dto.OrderDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.model.Adress;
@Entity
@Table(name = "orderRecord")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int ordernumber;

    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "adress")
    private Adress adress;

}