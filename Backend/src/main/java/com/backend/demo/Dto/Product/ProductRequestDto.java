package com.backend.demo.Dto.Product;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class ProductRequestDto {
    @NotBlank(message = "Product name can't be blank")
    @Size(min = 5 , max = 20 , message =  "Product name must be between 5 and 20 character")
    private String productName;
    @NotBlank(message = "Product must have its description")
    @Size(min = 2 , max = 50 , message = "Product description must be between 20 and 500 character")
    private String description;
    @NotNull(message =  "Product must have its price")
    @DecimalMin(value = "0.0" , inclusive = false , message = "Price must be greater than 0")
    private BigDecimal price;
    @Min(0)
    private  int stock;
    @NotNull(message = "Product must have its category Id")
    private Long categoryId;
    @NotNull(message = "Product must have its image")
    private MultipartFile image;
}
