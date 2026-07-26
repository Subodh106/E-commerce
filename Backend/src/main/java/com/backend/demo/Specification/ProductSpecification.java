package com.backend.demo.Specification;

import com.backend.demo.Entities.Product;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public class ProductSpecification {
    public static Specification<Product> hasName(String search){
        return (root , query , cb)->
                cb.like(
                        cb.lower(root.get("name")),
                        STR."%\{search.toLowerCase()}%"
                );
    }
    public static Specification<Product> hasCategory(String category){
        return(root,query , cb)->
                cb.equal(
                        cb.lower(root.get("category").get("name")),
                        category.toLowerCase()
                );
    }
    public static Specification<Product> hasMinPrice(BigDecimal min){
        return(root , query , cb)->
                cb.greaterThanOrEqualTo(
                        root.get("price"),
                        min
                );
    }
    public static Specification<Product> hasMaxPrice(BigDecimal max){
        return(root , query , cb)->
                cb.lessThanOrEqualTo(
                        root.get("price"),
                        max
                );
    }
}

