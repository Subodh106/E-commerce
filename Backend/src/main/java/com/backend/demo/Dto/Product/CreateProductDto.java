package com.backend.demo.Dto.Product;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class CreateProductDto {
    @NotBlank(message = "Product name can't be blank")
    @Size(min = 5 , max = 20 , message =  "Product name must be between 5 and 20 character")
    private String productName;
    @NotBlank(message = "Product must have its description")
    @Size(min = 20 , max = 50 , message = "Product description must be between 20 and 500 character")
    private String description;
    @NotNull(message =  "Product must have its price")
    @DecimalMin(value = "0.0" , inclusive = false , message = "Price must be greater than 0")
    private BigDecimal price;
    @Min(0)
    private  int stock;
    @NotBlank(message = "Product must have its category")
    private String category;
}
